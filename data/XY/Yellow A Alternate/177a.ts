import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Rayquaza GX",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 180,
	types: [
		"Dragon",
	],
	stage: "Basic",

	abilities: [
		{
			type: "Ability",
			name: {
				en: "Stormy Winds",
			},
			effect: {
				en: "When you play this Pokemon from your hand onto your Bench during your turn, you may discard the top 3 cards of your deck. If you do, attach a basic Energy card from your discard pile to this Pokémon.",
			},
		},
	],

	attacks: [
		{
			cost: [
				"Colorless",
				"Grass",
				"Lightning",
			],
			name: {
				en: "Dragon Break",
			},
			effect: {
				en: "This attack does 30 damage times the amount of basic Grass and basic Lightning Energy attached to your Pokémon.",
			},
			damage: "30x",

		},
	],
	weaknesses: [
		{
			type: "Fairy",
			value: "×2"
		},
	],

	retreat: 3,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 202638
			},
		},
	],
}

export default card
