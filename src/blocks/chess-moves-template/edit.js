import { memo, useMemo } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import {
	BlockContextProvider,
	__experimentalUseBlockPreview as useBlockPreview,
	useBlockEditContext,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { store as blockEditorStore } from "@wordpress/block-editor";

import { buildMoveRows } from "../../components/move-rows";

const TEMPLATE = [
	[
		"core/columns",
		{
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
	],
];
const EMPTY_ROW = {
	moveNumber: 1,
	whiteMove: "",
	blackMove: "",
};

const getRowContext = (row, isLastRow) => ({
	"gutenberg-chess/moveNumber": row.moveNumber,
	"gutenberg-chess/whiteMove": row.whiteMove,
	"gutenberg-chess/blackMove": row.blackMove,
	"gutenberg-chess/hasWhiteMove": !!row.whiteMove,
	"gutenberg-chess/hasBlackMove": !!row.blackMove,
	"gutenberg-chess/isLastMoveRow": isLastRow,
});

const TemplateInnerBlocks = () => {
	const innerBlocksProps = useInnerBlocksProps(
		{ className: "gc-chess-moves-row" },
		{
			template: TEMPLATE,
			templateLock: false,
			__unstableDisableLayoutClassNames: true,
		},
	);

	return <div {...innerBlocksProps} />;
};

const TemplateRowPreview = ({ blocks, rowContext }) => {
	const blockPreviewProps = useBlockPreview({
		blocks,
		props: {
			className: "gc-chess-moves-row",
		},
	});

	return (
		<BlockContextProvider value={rowContext}>
			<div {...blockPreviewProps} />
		</BlockContextProvider>
	);
};

const MemoizedTemplateRowPreview = memo(TemplateRowPreview);

const Edit = ({ context }) => {
	const { clientId } = useBlockEditContext();
	const blockProps = useBlockProps();
	const templateBlock = useSelect(
		(select) => select(blockEditorStore).getBlock(clientId),
		[clientId],
	);
	const blocks = useMemo(() => templateBlock?.innerBlocks || [], [templateBlock]);
	const moves = context["gutenberg-chess/moves"] || [];
	const rows = buildMoveRows(moves);
	const rowsToRender = rows.length ? rows : [EMPTY_ROW];

	return (
		<div {...blockProps}>
			{rowsToRender.map((row, index) => {
				const isLastRow = index === rowsToRender.length - 1;
				const rowContext = getRowContext(row, isLastRow);

				if (index === 0) {
					return (
						<BlockContextProvider key={`row-${row.moveNumber}`} value={rowContext}>
							<TemplateInnerBlocks />
						</BlockContextProvider>
					);
				}

				return (
					<MemoizedTemplateRowPreview
						key={`row-preview-${row.moveNumber}`}
						blocks={blocks}
						rowContext={rowContext}
					/>
				);
			})}
		</div>
	);
};

export default Edit;
