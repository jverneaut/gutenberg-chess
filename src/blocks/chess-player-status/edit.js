import { useBlockProps } from "@wordpress/block-editor";

import { useMovesFromContext } from "../../hooks/useMovesFromContext";
import { useResolvedPlayer } from "../../hooks/useResolvedPlayer";
import { getPlayerStatusText } from "../../utils/player-status";

const Edit = ({ attributes, context }) => {
	const { playerSide } = useResolvedPlayer({
		context,
		attributePlayerSide: attributes.playerSide,
	});
	const moves = useMovesFromContext(context);
	const gameResult = context["gutenberg-chess/gameResult"] || "";
	const statusText = getPlayerStatusText(moves, playerSide, gameResult);
	const blockProps = useBlockProps();

	if (!statusText) {
		return null;
	}

	return <div {...blockProps}>{statusText}</div>;
};

export default Edit;
