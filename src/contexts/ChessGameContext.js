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

const getLastMoveSquares = (moves = []) => {
	const lastMove = Array.isArray(moves) ? moves[moves.length - 1] : null;

	if (
		!lastMove ||
		typeof lastMove.from !== "string" ||
		typeof lastMove.to !== "string"
	) {
		return null;
	}

	const from = lastMove.from.toLowerCase();
	const to = lastMove.to.toLowerCase();
	const isSquare = (value) => /^[a-z]+\d+$/.test(value);

	if (!isSquare(from) || !isSquare(to)) {
		return null;
	}

	return { from, to };
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
	boardOrientation = "white",
	children,
}) => {
	const boardIdRef = useRef(generateBoardId());
	const boardId = boardIdRef.current;

	const chessGame = useMemo(() => buildGame(moves), [moves]);
	const position = chessGame.fen();
	const lastMoveSquares = useMemo(() => getLastMoveSquares(moves), [moves]);

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
				boardOrientation: boardOrientation === "black" ? "black" : "white",
				lastMoveSquares,
				onPieceDrop,
				position,
			}}
		>
			{children}
		</ChessGameContext.Provider>
	);
};

export default ChessGameProvider;
