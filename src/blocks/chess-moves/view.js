import { buildMoveRows } from "../../utils/move-rows";

const EMPTY_ROW = {
	moveNumber: 1,
	whiteMove: "",
	blackMove: "",
};

const applyRowValues = (rowNode, row, isLastRow) => {
	const indexBlocks = rowNode.querySelectorAll(
		".wp-block-gutenberg-chess-chess-move-index",
	);
	const whiteMoveBlocks = rowNode.querySelectorAll(
		'[data-gc-chess-move-side="white"]',
	);
	const blackMoveBlocks = rowNode.querySelectorAll(
		'[data-gc-chess-move-side="black"]',
	);

	indexBlocks.forEach((indexBlock) => {
		indexBlock.textContent = `${row.moveNumber}.`;
	});

	whiteMoveBlocks.forEach((whiteMoveBlock) => {
		whiteMoveBlock.textContent = row.whiteMove;
		whiteMoveBlock.classList.remove("is-last-move");
	});

	blackMoveBlocks.forEach((blackMoveBlock) => {
		blackMoveBlock.textContent = row.blackMove;
		blackMoveBlock.classList.remove("is-last-move");
	});

	if (!isLastRow) {
		return;
	}

	if (row.blackMove) {
		blackMoveBlocks.forEach((blackMoveBlock) => {
			blackMoveBlock.classList.add("is-last-move");
		});
		return;
	}

	if (!row.whiteMove) {
		return;
	}

	whiteMoveBlocks.forEach((whiteMoveBlock) => {
		whiteMoveBlock.classList.add("is-last-move");
	});
};

const hydrateMoveList = (chessMovesRoot) => {
	const templateBlock = chessMovesRoot.querySelector(
		".wp-block-gutenberg-chess-chess-moves-template",
	);

	if (!templateBlock) {
		return;
	}

	const templateRow = templateBlock.firstElementChild;
	if (!templateRow) {
		return;
	}

	let moves = [];

	try {
		moves = JSON.parse(chessMovesRoot.dataset.moves || "[]");
	} catch {}

	const rows = buildMoveRows(moves);
	const rowsToRender = rows.length ? rows : [EMPTY_ROW];
	const rowsFragment = document.createDocumentFragment();

	rowsToRender.forEach((row, index) => {
		const rowNode = templateRow.cloneNode(true);
		const isLastRow = index === rowsToRender.length - 1;

		applyRowValues(rowNode, row, isLastRow);
		rowsFragment.append(rowNode);
	});

	templateBlock.innerHTML = "";
	templateBlock.append(rowsFragment);
};

const mountChessMoveLists = () => {
	const chessMovesRoots = document.querySelectorAll(".js-gc-chess-moves");

	chessMovesRoots.forEach((chessMovesRoot) => {
		hydrateMoveList(chessMovesRoot);
	});
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", mountChessMoveLists, {
		once: true,
	});
} else {
	mountChessMoveLists();
}
