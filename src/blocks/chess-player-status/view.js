import { getPlayerStatusText } from "../../components/player-status";

const mountChessPlayerStatuses = () => {
	const statusNodes = document.querySelectorAll(".js-gc-chess-player-status");

	statusNodes.forEach((statusNode) => {
		const playerSide =
			statusNode.dataset.playerSide === "black" ? "black" : "white";
		let moves = [];

		try {
			moves = JSON.parse(statusNode.dataset.moves || "[]");
		} catch {}

		const statusText = getPlayerStatusText(moves, playerSide);

		statusNode.textContent = statusText;
		statusNode.hidden = !statusText;
		statusNode.style.display = statusText ? "" : "none";
	});
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", mountChessPlayerStatuses, {
		once: true,
	});
} else {
	mountChessPlayerStatuses();
}
