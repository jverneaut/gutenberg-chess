import { createRoot } from "@wordpress/element";
import { Chessboard } from "./react-chessboard-compat";

const mountChessBoards = () => {
	const chessGamesContainers = document.querySelectorAll(".js-gc-chess-board");

	chessGamesContainers.forEach((chessGameContainer) => {
		createRoot(chessGameContainer).render(<Chessboard />);
	});
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", mountChessBoards, {
		once: true,
	});
} else {
	mountChessBoards();
}
