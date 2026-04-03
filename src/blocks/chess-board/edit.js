import { useBlockEditContext, useBlockProps } from "@wordpress/block-editor";
import { useDispatch, useSelect } from "@wordpress/data";

import ChessGameProvider from "../../contexts/ChessGameContext";
import ChessBoard from "../../components/ChessBoard";

const Edit = ({ context }) => {
	const { clientId } = useBlockEditContext();
	const { updateBlockAttributes } = useDispatch("core/block-editor");
	const parentClientId = useSelect(
		(select) =>
			select("core/block-editor").getBlockParentsByBlockName(clientId, [
				"gutenberg-chess/chess-game",
			])[0],
		[clientId],
	);
	const moves = context["gutenberg-chess/moves"] || [];

	return (
		<div {...useBlockProps()}>
			<ChessGameProvider
				moves={moves}
				onMovesChange={(nextMoves) => {
					if (parentClientId) {
						updateBlockAttributes(parentClientId, { moves: nextMoves });
					}
				}}
				allowDragging
			>
				<ChessBoard />
			</ChessGameProvider>
		</div>
	);
};

export default Edit;
