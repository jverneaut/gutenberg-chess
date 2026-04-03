import { useRef, useState } from "react";

import { useBlockProps } from "@wordpress/block-editor";
import { Chessboard } from "./react-chessboard-compat";
import { Chess } from "chess.js";

export default () => {
	const chessGameRef = useRef(new Chess());
	const chessGame = chessGameRef.current;

	const [position, setPosition] = useState(chessGame.fen());

	const onPieceDrop = ({ sourceSquare, targetSquare }) => {
		if (!targetSquare) return false;

		try {
			chessGame.move({
				from: sourceSquare,
				to: targetSquare,
				promotion: "q",
			});

			setPosition(chessGame.fen());

			return true;
		} catch {
			return false;
		}
	};

	return (
		<div {...useBlockProps()}>
			<Chessboard
				options={{
					position,
					onPieceDrop,
				}}
			/>
		</div>
	);
};
