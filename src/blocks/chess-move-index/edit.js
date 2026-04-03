import { useBlockProps } from "@wordpress/block-editor";

const Edit = ({ context }) => {
	const moveNumber = context["gutenberg-chess/moveNumber"] || 1;
	const blockProps = useBlockProps({
		className: "wp-block-gutenberg-chess-chess-move-index",
	});

	return <span {...blockProps}>{`${moveNumber}.`}</span>;
};

export default Edit;
