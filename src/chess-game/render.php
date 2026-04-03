<div
	<?= get_block_wrapper_attributes(['class' => 'js-gc-chess-board']); ?>
	data-moves="<?= esc_attr( wp_json_encode( $attributes['moves'] ?? [] ) ); ?>"
></div>
