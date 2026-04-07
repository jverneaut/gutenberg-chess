import { useMemo } from "react";

export const useMovesFromContext = (context = {}) =>
	useMemo(() => {
		const moves = context["gutenberg-chess/moves"];

		return Array.isArray(moves) ? moves : [];
	}, [context["gutenberg-chess/moves"]]);
