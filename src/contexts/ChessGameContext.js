import { createContext, useContext, useMemo, useRef } from "react";

import { Chess } from "chess.js";

const generateBoardId = () => `gc-chess-${globalThis.crypto.randomUUID()}`;
const ChessGameContext = createContext(null);

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

export const useChessGameContext = () => {
	const context = useContext(ChessGameContext);

	if (!context) {
		throw new Error("ChessBoard must be rendered inside ChessGame");
	}

	return context;
};

const ChessGameProvider = ({
	moves = [],
	onMovesChange,
	allowDragging = false,
	children,
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
		<ChessGameContext.Provider
			value={{
				allowDragging,
				boardId,
				onPieceDrop,
				position,
			}}
		>
			{children}
		</ChessGameContext.Provider>
	);
};

export default ChessGameProvider;
