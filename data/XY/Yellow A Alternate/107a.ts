import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Professor Sycamore",
		fr: "Professeur Platane",
	},
	illustrator: "Naoki Saito",
	rarity: "Uncommon",
	category: "Trainer",

	set: Set,

	effect: {
		en: "Discard your hand and draw 7 cards.",
		fr: "Défaussez votre main et piochez 7 cartes.",
	},
	trainerType: "Supporter",

	variants: [
		{
			type: "normal",
			thirdParty: {
				tcgplayer: 133814
			},
		},
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 133813
			},
		},
	],

}

export default card
