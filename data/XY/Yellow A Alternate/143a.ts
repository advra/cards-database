import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Togepi & Cleffa & Igglybuff GX",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 240,
	types: [
		"Fairy",
	],
	stage: "Basic",

	attacks: [
		{
			cost: [
				"Colorless",
				"Fairy",
				"Fairy",
			],
			name: {
				en: "Rolling Panic",
			},
			effect: {
				en: "Flip a coin until you get tails. This attack does 30 more damage for each heads.",
			},
			damage: "120+",

		},
	],
	weaknesses: [
		{
			type: "Metal",
			value: "×2"
		},
	],
	resistances: [
		{
			type: "Darkness",
			value: "-20"
		},
	],

	retreat: 2,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 226129
			},
		},
	],
}

export default card
