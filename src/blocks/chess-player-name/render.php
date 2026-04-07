<?php

use GutenbergChess\ChessGameState;

$playerName = ChessGameState::playerNameFromSource($attributes, $block);

$wrapperAttributes = get_block_wrapper_attributes();
?>

<div <?= $wrapperAttributes; ?>>
	<?= esc_html($playerName); ?>
</div>
