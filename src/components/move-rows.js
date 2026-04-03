import { Chess } from "chess.js";

const toSanMoves = (moves = []) => {
	const chess = new Chess();
	const sanMoves = [];

	for (const move of moves) {
		if (!move?.from || !move?.to) {
			continue;
		}

		try {
			const playedMove = chess.move({
				from: move.from,
				to: move.to,
				promotion: move.promotion || "q",
			});

			sanMoves.push(playedMove?.san || `${move.from}${move.to}`);
		} catch {
			break;
		}
	}

	return sanMoves;
};

export const buildMoveRows = (moves = []) => {
	const sanMoves = toSanMoves(moves);
	const rows = [];

	for (let moveIndex = 0; moveIndex < sanMoves.length; moveIndex += 2) {
		rows.push({
			moveNumber: moveIndex / 2 + 1,
			whiteMove: sanMoves[moveIndex] || "",
			blackMove: sanMoves[moveIndex + 1] || "",
		});
	}

	return rows;
};
