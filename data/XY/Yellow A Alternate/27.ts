import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Oshawott",
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
			cost: [
				"Water",
			],
			name: {
				en: "Tackle",
			},
			damage: 10,

		},
		{
			cost: [
				"Colorless",
				"Water",
			],
			name: {
				en: "Water Gun",
			},
			damage: 20,

		},
	],

	retreat: 1,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 211603
			},
		},
	],
}

export default card
