import { useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";

import metadata from "./block.json";
import Edit from "./edit";

const Save = ({ attributes }) => {
	const blockProps = useBlockProps.save();
	const playerName = attributes.playerName || "";

	return <div {...blockProps}>{playerName}</div>;
};

registerBlockType(metadata, {
	edit: Edit,
	save: Save,
});
