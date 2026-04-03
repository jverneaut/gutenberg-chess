import { InnerBlocks } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { addFilter } from "@wordpress/hooks";

import metadata from "./block.json";
import Edit from "./edit";

registerBlockType(metadata, {
	edit: Edit,
	save: () => <InnerBlocks.Content />,
});

addFilter(
	"sync.pollingManager.pollingIntervalWithCollaborators",
	"gutenberg-chess/polling",
	() => 200,
);
