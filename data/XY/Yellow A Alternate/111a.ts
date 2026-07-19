import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Shauna",
	},
	rarity: "Promo",
	category: "Trainer",
	set: Set,

	effect: {
		en: "Shuffle your hand into your deck. Then, draw 5 cards. You may play only 1 Supporter card during your turn (before your attack).",
	},
	trainerType: "Supporter",

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 148349
			},
		},
	],
}

export default card
