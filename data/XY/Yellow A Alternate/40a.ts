import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Altaria",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 80,
	types: [
		"Dragon",
	],
	stage: "Stage1",

	abilities: [
		{
			type: "Ability",
			name: {
				en: "Fight Song",
			},
			effect: {
				en: "Your Dragon Pokémon's attacks do 20 more damage to your opponent’s Active Pokémon (before applying Weakness and Resistance).",
			},
		},
	],

	attacks: [
		{
			cost: [
				"Colorless",
			],
			name: {
				en: "Pierce",
			},
			damage: 20,

		},
	],
	weaknesses: [
		{
			type: "Fairy",
			value: "×2"
		},
	],

	retreat: 1,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 184219
			},
		},
	],
}

export default card
