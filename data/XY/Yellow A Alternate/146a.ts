import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Professor's Letter",
	},
	rarity: "Promo",
	category: "Trainer",
	set: Set,

	effect: {
		en: "Search your deck for up to 2 basic Energy cards, reveal them, and put them into your hand. Shuffle your deck afterward. You may play as many Item cards as you like during your turn (before your attack).",
	},
	trainerType: "Item",

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 177166
			},
		},
	],
}

export default card
