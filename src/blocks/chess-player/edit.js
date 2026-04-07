import {
	BlockControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const TEMPLATE = [
	[
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
	],
];

const Edit = ({ attributes, setAttributes }) => {
	const playerSide = attributes.playerSide || "white";

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: TEMPLATE,
	});

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						isPressed={playerSide === "black"}
						label={__("Use black player", "gutenberg-chess")}
						onClick={() => setAttributes({ playerSide: "black" })}
					>
						{__("Black", "gutenberg-chess")}
					</ToolbarButton>
					<ToolbarButton
						isPressed={playerSide === "white"}
						label={__("Use white player", "gutenberg-chess")}
						onClick={() => setAttributes({ playerSide: "white" })}
					>
						{__("White", "gutenberg-chess")}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<div {...innerBlocksProps} />
		</>
	);
};

export default Edit;
