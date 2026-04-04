import { useMemo } from "react";

import { Chessboard } from "./react-chessboard-compat";
import { useChessGameContext } from "../contexts/ChessGameContext";

const ChessBoard = () => {
	const {
		allowDragging,
		boardId,
		boardOrientation,
		lastMoveSquares,
		onPieceDrop,
		position,
	} = useChessGameContext();
	const squareStyles = useMemo(() => {
		if (!lastMoveSquares) {
			return {};
		}

		const highlightStyle = {
			backgroundColor: "rgba(255, 206, 84, 0.45)",
		};

		return {
			[lastMoveSquares.from]: highlightStyle,
			[lastMoveSquares.to]: highlightStyle,
		};
	}, [lastMoveSquares]);

	return (
		<Chessboard
			options={{
				id: boardId,
				position,
				boardOrientation,
				squareStyles,
				allowDragging,
				allowDrawingArrows: allowDragging,
				showAnimations: false,
				onPieceDrop,
			}}
		/>
	);
};

export default ChessBoard;
