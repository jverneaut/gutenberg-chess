import { useBlockProps } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { useEffect } from "react";

const getPlayerId = (attributes, context) =>
	Number(
		context?.["gutenberg-chess/playerId"] || attributes.playerId || 0,
	);

const Edit = ({ attributes, context, setAttributes }) => {
	const blockProps = useBlockProps();
	const playerId = getPlayerId(attributes, context);
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

	useEffect(() => {
		const nextAttributes = {};

		if (attributes.playerId !== playerId) {
			nextAttributes.playerId = playerId;
		}

		if (player?.name && attributes.playerName !== player.name) {
			nextAttributes.playerName = player.name;
		}

		if (!Object.keys(nextAttributes).length) {
			return;
		}

		setAttributes(nextAttributes);
	}, [
		attributes.playerId,
		attributes.playerName,
		playerId,
		player?.name,
		setAttributes,
	]);

	return (
		<div {...blockProps}>
			{playerName || __("No player selected", "gutenberg-chess")}
		</div>
	);
};

export default Edit;
