import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Reset Stamp",
	},
	rarity: "Promo",
	category: "Trainer",
	set: Set,

	effect: {
		en: "Your opponent shuffles their hand into their deck and draws a card for each of their remaining Prize cards. You may play as many Item cards as you like during your turn (before your attack).",
	},
	trainerType: "Item",

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 216707
			},
		},
	],
}

export default card
