import {
	getEffectivePlayerSide,
	isBlackEditorPerspective,
} from "../utils/editor-perspective";
import { useCurrentUserId } from "./useCurrentUserId";
import { usePlayerIdsFromContext } from "./usePlayerIdsFromContext";

const normalizePlayerSide = (side) => (side === "black" ? "black" : "white");

export const useResolvedPlayer = ({ context, attributePlayerSide }) => {
	const currentUserId = useCurrentUserId();
	const { whitePlayerId, blackPlayerId } = usePlayerIdsFromContext(context);
	const basePlayerSide = normalizePlayerSide(
		context["gutenberg-chess/playerSide"] ?? attributePlayerSide,
	);
	const playerSide = getEffectivePlayerSide(
		basePlayerSide,
		isBlackEditorPerspective({
			currentUserId,
			whitePlayerId,
			blackPlayerId,
		}),
	);
	const playerId = playerSide === "white" ? whitePlayerId : blackPlayerId;

	return {
		playerSide,
		playerId,
		whitePlayerId,
		blackPlayerId,
		currentUserId,
	};
};
