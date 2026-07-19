import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Alolan Sandshrew",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 60,
	types: [
		"Water",
	],
	stage: "Basic",

	attacks: [
		{
			name: {
				en: "Defense Curl",
			},
			effect: {
				en: "Flip a coin. If heads, prevent all damage done to this Pokémon by attacks during your opponent's next turn.",
			},

		},
		{
			cost: [
				"Colorless",
				"Water",
			],
			name: {
				en: "Ice Ball",
			},
			damage: 30,

		},
	],
	weaknesses: [
		{
			type: "Metal",
			value: "×2"
		},
	],

	retreat: 1,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 197853
			},
		},
	],
}

export default card
