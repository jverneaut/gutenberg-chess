import { useBlockProps } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const side = attributes.side === "black" ? "black" : "white";
	const blockProps = useBlockProps.save({
		className: `wp-block-gutenberg-chess-chess-move wp-block-gutenberg-chess-chess-move--${side}`,
		"data-gc-chess-move-side": side,
	});

	return <span {...blockProps} />;
};

export default Save;
