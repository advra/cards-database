import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Eevee",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 60,
	types: [
		"Colorless",
	],
	stage: "Basic",

	abilities: [
		{
			type: "Ability",
			name: {
				en: "Energy Evolution",
			},
			effect: {
				en: "When you attach a basic Energy card from your hand to this Pokémon during your turn, you may search your deck for a card that evolves from this Pokémon that is the same type as that Energy card and put it onto this Pokémon to evolve it. Then, shuffle your deck.",
			},
		},
	],

	attacks: [
		{
			cost: [
				"Colorless",
			],
			name: {
				en: "Quick Draw",
			},
			effect: {
				en: "Flip a coin. If heads, draw a card.",
			},

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
				tcgplayer: 179380
			},
		},
	],
}

export default card
