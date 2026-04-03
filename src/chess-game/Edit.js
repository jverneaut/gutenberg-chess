import { useBlockProps } from "@wordpress/block-editor";
import { Chessboard } from "./react-chessboard-compat";

export default () => {
	return (
		<div {...useBlockProps()}>
			<Chessboard />
		</div>
	);
};
