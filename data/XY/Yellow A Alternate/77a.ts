import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Zoroark GX",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 210,
	types: [
		"Darkness",
	],
	stage: "Stage1",

	abilities: [
		{
			type: "Ability",
			name: {
				en: "Trade",
			},
			effect: {
				en: "Once during your turn (before your attack), you may discard a card from your hand. If you do, draw 2 cards.",
			},
		},
	],

	attacks: [
		{
			cost: [
				"Colorless",
			],
			name: {
				en: "Riotous Beating",
			},
			effect: {
				en: "This attack does 20 damage for each of your Pokémon in play.",
			},
			damage: "20x",

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
			type: "Psychic",
			value: "-20"
		},
	],

	retreat: 2,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 198529
			},
		},
	],
}

export default card
