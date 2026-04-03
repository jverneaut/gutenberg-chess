if (
	typeof window !== "undefined" &&
	window.React &&
	typeof window.React.use !== "function" &&
	typeof window.React.useContext === "function"
) {
	// react-chessboard 5.x expects React 19's use(Context), but Gutenberg still exposes React 18.
	window.React.use = window.React.useContext;
}

export { Chessboard } from "react-chessboard";
