import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Regigigas",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 180,
	types: [
		"Colorless",
	],
	stage: "Basic",

	abilities: [
		{
			type: "Ability",
			name: {
				en: "Seal of Antiquity",
			},
			effect: {
				en: "This Pokémon can't attack unless Regirock, Regice, and Registeel are on your Bench.",
			},
		},
	],

	attacks: [
		{
			cost: [
				"Colorless",
				"Colorless",
				"Colorless",
				"Colorless",
				"Colorless",
			],
			name: {
				en: "Giant Stomp",
			},
			effect: {
				en: "Discard any Stadium card in play.",
			},
			damage: 160,

		},
	],
	weaknesses: [
		{
			type: "Fighting",
			value: "×2"
		},
	],

	retreat: 4,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 184331
			},
		},
	],
}

export default card
