import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Dedenne GX",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 160,
	types: [
		"Lightning",
	],
	stage: "Basic",

	abilities: [
		{
			type: "Ability",
			name: {
				en: "Dedechange",
			},
			effect: {
				en: "When you play this Pokémon from your hand onto your Bench during your turn, you may discard your hand and draw 6 cards. You can't use more than 1 Dedechange Ability each turn.",
			},
		},
	],

	attacks: [
		{
			cost: [
				"Colorless",
				"Lightning",
			],
			name: {
				en: "Static Shock",
			},
			damage: 50,

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
			type: "Metal",
			value: "-20"
		},
	],

	retreat: 1,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 216699
			},
		},
	],
}

export default card
