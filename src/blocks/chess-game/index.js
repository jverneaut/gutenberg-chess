import { InnerBlocks } from "@wordpress/block-editor";
import { registerBlockType, registerBlockVariation } from "@wordpress/blocks";

import metadata from "./block.json";
import Edit from "./edit";
import "./editor.scss";

const PLAYER_CARD_BLOCK = [
	"core/group",
	{
		style: {
			spacing: {
				blockGap: "var:preset|spacing|20",
			},
		},
		layout: {
			type: "flex",
			flexWrap: "nowrap",
		},
	},
	[
		[
			"gutenberg-chess/chess-player-avatar",
			{
				size: 32,
			},
		],
		[
			"gutenberg-chess/chess-player-name",
			{
				style: {
					layout: {
						selfStretch: "fill",
						flexSize: null,
					},
					typography: {
						fontStyle: "normal",
						fontWeight: "700",
					},
				},
			},
		],
		[
			"gutenberg-chess/chess-player-status",
			{
				style: {
					layout: {
						selfStretch: "fit",
						flexSize: null,
					},
					elements: {
						link: {
							color: {
								text: "var:preset|color|base",
							},
						},
					},
					spacing: {
						padding: {
							right: "var:preset|spacing|20",
							left: "var:preset|spacing|20",
							top: "4px",
							bottom: "4px",
						},
					},
					typography: {
						fontStyle: "normal",
						fontWeight: "700",
					},
				},
				backgroundColor: "contrast",
				textColor: "base",
				fontSize: "small",
			},
		],
	],
];

const MOVES_ROW_BLOCK = [
	"core/columns",
	{
		isStackedOnMobile: false,
		style: {
			spacing: {
				padding: {
					top: "2px",
					bottom: "2px",
					left: "0",
					right: "0",
				},
				blockGap: {
					top: "0",
					left: "var:preset|spacing|20",
				},
				margin: {
					top: "0",
					bottom: "0",
				},
			},
		},
	},
	[
		[
			"core/column",
			{
				width: "16%",
				style: {
					spacing: {
						padding: {
							top: "0",
							bottom: "0",
						},
					},
				},
				layout: {
					type: "default",
				},
			},
			[["gutenberg-chess/chess-move-index"]],
		],
		[
			"core/column",
			{
				width: "42%",
			},
			[["gutenberg-chess/chess-move"]],
		],
		[
			"core/column",
			{
				width: "42%",
			},
			[
				[
					"gutenberg-chess/chess-move",
					{
						side: "black",
					},
				],
			],
		],
	],
];

const DEFAULT_CHESS_GAME_VARIATION_INNER_BLOCKS = [
	[
		"core/columns",
		{},
		[
			[
				"core/column",
				{
					width: "66.66%",
				},
				[
					[
						"gutenberg-chess/chess-player",
						{
							playerSide: "black",
						},
						[PLAYER_CARD_BLOCK],
					],
					["gutenberg-chess/chess-board"],
					[
						"gutenberg-chess/chess-player",
						{
							playerSide: "white",
						},
						[PLAYER_CARD_BLOCK],
					],
				],
			],
			[
				"core/column",
				{
					width: "33.33%",
				},
				[
					[
						"core/group",
						{
							style: {
								spacing: {
									padding: {
										top: "var:preset|spacing|50",
										bottom: "var:preset|spacing|50",
									},
									blockGap: "0",
								},
							},
							fontSize: "small",
							layout: {
								type: "constrained",
							},
						},
						[
							[
								"gutenberg-chess/chess-moves",
								{},
								[
									[
										"gutenberg-chess/chess-moves-template",
										{},
										[MOVES_ROW_BLOCK],
									],
								],
							],
						],
					],
				],
			],
		],
	],
];

registerBlockType(metadata, {
	edit: Edit,
	save: () => <InnerBlocks.Content />,
});

registerBlockVariation(metadata.name, {
	name: "default-layout",
	title: metadata.title,
	isDefault: true,
	scope: ["inserter"],
	innerBlocks: DEFAULT_CHESS_GAME_VARIATION_INNER_BLOCKS,
});
