import { useBlockProps } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import {
	getEffectivePlayerSide,
	isBlackEditorPerspective,
} from "../../components/editor-perspective";

const Edit = ({ attributes, context }) => {
	const blockProps = useBlockProps();
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

	const playerId = playerSide === "white" ? whitePlayerId : blackPlayerId;

	const player = useSelect(
		(select) => {
			if (!playerId) {
				return null;
			}

			const users = select("core").getUsers({
				include: [playerId],
				per_page: 1,
				_fields: "id,name",
			});

			return Array.isArray(users) ? users[0] || null : null;
		},
		[playerId],
	);
	const playerName = player?.name || attributes.playerName;

	return (
		<div {...blockProps}>
			{playerName || __("No player selected", "gutenberg-chess")}
		</div>
	);
};

export default Edit;
