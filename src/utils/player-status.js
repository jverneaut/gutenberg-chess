import { Chess } from "chess.js";

export const GAME_RESULT = {
	ONGOING: "",
	WHITE_WON: "white_won",
	BLACK_WON: "black_won",
	DRAW: "draw",
};

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

export const getGameResultFromMoves = (moves = []) => {
	const chess = applyMoves(moves);

	if (chess.isCheckmate()) {
		return chess.turn() === "w"
			? GAME_RESULT.BLACK_WON
			: GAME_RESULT.WHITE_WON;
	}

	if (chess.isDraw()) {
		return GAME_RESULT.DRAW;
	}

	return GAME_RESULT.ONGOING;
};

export const getPlayerStatusText = (
	moves = [],
	playerSide = "white",
	gameResult = GAME_RESULT.ONGOING,
) => {
	const normalizedPlayerSide = playerSide === "black" ? "black" : "white";
	const normalizedGameResult = Object.values(GAME_RESULT).includes(gameResult)
		? gameResult
		: GAME_RESULT.ONGOING;

	if (normalizedGameResult === GAME_RESULT.WHITE_WON) {
		return normalizedPlayerSide === "white" ? "White won" : "";
	}

	if (normalizedGameResult === GAME_RESULT.BLACK_WON) {
		return normalizedPlayerSide === "black" ? "Black won" : "";
	}

	if (normalizedGameResult === GAME_RESULT.DRAW) {
		return "Draw";
	}

	const chess = applyMoves(moves);
	const sideToPlay = chess.turn() === "w" ? "white" : "black";

	return sideToPlay === normalizedPlayerSide
		? `${capitalize(sideToPlay)} to play`
		: "";
};
