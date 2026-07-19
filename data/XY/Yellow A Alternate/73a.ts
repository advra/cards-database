import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Team Flare Grunt",
	},
	rarity: "Promo",
	category: "Trainer",
	set: Set,

	effect: {
		en: "Discard an Energy attached to your opponent's Active Pokémon. You may play only 1 Supporter card during your turn (before your attack).",
	},
	trainerType: "Supporter",

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 148351
			},
		},
	],
}

export default card
