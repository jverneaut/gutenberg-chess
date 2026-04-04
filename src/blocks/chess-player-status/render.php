<?php

$moves = $block->context['gutenberg-chess/moves'] ?? [];
$playerSide = ($block->context['gutenberg-chess/playerSide'] ?? $attributes['playerSide'] ?? 'white') === 'black'
	? 'black'
	: 'white';
$statusText = $attributes['statusText'] ?? '';
$isHidden = $statusText === '';
$wrapperAttributes = get_block_wrapper_attributes([
	'class' => 'js-gc-chess-player-status',
	'style' => $isHidden ? 'display:none;' : '',
]);
?>

<div
	<?= $wrapperAttributes; ?>
	data-player-side="<?= esc_attr($playerSide); ?>"
	data-moves="<?= esc_attr( wp_json_encode( $moves ) ); ?>"
	<?= $isHidden ? 'hidden' : ''; ?>
>
	<?= esc_html($statusText); ?>
</div>
