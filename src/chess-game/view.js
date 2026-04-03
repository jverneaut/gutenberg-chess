import { createRoot } from "@wordpress/element";
import ChessGame from "./ChessGame";

const mountChessBoards = () => {
	const chessGamesContainers = document.querySelectorAll(".js-gc-chess-board");

	chessGamesContainers.forEach((chessGameContainer) => {
		if (chessGameContainer.dataset.gcChessMounted === "true") {
			return;
		}

		let moves = [];

		try {
			moves = JSON.parse(chessGameContainer.dataset.moves || "[]");
		} catch {}

		createRoot(chessGameContainer).render(<ChessGame moves={moves} />);
		chessGameContainer.dataset.gcChessMounted = "true";
	});
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", mountChessBoards, {
		once: true,
	});
} else {
	mountChessBoards();
}
