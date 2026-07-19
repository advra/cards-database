import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Pokegear 3.0",
	},
	rarity: "Promo",
	category: "Trainer",
	set: Set,

	effect: {
		en: "Look at the top 7 cards of your deck. You may reveal a Supporter card you find there and put it into your hand. Shuffle the other cards back into your deck. You may play as many Item cards as you like during your turn (before your attack).",
	},
	trainerType: "Item",

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 216705
			},
		},
	],
}

export default card
