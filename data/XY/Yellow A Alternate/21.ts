import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Slowking",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 100,
	types: [
		"Water",
	],
	stage: "Stage1",

	abilities: [
		{
			type: "Ability",
			name: {
				en: "Royal Flash",
			},
			effect: {
				en: "Once during your turn (before your attack), you may flip a coin. If heads, move an Energy from your opponent's Active Pokémon to 1 of his or her Benched Pokémon.",
			},
		},
	],

	attacks: [
		{
			cost: [
				"Colorless",
				"Water",
			],
			name: {
				en: "Psych Up",
			},
			effect: {
				en: "During your next turn, this Pokémon's Psych Up attack does 40 more damage (before applying Weakness and Resistance).",
			},
			damage: 40,

		},
	],
	weaknesses: [
		{
			type: "Grass",
			value: "×2"
		},
	],

	retreat: 2,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 148388
			},
		},
	],
}

export default card
