import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Tapu Fini GX",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 170,
	types: [
		"Water",
	],
	stage: "Basic",

	attacks: [
		{
			cost: [
				"Colorless",
			],
			name: {
				en: "Aqua Ring",
			},
			effect: {
				en: "You may switch this Pokémon with 1 of your Benched Pokémon.",
			},
			damage: 20,

		},
		{
			cost: [
				"Colorless",
				"Water",
				"Water",
			],
			name: {
				en: "Hydro Shot",
			},
			effect: {
				en: "Discard 2 Water Energy from this Pokémon. This attack does 120 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)",
			},

		},
	],

	retreat: 1,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 179371
			},
		},
	],
}

export default card
