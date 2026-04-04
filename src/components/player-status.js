import { Chess } from "chess.js";

const applyMoves = (moves = []) => {
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

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

export const getPlayerStatusText = (moves = [], playerSide = "white") => {
	const chess = applyMoves(moves);
	const normalizedPlayerSide = playerSide === "black" ? "black" : "white";

	if (chess.isCheckmate()) {
		const winner = chess.turn() === "w" ? "black" : "white";

		return winner === normalizedPlayerSide ? `${capitalize(winner)} won` : "";
	}

	if (chess.isDraw()) {
		return "Draw";
	}

	const sideToPlay = chess.turn() === "w" ? "white" : "black";

	return sideToPlay === normalizedPlayerSide
		? `${capitalize(sideToPlay)} to play`
		: "";
};
