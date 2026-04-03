import { useBlockProps } from "@wordpress/block-editor";
import ChessGame from "./ChessGame";

export default ({ attributes, setAttributes }) => {
	return (
		<div {...useBlockProps()}>
			<ChessGame
				moves={attributes.moves}
				onMovesChange={(moves) => setAttributes({ moves })}
				allowDragging
			/>
		</div>
	);
};
