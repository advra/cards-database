import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Jirachi GX",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 160,
	types: [
		"Psychic",
	],
	stage: "Basic",

	abilities: [
		{
			type: "Ability",
			name: {
				en: "Psychic Zone",
			},
			effect: {
				en: "Don't apply Psychic Weakness when Pokémon (both yours and your opponent's) take damage from attacks.",
			},
		},
	],

	attacks: [
		{
			cost: [
				"Psychic",
			],
			name: {
				en: "Star Search",
			},
			effect: {
				en: "Search your deck for an Energy card and attach it to 1 of your Psychic Pokémon. Then, shuffle your deck.",
			},

		},
	],
	weaknesses: [
		{
			type: "Psychic",
			value: "×2"
		},
	],

	retreat: 1,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 226132
			},
		},
	],
}

export default card
