import { useBlockProps } from "@wordpress/block-editor";

export default () => {
	return <div {...useBlockProps()}>Chess Game</div>;
};
