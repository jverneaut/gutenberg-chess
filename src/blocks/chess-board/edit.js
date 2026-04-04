import {
	BlockControls,
	useBlockEditContext,
	useBlockProps,
} from "@wordpress/block-editor";
import { ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import ChessGameProvider from "../../contexts/ChessGameContext";
import ChessBoard from "../../components/ChessBoard";
import {
	canCurrentUserPlayTurn,
	isBlackEditorPerspective,
} from "../../components/editor-perspective";

const Edit = ({ context }) => {
	const { clientId } = useBlockEditContext();
	const { updateBlockAttributes } = useDispatch("core/block-editor");
	const currentUserId = useSelect(
		(select) => select("core").getCurrentUser?.()?.id || 0,
		[],
	);
	const parentClientId = useSelect(
		(select) =>
			select("core/block-editor").getBlockParentsByBlockName(clientId, [
				"gutenberg-chess/chess-game",
			])[0],
		[clientId],
	);
	const whitePlayerId = context["gutenberg-chess/whitePlayerId"] || 0;
	const blackPlayerId = context["gutenberg-chess/blackPlayerId"] || 0;
	const moves = context["gutenberg-chess/moves"] || [];
	const boardOrientation = isBlackEditorPerspective({
		currentUserId,
		whitePlayerId,
		blackPlayerId,
	})
		? "black"
		: "white";
	const allowDragging = canCurrentUserPlayTurn({
		currentUserId,
		whitePlayerId,
		blackPlayerId,
		moves,
	});
	const restartGame = () => {
		if (!parentClientId) {
			return;
		}

		updateBlockAttributes(parentClientId, { moves: [] });
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={__("Restart game", "gutenberg-chess")}
						onClick={restartGame}
						disabled={moves.length === 0}
					>
						{__("Restart", "gutenberg-chess")}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps()}>
				<ChessGameProvider
					moves={moves}
					onMovesChange={(nextMoves) => {
						if (parentClientId) {
							updateBlockAttributes(parentClientId, { moves: nextMoves });
						}
					}}
					boardOrientation={boardOrientation}
					allowDragging={allowDragging}
				>
					<ChessBoard />
				</ChessGameProvider>
			</div>
		</>
	);
};

export default Edit;
