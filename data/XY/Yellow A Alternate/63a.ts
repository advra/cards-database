import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Guzzlord GX",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 210,
	types: [
		"Darkness",
	],
	stage: "Basic",

	attacks: [
		{
			cost: [
				"Darkness",
			],
			name: {
				en: "Eat Sloppily",
			},
			effect: {
				en: "Discard the top 5 cards of your deck. If any of those cards are Energy cards, attach them to this Pokémon.",
			},

		},
		{
			cost: [
				"Colorless",
				"Darkness",
				"Darkness",
				"Darkness",
			],
			name: {
				en: "Tyrannical Hole",
			},
			damage: 180,

		},
	],
	weaknesses: [
		{
			type: "Fighting",
			value: "×2"
		},
	],
	resistances: [
		{
			type: "Psychic",
			value: "-20"
		},
	],

	retreat: 4,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 155599
			},
		},
	],
}

export default card
