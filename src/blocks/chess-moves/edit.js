import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

const TEMPLATE = [["gutenberg-chess/chess-moves-template"]];

const Edit = () => {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: TEMPLATE,
	});

	return <div {...innerBlocksProps} />;
};

export default Edit;
