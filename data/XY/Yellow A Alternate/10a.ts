import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Sceptile",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 140,
	types: [
		"Grass",
	],
	stage: "Stage2",

	abilities: [
		{
			type: "Ability",
			name: {
				en: "Power of Nature",
			},
			effect: {
				en: "Prevent all damage done to your Pokémon that have any Grass Energy attached to them by attacks from your opponent's Ultra Beasts.",
			},
		},
	],

	attacks: [
		{
			cost: [
				"Grass",
			],
			name: {
				en: "Powerful Storm",
			},
			effect: {
				en: "This attack does 20 damage times the amount of Energy attached to all of your Pokémon.",
			},
			damage: "20x",

		},
	],
	weaknesses: [
		{
			type: "Fire",
			value: "×2"
		},
	],

	retreat: 1,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 189786
			},
		},
	],
}

export default card
