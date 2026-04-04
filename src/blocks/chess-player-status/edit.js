import { useBlockProps } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { useEffect } from "react";

import { getEffectivePlayerSide, isBlackEditorPerspective } from "../../components/editor-perspective";
import { getPlayerStatusText } from "../../components/player-status";

const Edit = ({ attributes, context, setAttributes }) => {
	const basePlayerSide =
		(context["gutenberg-chess/playerSide"] ?? attributes.playerSide) === "black"
			? "black"
			: "white";
	const currentUserId = useSelect(
		(select) => select("core").getCurrentUser?.()?.id || 0,
		[],
	);
	const whitePlayerId = context["gutenberg-chess/whitePlayerId"] || 0;
	const blackPlayerId = context["gutenberg-chess/blackPlayerId"] || 0;
	const playerSide = getEffectivePlayerSide(
		basePlayerSide,
		isBlackEditorPerspective({
			currentUserId,
			whitePlayerId,
			blackPlayerId,
		}),
	);
	const moves = context["gutenberg-chess/moves"] || [];
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
