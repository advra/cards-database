import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Sightseer",
	},
	rarity: "Promo",
	category: "Trainer",
	set: Set,

	effect: {
		en: "You may discard any number of cards from your hand. Then, draw cards until you have 5 cards in your hand. If you can't draw any cards this way, you can't play this card. You may play only 1 Supporter card during your turn (before your attack).",
	},
	trainerType: "Supporter",

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 200204
			},
		},
	],
}

export default card
