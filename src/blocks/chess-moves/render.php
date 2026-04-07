<div
	<?= get_block_wrapper_attributes(['class' => 'js-gc-chess-moves']); ?>
	data-moves="<?= esc_attr(wp_json_encode($block->context['gutenberg-chess/moves'] ?? [])); ?>"
>
	<?= $content; ?>
</div>
