import { registerBlockType } from "@wordpress/blocks";

import metadata from "./block.json";
import Edit from "./edit.js";

registerBlockType(metadata.name, {
	edit: Edit,
	save: () => null,
});

// Decrease polling interval for faster move updates
wp.hooks.addFilter(
	"sync.pollingManager.pollingIntervalWithCollaborators",
	"gutenberg-chess/polling",
	() => 200,
);
