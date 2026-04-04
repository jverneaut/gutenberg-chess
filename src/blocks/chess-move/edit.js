import { BlockControls, useBlockProps } from "@wordpress/block-editor";
import { ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const isLastMove = (side, context) => {
	const isLastMoveRow = !!context["gutenberg-chess/isLastMoveRow"];
	const hasWhiteMove = !!context["gutenberg-chess/hasWhiteMove"];
	const hasBlackMove = !!context["gutenberg-chess/hasBlackMove"];

	if (!isLastMoveRow) {
		return false;
	}

	if (hasBlackMove) {
		return side === "black";
	}

	return hasWhiteMove && side === "white";
};

const Edit = ({ attributes, setAttributes, context }) => {
	const side = attributes.side === "black" ? "black" : "white";
	const moveText =
		side === "black"
			? context["gutenberg-chess/blackMove"] || ""
			: context["gutenberg-chess/whiteMove"] || "";
	const lastMove = isLastMove(side, context);
	const blockProps = useBlockProps({
		className:
			`wp-block-gutenberg-chess-chess-move wp-block-gutenberg-chess-chess-move--${side} ${lastMove ? "is-last-move" : ""}`.trim(),
	});

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						isPressed={side === "white"}
						label={__("Use white move", "gutenberg-chess")}
						onClick={() => setAttributes({ side: "white" })}
					>
						{__("White", "gutenberg-chess")}
					</ToolbarButton>
					<ToolbarButton
						isPressed={side === "black"}
						label={__("Use black move", "gutenberg-chess")}
						onClick={() => setAttributes({ side: "black" })}
					>
						{__("Black", "gutenberg-chess")}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<span {...blockProps}>{moveText || "\u00A0"}</span>
		</>
	);
};

export default Edit;
