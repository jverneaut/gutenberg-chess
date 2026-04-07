import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

const Edit = () => {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps);

	return <div {...innerBlocksProps} />;
};

export default Edit;
