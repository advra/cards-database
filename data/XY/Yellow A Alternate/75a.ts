import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Hex Maniac",
	},
	rarity: "Promo",
	category: "Trainer",
	set: Set,

	effect: {
		en: "Until the end of your opponent's next turn, each Pokémon in play, in each player's hand, and in each player's discard pile has no Abilities. (This includes cards that come into play on that turn.) You may play only 1 Supporter card during your turn (before your attack).",
	},
	trainerType: "Supporter",

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 148342
			},
		},
	],
}

export default card
