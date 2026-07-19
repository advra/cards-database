import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Delinquent",
	},
	rarity: "Promo",
	category: "Trainer",
	set: Set,

	effect: {
		en: "Discard any Stadium card in play. If you do, your opponent discards 3 cards from his or her hand. You may play only 1 Supporter card during your turn (before your attack).",
	},
	trainerType: "Supporter",

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 177167
			},
		},
	],
}

export default card
