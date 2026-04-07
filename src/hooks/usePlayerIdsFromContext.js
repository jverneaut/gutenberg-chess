import { useMemo } from "react";

const toPlayerId = (value) => Number(value) || 0;

export const usePlayerIdsFromContext = (context = {}) =>
	useMemo(
		() => ({
			whitePlayerId: toPlayerId(context["gutenberg-chess/whitePlayerId"]),
			blackPlayerId: toPlayerId(context["gutenberg-chess/blackPlayerId"]),
		}),
		[
			context["gutenberg-chess/whitePlayerId"],
			context["gutenberg-chess/blackPlayerId"],
		],
	);
