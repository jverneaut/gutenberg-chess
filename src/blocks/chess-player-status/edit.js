import { useBlockProps } from "@wordpress/block-editor";
import { useEffect } from "react";

import { getPlayerStatusText } from "../../components/player-status";

const Edit = ({ attributes, context, setAttributes }) => {
	const playerSide =
		(context["gutenberg-chess/playerSide"] ?? attributes.playerSide) === "black"
			? "black"
			: "white";
	const moves = context["gutenberg-chess/moves"] || [];
	const statusText = getPlayerStatusText(moves, playerSide);
	const blockProps = useBlockProps();

	useEffect(() => {
		const nextAttributes = {};

		if (attributes.playerSide !== playerSide) {
			nextAttributes.playerSide = playerSide;
		}

		if (attributes.statusText !== statusText) {
			nextAttributes.statusText = statusText;
		}

		if (!Object.keys(nextAttributes).length) {
			return;
		}

		setAttributes(nextAttributes);
	}, [attributes.playerSide, attributes.statusText, playerSide, setAttributes, statusText]);

	if (!statusText) {
		return null;
	}

	return <div {...blockProps}>{statusText}</div>;
};

export default Edit;
