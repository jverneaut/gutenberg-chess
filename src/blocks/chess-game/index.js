import { InnerBlocks } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";

import metadata from "./block.json";
import Edit from "./edit";
import "./editor.scss";

registerBlockType(metadata, {
	edit: Edit,
	save: () => <InnerBlocks.Content />,
});
