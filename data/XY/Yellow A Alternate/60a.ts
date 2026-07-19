import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Tapu Lele GX",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 170,
	types: [
		"Psychic",
	],
	stage: "Basic",

	abilities: [
		{
			type: "Ability",
			name: {
				en: "Wonder Tag",
			},
			effect: {
				en: "When you play this Pokémon from your hand onto your Bench during your turn, you may search your deck for a Supporter card, reveal it, and put it into your hand. Then, shuffle your deck.",
			},
		},
	],

	attacks: [
		{
			cost: [
				"Colorless",
			],
			name: {
				en: "Energy Drive",
			},
			effect: {
				en: "This attack does 20 damage times the amount of Energy attached to both Active Pokémon. This damage isn't affect by Weakness or Resistance.",
			},
			damage: "20x",

		},
	],

	retreat: 1,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 179367
			},
		},
	],
}

export default card
