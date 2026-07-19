import { Card } from '../../../interfaces'
import Set from '../Yellow A Alternate'

const card: Card = {
	name: {
		en: "Metagross GX",
	},
	rarity: "Promo",
	category: "Pokemon",
	set: Set,

	hp: 250,
	types: [
		"Metal",
	],
	stage: "Stage2",

	abilities: [
		{
			type: "Ability",
			name: {
				en: "Geotech System",
			},
			effect: {
				en: "Once during your turn (before your attack), you may attach a Psychic or Metal Energy card from your discard pile to your Active Pokémon.",
			},
		},
	],

	attacks: [
		{
			cost: [
				"Colorless",
				"Metal",
				"Metal",
			],
			name: {
				en: "Giga Hammer",
			},
			effect: {
				en: "This Pokémon can't use Giga Hammer during your next turn.",
			},
			damage: 150,

		},
	],
	weaknesses: [
		{
			type: "Fire",
			value: "×2"
		},
	],
	resistances: [
		{
			type: "Psychic",
			value: "-20"
		},
	],

	retreat: 3,

	variants: [
		{
			type: "holo",
			thirdParty: {
				tcgplayer: 198530
			},
		},
	],
}

export default card
