import { createRoot } from "@wordpress/element";

import ChessBoard from "../../components/ChessBoard";
import ChessGameProvider from "../../contexts/ChessGameContext";

const mountChessBoards = () => {
	const chessBoardContainers = document.querySelectorAll(".js-gc-chess-board");

	chessBoardContainers.forEach((chessBoardContainer) => {
		if (chessBoardContainer.dataset.gcChessMounted === "true") {
			return;
		}

		let moves = [];

		try {
			moves = JSON.parse(chessBoardContainer.dataset.moves || "[]");
		} catch {}

		createRoot(chessBoardContainer).render(
			<ChessGameProvider moves={moves} allowDragging={false}>
				<ChessBoard />
			</ChessGameProvider>,
		);
		chessBoardContainer.dataset.gcChessMounted = "true";
	});
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", mountChessBoards, {
		once: true,
	});
} else {
	mountChessBoards();
}
