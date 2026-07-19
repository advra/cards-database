import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Heatran",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 130,
	types: [
		"Metal",
	],
	stage: "Basic",

	attacks: [
		{
			cost: [
				"Colorless",
				"Metal",
			],
			name: {
				en: "Guard Press",
			},
			effect: {
				en: "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance).",
			},
			damage: 30,

		},
		{
			cost: [
				"Colorless",
				"Metal",
				"Metal",
			],
			name: {
				en: "Boiling Impact",
			},
			effect: {
				en: "Discard 2 Energy from this Pokémon.",
			},
			damage: 130,

		},
	],
	weaknesses: [
		{
			type: "Fire",
			value: "×2"
		},
	],
	resistances: [
		{
			type: "Psychic",
			value: "-20"
		},
	],

	retreat: 3,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 212993
			},
		},
	],
}

export default card
