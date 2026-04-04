import { Chessboard } from "./react-chessboard-compat";
import { useChessGameContext } from "../contexts/ChessGameContext";

const ChessBoard = () => {
	const {
		allowDragging,
		boardId,
		boardOrientation,
		onPieceDrop,
		position,
	} = useChessGameContext();

	return (
		<Chessboard
			options={{
				id: boardId,
				position,
				boardOrientation,
				allowDragging,
				allowDrawingArrows: allowDragging,
				showAnimations: false,
				onPieceDrop,
			}}
		/>
	);
};

export default ChessBoard;
