import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Pokemon Communication",
	},
	rarity: "Promo",
	category: "Trainer",
	set: Set,

	effect: {
		en: "Reveal a Pokémon from your hand and put it into your deck. if you do, search your deck for a Pokémon, reveal it, and put it into your hand. Then, shuffle your deck. You may play as many Item cards as you like during your turn (before your attack).",
	},
	trainerType: "Item",

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 216702
			},
		},
	],
}

export default card
