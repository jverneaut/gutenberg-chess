import { useBlockProps } from "@wordpress/block-editor";
import { useEffect } from "react";

import { useMovesFromContext } from "../../hooks/useMovesFromContext";
import { useResolvedPlayer } from "../../hooks/useResolvedPlayer";
import { getPlayerStatusText } from "../../utils/player-status";

const Edit = ({ attributes, context, setAttributes }) => {
	const { playerSide } = useResolvedPlayer({
		context,
		attributePlayerSide: attributes.playerSide,
	});
	const moves = useMovesFromContext(context);
	const statusText = getPlayerStatusText(moves, playerSide);
	const blockProps = useBlockProps();

	useEffect(() => {
		if (attributes.statusText === statusText) {
			return;
		}

		setAttributes({ statusText });
	}, [attributes.statusText, setAttributes, statusText]);

	if (!statusText) {
		return null;
	}

	return <div {...blockProps}>{statusText}</div>;
};

export default Edit;
