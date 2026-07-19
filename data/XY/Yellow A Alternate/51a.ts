import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Garbodor",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 120,
	types: [
		"Psychic",
	],
	stage: "Stage1",

	attacks: [
		{
			cost: [
				"Psychic",
			],
			name: {
				en: "Trashalance",
			},
			effect: {
				en: "This attack does 20 damage for each Item card in your opponent's discard pile.",
			},
			damage: "20x",

		},
		{
			cost: [
				"Colorless",
				"Psychic",
			],
			name: {
				en: "Acid Spray",
			},
			effect: {
				en: "Flip a coin. If heads, discard an Energy from your opponent's Active Pokémon.",
			},
			damage: 70,

		},
	],
	weaknesses: [
		{
			type: "Psychic",
			value: "×2"
		},
	],

	retreat: 3,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 191907
			},
		},
	],
}

export default card
