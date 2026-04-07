<?php

use GutenbergChess\ChessGameState;

$moves = ChessGameState::movesFromSource($attributes, $block);
$playerSide = ChessGameState::playerSideFromSource($attributes, $block);
$gameResult = ChessGameState::gameResultFromSource($attributes, $block);
$statusText = ChessGameState::statusTextFromSource($attributes, $block);
$isHidden = $statusText === '';
$wrapperAttributes = get_block_wrapper_attributes([
    'class' => 'js-gc-chess-player-status',
    'style' => $isHidden ? 'display:none;' : '',
]);
?>

<div
	<?= $wrapperAttributes; ?>
	data-player-side="<?= esc_attr($playerSide); ?>"
	data-game-result="<?= esc_attr($gameResult); ?>"
	data-moves="<?= esc_attr(wp_json_encode($moves)); ?>"
	<?= $isHidden ? 'hidden' : ''; ?>
>
	<?= esc_html($statusText); ?>
</div>
