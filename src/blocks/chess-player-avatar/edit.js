import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, RangeControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import { usePlayerById } from "../../hooks/usePlayerById";
import { useResolvedPlayer } from "../../hooks/useResolvedPlayer";

const MIN_SIZE = 16;
const MAX_SIZE = 256;

const normalizeSize = (size) => {
	const numericSize = Number(size) || 32;

	return Math.min(MAX_SIZE, Math.max(MIN_SIZE, numericSize));
};

const getAvatarUrl = (avatarUrls = {}, size = 32) => {
	const availableSizes = Object.keys(avatarUrls)
		.map((key) => Number(key))
		.filter((value) => Number.isFinite(value))
		.sort((a, b) => a - b);

	if (!availableSizes.length) {
		return "";
	}

	const matchingSize =
		availableSizes.find((availableSize) => availableSize >= size) ||
		availableSizes[availableSizes.length - 1];

	return avatarUrls[String(matchingSize)] || avatarUrls[matchingSize] || "";
};

const Edit = ({ attributes, context, setAttributes }) => {
	const size = normalizeSize(attributes.size);
	const blockProps = useBlockProps({
		className: "wp-block-avatar",
	});
	const { playerId } = useResolvedPlayer({
		context,
		attributePlayerSide: attributes.playerSide,
	});
	const player = usePlayerById(playerId, "id,name,avatar_urls");
	const avatarUrl = getAvatarUrl(player?.avatar_urls, size);
	const fallbackLabel = player?.name
		? player.name.slice(0, 1).toUpperCase()
		: "?";
	const imageStyle = {
		width: `${size}px`,
		height: `${size}px`,
		borderRadius: "9999px",
		objectFit: "cover",
		display: "block",
	};
	const fallbackStyle = {
		...imageStyle,
		background: "#dcdcde",
		color: "#1d2327",
		fontSize: `${Math.max(10, Math.round(size * 0.4))}px`,
		fontWeight: 700,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Avatar settings", "gutenberg-chess")} initialOpen>
					<RangeControl
						label={__("Size", "gutenberg-chess")}
						value={size}
						onChange={(newSize) => {
							setAttributes({
								size: normalizeSize(newSize),
							});
						}}
						min={MIN_SIZE}
						max={MAX_SIZE}
						allowReset
						resetFallbackValue={32}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{avatarUrl ? (
					<img
						alt={player?.name || __("Player avatar", "gutenberg-chess")}
						src={avatarUrl}
						style={imageStyle}
					/>
				) : (
					<div
						aria-label={__("No player selected", "gutenberg-chess")}
						style={fallbackStyle}
					>
						{fallbackLabel}
					</div>
				)}
			</div>
		</>
	);
};

export default Edit;
