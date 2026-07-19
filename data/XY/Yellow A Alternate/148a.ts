import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Tate & Liza",
	},
	rarity: "Promo",
	category: "Trainer",
	set: Set,

	effect: {
		en: "Choose one: • Shuffle your hand into your deck, then draw 5 cards. • Switch your Active Pokémon with 1 of your Benched Pokémon You may play only 1 Supporter card during your turn (before your attack).",
	},
	trainerType: "Supporter",

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 200203
			},
		},
	],
}

export default card
