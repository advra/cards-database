import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Aegislash Ex",
	},
	illustrator: "Ryo Ueda",
	rarity: "Promo",
	category: "Pokemon",

	dexId: [681],
	set: Set,

	hp: 170,
	types: [
		"Metal",
	],
	stage: "Basic",

	abilities: [
		{
			type: "Ability",
			name: {
				en: "Mighty Shield",
			},
			effect: {
				en: "Prevent all damage done to this Pokémon by attacks from each of your opponent's Pokémon that has Special Energy attached to it."
			},
		},
	],

	attacks: [
		{
			cost: [
				"Colorless",
				"Colorless",
				"Colorless",
			],
			name: {
				en: "Slash Blast",
			},
			effect: {
				en: "Discard an Energy attached to your opponent’s Active Pokémon.",
			},
			damage: 140,

		},
	],
	weaknesses: [
		{
			type: "Fire",
			value: "×2"
		},
	],

	resistances: [
		{
			type: "Psychic",
			value: "×2"
		},
	],

	retreat: 2,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 148340
			},
		},
	],

}

export default card
