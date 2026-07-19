import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Porygon-Z",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 130,
	types: [
		"Colorless",
	],
	stage: "Stage2",

	abilities: [
		{
			type: "Ability",
			name: {
				en: "Initialize",
			},
			effect: {
				en: "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may devolve each of your opponent's evolved Pokémon by putting the highest Stage Evolution card on it into your opponent's hand.",
			},
		},
	],

	attacks: [
		{
			cost: [
				"Colorless",
			],
			name: {
				en: "Zap Cannon",
			},
			effect: {
				en: "This Pokémon can't use Zap Cannon during your next turn.",
			},
			damage: 80,

		},
	],
	weaknesses: [
		{
			type: "Fighting",
			value: "×2"
		},
	],

	retreat: 2,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 161362
			},
		},
	],
}

export default card
