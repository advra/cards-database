import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Charmander",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 70,
	types: [
		"Fire",
	],
	stage: "Basic",

	attacks: [
		{
			cost: [
				"Colorless",
			],
			name: {
				en: "Scratch",
			},
			damage: 10,

		},
		{
			cost: [
				"Colorless",
				"Fire",
			],
			name: {
				en: "Flame Tail",
			},
			damage: 20,

		},
	],
	weaknesses: [
		{
			type: "Water",
			value: "×2"
		},
	],

	retreat: 1,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 186106
			},
		},
	],
}

export default card
