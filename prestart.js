/**
 * Code By EpicYoshiMaster
 * Jump Button
 * 
 * Revolutionary technology, this adds a manual jump button to the game so that players can experience
 * the joys of having to jump!
 */

sc.OPTIONS_DEFINITION["keys-jump-button"] = {
	type: "CONTROLS",
	init: {
		key1: ig.KEY.V,
		key2: undefined
	},
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: true,
	header: "cc-jump-button",
};