export const isBlackEditorPerspective = ({
	currentUserId = 0,
	whitePlayerId = 0,
	blackPlayerId = 0,
}) => {
	const currentId = Number(currentUserId) || 0;
	const whiteId = Number(whitePlayerId) || 0;
	const blackId = Number(blackPlayerId) || 0;

	if (!currentId || !blackId) {
		return false;
	}

	if (whiteId === blackId) {
		return false;
	}

	return currentId === blackId;
};

export const getEffectivePlayerSide = (playerSide, isBlackPerspective) => {
	if (!isBlackPerspective) {
		return playerSide === "black" ? "black" : "white";
	}

	return playerSide === "black" ? "white" : "black";
};

export const getSideToPlay = (moves = []) =>
	moves.length % 2 === 0 ? "white" : "black";

export const canCurrentUserPlayTurn = ({
	currentUserId = 0,
	whitePlayerId = 0,
	blackPlayerId = 0,
	moves = [],
}) => {
	const currentId = Number(currentUserId) || 0;
	const whiteId = Number(whitePlayerId) || 0;
	const blackId = Number(blackPlayerId) || 0;
	const sideToPlay = getSideToPlay(moves);

	if (!currentId) {
		return false;
	}

	if (sideToPlay === "white") {
		return currentId === whiteId;
	}

	return currentId === blackId;
};
