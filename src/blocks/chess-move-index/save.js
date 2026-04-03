import { useBlockProps } from "@wordpress/block-editor";

const Save = () => {
	const blockProps = useBlockProps.save({
		className: "wp-block-gutenberg-chess-chess-move-index",
		"data-gc-chess-move-index": "true",
	});

	return <span {...blockProps}>1.</span>;
};

export default Save;
