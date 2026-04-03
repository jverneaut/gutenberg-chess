import { Chessboard } from "./react-chessboard-compat";
import { useChessGameContext } from "../contexts/ChessGameContext";

const ChessBoard = () => {
	const { allowDragging, boardId, onPieceDrop, position } = useChessGameContext();

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

export default ChessBoard;
