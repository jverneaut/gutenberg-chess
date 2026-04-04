import {
	BlockControls,
	useBlockEditContext,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { useEffect, useMemo } from "react";

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
				"core/avatar",
				{
					size: 24,
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

const getPlayerIdFromContext = (playerSide, context) =>
	playerSide === "black"
		? context["gutenberg-chess/blackPlayerId"] || 0
		: context["gutenberg-chess/whitePlayerId"] || 0;

const getBlocksByName = (block, blockName) => {
	if (!block) {
		return [];
	}

	const currentBlock = block.name === blockName ? [block] : [];
	const childBlocks = (block.innerBlocks || []).flatMap((innerBlock) =>
		getBlocksByName(innerBlock, blockName),
	);

	return [...currentBlock, ...childBlocks];
};

const Edit = ({ attributes, context, setAttributes }) => {
	const { clientId } = useBlockEditContext();
	const { updateBlockAttributes } = useDispatch("core/block-editor");
	const playerSide = attributes.playerSide || "white";
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: TEMPLATE,
	});
	const rootBlock = useSelect(
		(select) => select("core/block-editor").getBlock(clientId),
		[clientId],
	);
	const avatarBlocks = useMemo(
		() =>
			getBlocksByName(rootBlock, "core/avatar").map((block) => ({
				clientId: block.clientId,
				userId: block.attributes.userId || 0,
			})),
		[rootBlock],
	);
	const playerId = getPlayerIdFromContext(playerSide, context);

	useEffect(() => {
		if (attributes.playerId === playerId) {
			return;
		}

		setAttributes({ playerId });
	}, [attributes.playerId, playerId, setAttributes]);

	useEffect(() => {
		avatarBlocks.forEach((avatarBlock) => {
			if (avatarBlock.userId === playerId) {
				return;
			}

			updateBlockAttributes(avatarBlock.clientId, { userId: playerId });
		});
	}, [avatarBlocks, playerId, updateBlockAttributes]);

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
