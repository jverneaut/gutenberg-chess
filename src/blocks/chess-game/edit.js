import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

import ChessGameProvider from "../../contexts/ChessGameContext";

const TEMPLATE = [["gutenberg-chess/chess-board"]];

const Edit = ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: TEMPLATE,
		templateLock: "all",
	});

	return (
		<ChessGameProvider
			moves={attributes.moves}
			onMovesChange={(moves) => setAttributes({ moves })}
			allowDragging
		>
			<div {...innerBlocksProps} />
		</ChessGameProvider>
	);
};

export default Edit;
