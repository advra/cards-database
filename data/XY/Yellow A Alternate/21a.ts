import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Alolan Vulpix",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 60,
	types: [
		"Water",
	],
	stage: "Basic",

	attacks: [
		{
			name: {
				en: "Beacon",
			},
			effect: {
				en: "Search your deck for up to 2 Pokémon, reveal them, and put them into your hand. Then, shuffle your deck.",
			},

		},
		{
			cost: [
				"Colorless",
			],
			name: {
				en: "Icy Snow",
			},
			damage: 20,

		},
	],
	weaknesses: [
		{
			type: "Metal",
			value: "×2"
		},
	],

	retreat: 1,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 174488
			},
		},
	],
}

export default card
