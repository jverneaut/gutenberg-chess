import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

import { usePlayerById } from "../../hooks/usePlayerById";
import { useResolvedPlayer } from "../../hooks/useResolvedPlayer";

const Edit = ({ attributes, context }) => {
	const blockProps = useBlockProps();
	const { playerId } = useResolvedPlayer({
		context,
		attributePlayerSide: attributes.playerSide,
	});
	const player = usePlayerById(playerId, "id,name");
	const playerName = player?.name || attributes.playerName;

	return (
		<div {...blockProps}>
			{playerName || __("No player selected", "gutenberg-chess")}
		</div>
	);
};

export default Edit;
