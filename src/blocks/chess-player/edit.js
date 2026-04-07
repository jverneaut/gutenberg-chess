import {
	BlockControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const Edit = ({ attributes, setAttributes }) => {
	const playerSide = attributes.playerSide || "white";

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps);

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						isPressed={playerSide === "black"}
						label={__("Use black player", "gutenberg-chess")}
						onClick={() => setAttributes({ playerSide: "black" })}
					>
						{__("Black", "gutenberg-chess")}
					</ToolbarButton>
					<ToolbarButton
						isPressed={playerSide === "white"}
						label={__("Use white player", "gutenberg-chess")}
						onClick={() => setAttributes({ playerSide: "white" })}
					>
						{__("White", "gutenberg-chess")}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<div {...innerBlocksProps} />
		</>
	);
};

export default Edit;
