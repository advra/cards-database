/**
 * Scrape pkmn.gg for card data (Japanese names, dexIds, TCGPlayer IDs)
 * and download card images.
 *
 * Usage:
 *   bun run scripts/scrapePkmnGG.ts --url https://www.pkmn.gg/jp/series/original/expansion-pack --set PMCG1 --dir data-asia
 *   bun run scripts/scrapePkmnGG.ts --url https://www.pkmn.gg/jp/series/original/expansion-pack --set PMCG1 --dir data-asia --dry-run
 *   bun run scripts/scrapePkmnGG.ts --url https://www.pkmn.gg/jp/series/original/expansion-pack --set PMCG1 --dir data-asia --start 1 --end 10
 *   bun run scripts/scrapePkmnGG.ts --url https://www.pkmn.gg/jp/series/original/expansion-pack --set PMCG1 --dir data-asia --apply --images
 *   bun run scripts/scrapePkmnGG.ts --url https://www.pkmn.gg/jp/series/gym/leaders-stadium --set PMCG5 --bulbapedia "https://bulbapedia.bulbagarden.net/wiki/Gym_Heroes_(TCG)" --list-name "Leaders' Stadium" --apply 
*/

import fs from 'fs'
import path from 'path'

// ── Pokémon English-to-Japanese name mapping ──────────────────────────────
// Source: https://bulbapedia.bulbagarden.net/wiki/List_of_Japanese_Pok%C3%A9mon_names
const POKEMON_EN_TO_JA: Record<string, string> = JSON.parse(
	fs.readFileSync(path.join(__dirname, 'pokemon-en-ja.json'), 'utf-8')
)

// ── CLI args ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2)

function getArg(flag: string, short?: string): string | undefined {
	const idx = args.findIndex((a) => a === flag || (short && a === flag))
	if (idx !== -1 && idx + 1 < args.length) return args[idx + 1]
	return undefined
}

function hasFlag(flag: string): boolean {
	return args.includes(flag)
}

const setUrl: string = getArg('--url', '-u') ?? ''
const setId: string = getArg('--set', '-s') ?? ''
const dataDir: string = getArg('--dir', '-d') ?? 'data-asia'
const startStr: string | undefined = getArg('--start')
const endStr: string | undefined = getArg('--end')
const limitStr: string | undefined = getArg('--limit')
const dryRun: boolean = hasFlag('--dry-run')
const apply: boolean = hasFlag('--apply')
const downloadImages: boolean = hasFlag('--images')

// ── Bulbapedia mode ────────────────────────────────────────────────────────
const bulbapediaUrl: string | undefined = getArg('--bulbapedia')
const bulbapediaListName: string | undefined = getArg('--list-name')

if (!setUrl || !setId) {
	console.error('Usage: bun run scripts/scrapePkmnGG.ts --url <pkmn.gg-set-url> --set <set-id> [--dir <data-dir>] [--start <n>] [--end <n>] [--limit <n>] [--dry-run | --apply] [--images]')
	console.error('       bun run scripts/scrapePkmnGG.ts --url <pkmn.gg-set-url> --set <set-id> --bulbapedia <bulbapedia-url> --list-name "<list-name>" [--dir <data-dir>] [--start <n>] [--end <n>] [--dry-run | --apply]')
	console.error('Example: bun run scripts/scrapePkmnGG.ts --url https://www.pkmn.gg/jp/series/original/expansion-pack --set PMCG1 --dir data-asia --apply --images')
	console.error('Example (with Bulbapedia): bun run scripts/scrapePkmnGG.ts --url https://www.pkmn.gg/jp/series/original/expansion-pack --set PMCG5 --bulbapedia https://bulbapedia.bulbagarden.net/wiki/Gym_Heroes_(TCG) --list-name "Leaders\' Stadium" --apply')
	process.exit(1)
}

// ── Helpers ───────────────────────────────────────────────────────────────

function zeroPad(n: number, width = 3): string {
	return String(n).padStart(width, '0')
}

/**
 * Extract the __NEXT_DATA__ JSON from a pkmn.gg HTML page.
 */
async function fetchCardPage(url: string): Promise<any> {
	const resp = await fetch(url)
	if (!resp.ok) {
		throw new Error(`HTTP ${resp.status} for ${url}`)
	}
	const html = await resp.text()

	// Extract __NEXT_DATA__ JSON
	const match = html.match(/__NEXT_DATA__" type="application\/json">(.*?)<\/script>/)
	if (!match) {
		throw new Error(`Could not find __NEXT_DATA__ in ${url}`)
	}
	return JSON.parse(match[1])
}

/**
 * Read a card file and return its content as a string.
 */
function readCardFile(cardPath: string): string | null {
	if (!fs.existsSync(cardPath)) return null
	return fs.readFileSync(cardPath, 'utf-8')
}

/**
 * Check if a variant already exists in the variants array text.
 * We look for `tcgplayer: <id>` in the variants section.
 */
function hasTcgPlayerId(content: string, tcgPlayerId: number): boolean {
	// Check if this tcgplayer ID already appears in the file
	const regex = new RegExp(`tcgplayer:\\s*${tcgPlayerId}`)
	return regex.test(content)
}

/**
 * Update or add a variant entry in the card file content.
 * If a variant with the same type (and subtype) exists, update its tcgplayer.
 * If not, add a new variant entry.
 */
function updateVariant(
	content: string,
	type: string,
	tcgPlayerId: number,
	subtype?: string
): string {
	const variantStr = subtype
		? `\t\t{\n\t\t\ttype: "${type}",\n\t\t\tsubtype: "${subtype}",\n\t\t\tthirdParty: {\n\t\t\t\ttcgplayer: ${tcgPlayerId}\n\t\t\t},\n\t\t}`
		: `\t\t{\n\t\t\ttype: "${type}",\n\t\t\tthirdParty: {\n\t\t\t\ttcgplayer: ${tcgPlayerId}\n\t\t\t},\n\t\t}`

	// Check if a variant with this type (and subtype) already exists
	if (subtype) {
		// Look for existing variant with matching type + subtype
		const existingRegex = new RegExp(
			`(type:\\s*"${type}"[^}]*?subtype:\\s*"${subtype}"[^}]*?thirdParty:\\s*\\{[^}]*?tcgplayer:\\s*)(\\d+)`
		)
		if (existingRegex.test(content)) {
			// Update existing tcgplayer ID
			return content.replace(existingRegex, `$1${tcgPlayerId}`)
		}
	} else {
		// For variants without subtype, find all variant blocks (handle both tab and space indentation)
		const variantBlocks = content.match(/([\t ]+)\{[\s\S]*?\1\}/g)
		if (variantBlocks) {
			for (const block of variantBlocks) {
				const hasType = new RegExp(`type:\\s*"${type}"`).test(block)
				const hasSubtype = /subtype:/.test(block)
				if (hasType && !hasSubtype) {
					// Found matching variant without subtype
					if (/tcgplayer:\s*\d+/.test(block)) {
						// Has existing tcgplayer - update it
						const updated = block.replace(
							/(tcgplayer:\s*)(\d+)/,
							`$1${tcgPlayerId}`
						)
						return content.replace(block, updated)
					} else {
						// No tcgplayer yet - add thirdParty block
						// Find the indentation of this variant block
						const indentMatch = block.match(/^([\t ]+)/)
						const indent = indentMatch ? indentMatch[1] : '\t\t'
						const innerIndent = indent + '\t'
						// Add thirdParty after the type line
						const updated = block.replace(
							/(type:\s*"[^"]*",?\n)/,
							`$1${innerIndent}thirdParty: {\n${innerIndent}\ttcgplayer: ${tcgPlayerId}\n${innerIndent}},\n`
						)
						return content.replace(block, updated)
					}
				}
			}
		}
	}

	// No existing variant found, add a new one
	// Find the variants array - handle both tab and space indentation
	const variantsMatch = content.match(/([\t ]*)variants:\s*\[([\s\S]*?)([\t ]*\],)/)
	if (variantsMatch) {
		const indent = variantsMatch[1] || '\t'
		const innerIndent = indent + '\t'
		const existingVariants = variantsMatch[2].trim()
		if (existingVariants.length > 0) {
			// Add after the last variant entry (before the closing of the array)
			// Find the last closing brace of a variant entry followed by comma or newline
			const lastEntryEnd = content.lastIndexOf('},', content.lastIndexOf(variantsMatch[3]))
			if (lastEntryEnd !== -1) {
				const before = content.slice(0, lastEntryEnd + 2) // include the closing brace and comma
				const after = content.slice(lastEntryEnd + 2)
				return before + '\n' + variantStr.replace(/\t/g, innerIndent) + after
			}
		} else {
			// Empty variants array
			const formattedVariant = variantStr.replace(/\t/g, innerIndent)
			return content.replace(
				new RegExp(`(${indent}variants:\\s*\\[)\\s*(${indent}\\],)`),
				`$1\n${formattedVariant}\n$2`
			)
		}
	}

	// No variants array exists - add one before the closing of the card object
	// Find the last line before `export default card`
	const exportMatch = content.match(/(\n);?\s*\n*export default card/)
	if (exportMatch) {
		const insertPos = content.lastIndexOf('\n', content.lastIndexOf('export default card') - 1)
		const before = content.slice(0, insertPos)
		const after = content.slice(insertPos)
		return before + `\n\tvariants: [\n${variantStr}\n\t],\n` + after
	}

	return content
}

/**
 * Update the Japanese name in the card file.
 */
function updateJapaneseName(content: string, jaName: string): string {
	// Match name: { ... ja: "..." ... }
	const nameRegex = /(name:\s*\{[^}]*?ja:\s*")[^"]*(")/
	if (nameRegex.test(content)) {
		return content.replace(nameRegex, `$1${jaName}$2`)
	}
	// If name block exists but no ja key, add it
	const nameBlockRegex = /(name:\s*\{)([^}]*)(\})/
	if (nameBlockRegex.test(content)) {
		return content.replace(nameBlockRegex, (match, open, middle, close) => {
			if (!middle.includes('ja:')) {
				return `${open}\n\t\tja: "${jaName}",\n\t${close}`
			}
			return match
		})
	}
	return content
}

/**
 * Extract the English name from the comment above the ja: line in the card file.
 * Returns the English name or null if not found.
 */
function extractEnglishNameFromComment(content: string): string | null {
	const lines = content.split('\n')
	for (let i = 0; i < Math.min(lines.length, 20); i++) {
		const line = lines[i]
		if (/^\t*\/\/ /.test(line)) {
			// Found a comment line - extract the name after "// "
			const match = line.match(/\/\/\s*(.+)/)
			if (match) {
				return match[1].trim()
			}
		}
		if (/^\t*ja:\s*"/.test(line)) {
			break // Stop at ja: line
		}
	}
	return null
}

/**
 * Look up the Japanese name for a given English Pokémon name using the Bulbapedia mapping.
 * Returns the Japanese name or null if not found.
 */
function lookupJapaneseNameByEnglishName(enName: string, _dataDir?: string): string | null {
	if (!enName) return null

	// Try exact match first
	if (POKEMON_EN_TO_JA[enName]) {
		return POKEMON_EN_TO_JA[enName]
	}

	// Try case-insensitive match
	const lowerName = enName.toLowerCase()
	for (const [key, value] of Object.entries(POKEMON_EN_TO_JA)) {
		if (key.toLowerCase() === lowerName) {
			return value
		}
	}

	return null
}

/**
 * Add or update the English name comment above the ja line.
 * Returns the modified content, or the original if no change needed.
 */
function addEnglishNameComment(content: string, enName: string): string {
	if (!enName) return content

	// Find the first ja: line (the card name, not attack names)
	// Look for ja: that appears early in the file (within the name block)
	const lines = content.split('\n')
	let jaLineIdx = -1
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]
		// Only look at the first few lines (within the name block)
		if (i > 20) break
		if (/^\t*ja:\s*"/.test(line)) {
			jaLineIdx = i
			break
		}
	}

	if (jaLineIdx === -1) return content

	const jaLine = lines[jaLineIdx]
	const indentMatch = jaLine.match(/^(\t*)/)
	const indent = indentMatch ? indentMatch[1] : '\t\t'

	// Check if there's already a comment above ja:
	// Look through all lines above ja: for any comment lines
	let commentLineIdx = -1
	for (let i = jaLineIdx - 1; i >= 0; i--) {
		if (/^\t*\/\//.test(lines[i])) {
			commentLineIdx = i
		} else {
			break // Stop at first non-comment line
		}
	}

	if (commentLineIdx !== -1) {
		// There's at least one comment line above ja:
		const existingComment = lines[commentLineIdx].trim()
		if (existingComment === `// ${enName}`) {
			// Comment exists with correct name - check if there are extra duplicates
			// Remove any extra comment lines between this one and ja:
			let removedAny = false
			for (let i = commentLineIdx + 1; i < jaLineIdx; i++) {
				if (/^\t*\/\//.test(lines[i])) {
					lines.splice(i, 1)
					i--
					jaLineIdx--
					removedAny = true
				}
			}
			if (removedAny) {
				return lines.join('\n')
			}
			return content // No change needed
		}
		// Comment exists but has wrong name - replace it and remove any extra comment lines
		lines[commentLineIdx] = `${indent}// ${enName}`
		// Remove any extra comment lines between this one and ja:
		for (let i = commentLineIdx + 1; i < jaLineIdx; i++) {
			if (/^\t*\/\//.test(lines[i])) {
				lines.splice(i, 1)
				i--
				jaLineIdx--
			}
		}
		return lines.join('\n')
	}

	// No comment exists - add one before ja:
	lines.splice(jaLineIdx, 0, `${indent}// ${enName}`)
	return lines.join('\n')
}

/**
 * Escape special regex characters in a string.
 */
function escapeRegex(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Update the dexId in the card file.
 */
function updateDexId(content: string, dexIds: number[]): string {
	if (!dexIds || dexIds.length === 0) return content

	const dexStr = dexIds.join(', ')
	const dexRegex = /dexId:\s*\[[\d,\s]*\]/
	if (dexRegex.test(content)) {
		return content.replace(dexRegex, `dexId: [${dexStr}]`)
	}
	// No dexId exists - add it after the category line
	const categoryRegex = /(category:\s*"[^"]*",?\n)/
	if (categoryRegex.test(content)) {
		return content.replace(categoryRegex, `$1\tdexId: [${dexStr}],\n`)
	}
	return content
}

/**
 * Download an image from a URL and save it to the specified path.
 * Returns true if the download was successful.
 */
async function downloadImage(url: string, outputPath: string): Promise<boolean> {
	try {
		const resp = await fetch(url)
		if (!resp.ok) {
			console.error(`    HTTP ${resp.status} downloading image`)
			return false
		}
		const buffer = await resp.arrayBuffer()
		fs.writeFileSync(outputPath, Buffer.from(buffer))
		return true
	} catch (err) {
		console.error(`    Failed to download image: ${err}`)
		return false
	}
}

// ── Bulbapedia helpers ────────────────────────────────────────────────────

/**
 * Fetch a Bulbapedia page and return the HTML text.
 */
async function fetchBulbapediaPage(url: string): Promise<string> {
	const resp = await fetch(url)
	if (!resp.ok) {
		throw new Error(`HTTP ${resp.status} for ${url}`)
	}
	return await resp.text()
}

/**
 * Extract the Japanese name from a Bulbapedia card page.
 * The page has: <span lang="ja"><b>タケシのズバット</b></span>
 */
function extractJapaneseNameFromCardPage(html: string): string | null {
	// Look for <span lang="ja"><b>...</b></span> pattern
	const match = html.match(/<span lang="ja"><b>([^<]+)<\/b><\/span>/)
	if (match) {
		return match[1].trim()
	}
	return null
}

/**
 * Parse a Bulbapedia set page to extract card names from a specific list section.
 *
 * The page has multiple card list tables. Each table is preceded by a header like:
 *   <big><b>Leaders' Stadium</b></big>
 *
 * We find the table under the specified list name and extract the English card names
 * from the <a> tags in the "Card name" column.
 *
 * Returns an array of { enName, cardPageUrl } objects.
 */
function parseBulbapediaCardList(html: string, listName: string): Array<{ enName: string; cardPageUrl: string }> {
	const cards: Array<{ enName: string; cardPageUrl: string }> = []

	// Find the list section by looking for the list name header.
	// The header is inside a <td> like: <td ...><big><b>Leaders' Stadium</b></big></td>
	// After the header, there's a card table with rows containing card links.
	const listNameEscaped = escapeRegex(listName)

	// Strategy: find the header, then find the next <table width="100%"> that contains card rows
	const headerRegex = new RegExp(
		`<big><b>${listNameEscaped}<\\/b><\\/big>`,
		'i'
	)
	const headerMatch = html.match(headerRegex)
	if (!headerMatch) {
		console.error(`  Could not find list section "${listName}" on the Bulbapedia page`)
		return cards
	}

	const headerIndex = headerMatch.index!
	const afterHeader = html.slice(headerIndex)

	// Find the next <table width="100%"> after the header
	const tableStartRegex = /<table[^>]*width="100%"[^>]*>/i
	const tableStartMatch = afterHeader.match(tableStartRegex)
	if (!tableStartMatch) {
		console.error(`  Could not find card table after "${listName}" header`)
		return cards
	}

	const tableStartIndex = tableStartMatch.index!
	// Find the matching closing </table> - count nested tables
	let depth = 0
	let tableEndIndex = -1
	const tableContent = afterHeader.slice(tableStartIndex)
	for (let i = 0; i < tableContent.length; i++) {
		if (tableContent.slice(i).match(/^<table[^>]*>/i)) {
			depth++
			// Skip past the opening tag
			const tagEnd = tableContent.indexOf('>', i)
			if (tagEnd !== -1) i = tagEnd
		} else if (tableContent.slice(i).match(/^<\/table>/i)) {
			depth--
			if (depth === 0) {
				tableEndIndex = tableStartIndex + i + 8 // +8 for "</table>"
				break
			}
			i += 7 // skip past </table>
		}
	}

	if (tableEndIndex === -1) {
		console.error(`  Could not find closing </table> for "${listName}" section`)
		return cards
	}

	const sectionHtml = afterHeader.slice(tableStartIndex, tableEndIndex - tableStartIndex)

	// Find all card rows in the table
	// Each row has: <td style="background:#FFFFFF"><a href="..." title="...">Card Name</a></td>
	// The card name is in a <td> (not <th>) with background:#FFFFFF
	// Note: there may be newlines/whitespace between <td> and <a>, so use [\s\S]*?
	const rowRegex = /<td[^>]*background:#FFFFFF[^>]*>[\s\S]*?<a href="([^"]+)"[^>]*>([^<]+)<\/a>[\s\S]*?<\/td>/g
	let rowMatch: RegExpExecArray | null
	while ((rowMatch = rowRegex.exec(sectionHtml)) !== null) {
		const cardPageUrl = rowMatch[1]
		const enName = rowMatch[2].trim()
		if (enName) {
			cards.push({ enName, cardPageUrl })
		}
	}

	return cards
}

/**
 * Build a mapping of English card names to Japanese names by scraping Bulbapedia.
 * For each card in the list, it fetches the individual card page to get the Japanese name.
 */
async function buildBulbapediaNameMap(
	bulbapediaUrl: string,
	listName: string
): Promise<Record<string, string>> {
	console.log(`\n─── Fetching Bulbapedia card list: "${listName}" ───`)
	console.log(`URL: ${bulbapediaUrl}`)

	const html = await fetchBulbapediaPage(bulbapediaUrl)
	const cards = parseBulbapediaCardList(html, listName)

	if (cards.length === 0) {
		console.error('  No cards found in the list!')
		return {}
	}

	console.log(`  Found ${cards.length} cards in the list`)

	const nameMap: Record<string, string> = {}
	let fetchedCount = 0
	let errorCount = 0

	for (const card of cards) {
		const { enName, cardPageUrl } = card

		// Build the full URL
		const fullUrl = cardPageUrl.startsWith('http')
			? cardPageUrl
			: `https://bulbapedia.bulbagarden.net${cardPageUrl}`

		try {
			const cardHtml = await fetchBulbapediaPage(fullUrl)
			const jaName = extractJapaneseNameFromCardPage(cardHtml)

			if (jaName) {
				nameMap[enName] = jaName
				fetchedCount++
				console.log(`  📖 ${enName} → ${jaName}`)
			} else {
				console.log(`  ⚠️  ${enName} - Could not find Japanese name on card page`)
				errorCount++
			}
		} catch (err) {
			console.log(`  ❌ ${enName} - Failed to fetch card page: ${err}`)
			errorCount++
		}

		// Small delay to be nice to Bulbapedia
		await new Promise((r) => setTimeout(r, 300))
	}

	console.log(`\n  Bulbapedia results: ${fetchedCount} names fetched, ${errorCount} errors`)
	return nameMap
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
	// If Bulbapedia mode is enabled, build the name mapping first
	let bulbapediaNameMap: Record<string, string> | null = null
	if (bulbapediaUrl && bulbapediaListName) {
		bulbapediaNameMap = await buildBulbapediaNameMap(bulbapediaUrl, bulbapediaListName)
		if (Object.keys(bulbapediaNameMap).length === 0) {
			console.error('  No names could be fetched from Bulbapedia. Aborting.')
			process.exit(1)
		}
	}
	// First, fetch the set page to get the total card count
	console.log(`Fetching set page: ${setUrl}`)
	let totalCards = 0
	try {
		const setPageData = await fetchCardPage(setUrl)
		totalCards = setPageData?.props?.pageProps?.setData?.total ?? 0
		console.log(`Detected ${totalCards} cards in the set`)
	} catch (err) {
		console.error(`Failed to fetch set page: ${err}`)
		process.exit(1)
	}

	if (totalCards === 0) {
		console.error('Could not determine total card count from set page')
		process.exit(1)
	}

	const startNum = startStr ? parseInt(startStr, 10) : 1
	let endNum = endStr ? parseInt(endStr, 10) : totalCards

	// Apply --limit if specified
	if (limitStr) {
		const limit = parseInt(limitStr, 10)
		endNum = Math.min(startNum + limit - 1, endNum)
	}

	console.log(`Processing cards ${startNum} to ${endNum} (${endNum - startNum + 1} cards)`)

	// Determine the base URL for card pages
	const cardBaseUrl = setUrl.replace(/\/+$/, '')

	// Determine the card file directory
	let cardDir = path.resolve(process.cwd(), dataDir, setId)
	if (!fs.existsSync(cardDir)) {
		const dataDirPath = path.resolve(process.cwd(), dataDir)
		const entries = fs.readdirSync(dataDirPath, { withFileTypes: true })
		for (const entry of entries) {
			if (entry.isDirectory()) {
				const candidate = path.join(dataDirPath, entry.name, setId)
				if (fs.existsSync(candidate)) {
					cardDir = candidate
					break
				}
			}
		}
	}

	if (!fs.existsSync(cardDir)) {
		console.error(`Card directory not found for set "${setId}" in ${dataDir}`)
		console.error(`Tried: ${path.resolve(process.cwd(), dataDir, setId)}`)
		process.exit(1)
	}
	console.log(`Card directory: ${cardDir}`)

	// Set up images directory
	let imagesDir: string | null = null
	if (downloadImages) {
		imagesDir = path.resolve(process.cwd(), 'images', setId)
		if (!fs.existsSync(imagesDir)) {
			fs.mkdirSync(imagesDir, { recursive: true })
		}
		console.log(`Images directory: ${imagesDir}`)
	}

	let updatedCount = 0
	let errorCount = 0
	let skippedCount = 0
	let imageCount = 0

	for (let num = startNum; num <= endNum; num++) {
		const padded = zeroPad(num)
		const cardUrl = `${cardBaseUrl}/${padded}`
		const cardFilePath = path.join(cardDir, `${padded}.ts`)

		// Read existing card file
		const existingContent = readCardFile(cardFilePath)
		if (!existingContent) {
			console.log(`  ⏭️  ${padded} - Card file not found, skipping`)
			skippedCount++
			continue
		}

		// Fetch card data from pkmn.gg
		let cardData: any
		try {
			const pageData = await fetchCardPage(cardUrl)
			cardData = pageData?.props?.pageProps?.cardData
			if (!cardData) {
				console.log(`  ⚠️  ${padded} - No cardData in response, skipping`)
				skippedCount++
				continue
			}
		} catch (err) {
			console.log(`  ❌ ${padded} - Failed to fetch: ${err}`)
			errorCount++
			continue
		}

		let modified = false
		let content = existingContent

		// 1. Update Japanese name
		const jaName = cardData?.altName?.JP
		const enName = cardData?.name

		// Determine the correct Japanese name for this card:
		// 1. First try Bulbapedia name map (if --bulbapedia was used)
		// 2. Then try pkmn.gg's altName.JP
		// 3. If not available, look it up from the existing database using the English name
		let correctJaName = jaName
		if (bulbapediaNameMap && enName && bulbapediaNameMap[enName]) {
			correctJaName = bulbapediaNameMap[enName]
		} else if (!correctJaName && enName) {
			correctJaName = lookupJapaneseNameByEnglishName(enName, dataDir)
		}

		// Check if the English name from pkmn.gg matches the English name comment in the file.
		// If they don't match, the card file likely has data for a different Pokémon.
		const existingEnName = extractEnglishNameFromComment(content)
		if (enName && existingEnName && enName !== existingEnName) {
			console.log(`  ⚠️  ${padded} - English name mismatch: file says "${existingEnName}", pkmn.gg says "${enName}"`)
		}

		// If we have a correct Japanese name, check if the file's name.ja needs updating
		if (correctJaName) {
			const newContent = updateJapaneseName(content, correctJaName)
			if (newContent !== content) {
				let source = 'pkmn.gg'
				if (bulbapediaNameMap && enName && bulbapediaNameMap[enName]) {
					source = 'Bulbapedia'
				} else if (!jaName) {
					source = 'Pokédex lookup'
				}
				console.log(`  📝 ${padded} - Fixed name.ja to "${correctJaName}" (from ${source})`)
				content = newContent
				modified = true
			}
		}

		// 2. Add/update English name comment above ja:
		if (enName) {
			const newContent = addEnglishNameComment(content, enName)
			if (newContent !== content) {
				console.log(`  📝 ${padded} - Added English name comment "${enName}"`)
				content = newContent
				modified = true
			}
		}

		// 3. Update dexId
		const dexIds = cardData?.nationalPokedexNumbers
		if (dexIds && dexIds.length > 0) {
			const newContent = updateDexId(content, dexIds)
			if (newContent !== content) {
				console.log(`  📝 ${padded} - Updated dexId to [${dexIds.join(', ')}]`)
				content = newContent
				modified = true
			}
		}

		// 4. Update TCGPlayer IDs for normal/holo variants
		const variations = cardData?.variations ?? []
		for (const variation of variations) {
			const variantType = variation.name?.toLowerCase()
			const tcgPlayerId = variation.tcgPlayerId ? parseInt(variation.tcgPlayerId, 10) : null

			// Only handle normal and holo variants
			if (variantType !== 'normal' && variantType !== 'holo') {
				continue
			}

			if (!tcgPlayerId) {
				continue
			}

			// Check if this tcgplayer ID already exists in the file
			if (hasTcgPlayerId(content, tcgPlayerId)) {
				// Already exists and is correct - skip
				continue
			}

			// Update or add the variant with tcgplayer
			const newContent = updateVariant(content, variantType, tcgPlayerId)
			if (newContent !== content) {
				console.log(`  📝 ${padded} - ${variantType === 'holo' ? 'Updated/added holo' : 'Updated/added normal'} variant with tcgplayer: ${tcgPlayerId}`)
				content = newContent
				modified = true
			}
		}

		// Write changes if modified
		if (modified) {
			if (dryRun) {
				console.log(`  🔍 ${padded} - Would update (dry-run)`)
			} else if (apply) {
				fs.writeFileSync(cardFilePath, content, 'utf-8')
				console.log(`  ✅ ${padded} - Updated`)
				updatedCount++
			} else {
				console.log(`  🔍 ${padded} - Would update (use --apply to apply)`)
			}
		} else {
			console.log(`  ✅ ${padded} - No changes needed`)
		}

		// 4. Download card image
		if (downloadImages && imagesDir) {
			const imagePath = path.join(imagesDir, `${padded}.webp`)
			if (fs.existsSync(imagePath)) {
				// Image already exists, skip
			} else {
				// Use the largeImageUrl from pkmn.gg - it's already webp format
				const imageUrl = cardData?.largeImageUrl
				if (imageUrl) {
					console.log(`  🖼️  ${padded} - Downloading image...`)
					const success = await downloadImage(imageUrl, imagePath)
					if (success) {
						imageCount++
					} else {
						console.log(`  ⚠️  ${padded} - Failed to download image`)
					}
				} else {
					console.log(`  ⚠️  ${padded} - No image URL available`)
				}
			}
		}

		// Small delay to be nice to the server
		await new Promise((r) => setTimeout(r, 200))
	}

	// Summary
	console.log('\n─── Summary ───')
	console.log(`Total cards:     ${endNum - startNum + 1}`)
	console.log(`Updated:         ${updatedCount}`)
	console.log(`Skipped:         ${skippedCount}`)
	console.log(`Errors:          ${errorCount}`)
	if (downloadImages) {
		console.log(`Images:          ${imageCount}`)
	}
	if (dryRun) {
		console.log('Mode:            DRY RUN (no files modified)')
	} else if (!apply) {
		console.log('Mode:            PREVIEW (use --apply to write changes)')
	} else {
		console.log('Mode:            APPLY')
	}
}

main().catch((err) => {
	console.error('Fatal error:', err)
	process.exit(1)
})
