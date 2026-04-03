import { useMemo, useRef } from "react";

import { Chess } from "chess.js";
import { Chessboard } from "./react-chessboard-compat";

const generateBoardId = () => `gc-chess-${globalThis.crypto.randomUUID()}`;

const buildGame = (moves = []) => {
	const chess = new Chess();

	for (const move of moves) {
		if (!move?.from || !move?.to) {
			continue;
		}

		try {
			chess.move({
				from: move.from,
				to: move.to,
				promotion: move.promotion || "q",
			});
		} catch {
			break;
		}
	}

	return chess;
};

const ChessGame = ({
	moves = [],
	onMovesChange,
	allowDragging = false,
}) => {
	const boardIdRef = useRef(generateBoardId());
	const boardId = boardIdRef.current;

	const chessGame = useMemo(() => buildGame(moves), [moves]);
	const position = chessGame.fen();

	const onPieceDrop = ({ sourceSquare, targetSquare }) => {
		if (!allowDragging || !onMovesChange || !targetSquare) {
			return false;
		}

		const nextGame = buildGame(moves);

		try {
			const move = nextGame.move({
				from: sourceSquare,
				to: targetSquare,
				promotion: "q",
			});

			onMovesChange([
				...moves,
				{
					from: move.from,
					to: move.to,
					promotion: move.promotion || "q",
				},
			]);

			return true;
		} catch {
			return false;
		}
	};

	return (
		<Chessboard
			options={{
				id: boardId,
				position,
				allowDragging,
				showAnimations: false,
				onPieceDrop,
			}}
		/>
	);
};

export default ChessGame;
