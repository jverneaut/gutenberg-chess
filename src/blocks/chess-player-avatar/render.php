<?php

$playerSide = ($block->context['gutenberg-chess/playerSide'] ?? $attributes['playerSide'] ?? 'white') === 'black'
    ? 'black'
    : 'white';
$whitePlayerId = absint($block->context['gutenberg-chess/whitePlayerId'] ?? 0);
$blackPlayerId = absint($block->context['gutenberg-chess/blackPlayerId'] ?? 0);
$playerId = $playerSide === 'white' ? $whitePlayerId : $blackPlayerId;
$size = absint($attributes['size'] ?? 32);
$size = max(16, min(256, $size));
$wrapperAttributes = get_block_wrapper_attributes([
    'class' => 'wp-block-avatar',
]);

if (!$playerId) :
    ?>
	<div <?= $wrapperAttributes; ?>></div>
	<?php
    return;
endif;

$avatar = get_avatar(
    $playerId,
    $size,
    '',
    '',
    [
        'class' => sprintf('avatar avatar-%d photo', $size),
        'extra_attr' => 'style="border-radius:9999px;object-fit:cover;display:block;"',
    ],
);
?>

<div <?= $wrapperAttributes; ?>>
	<?= wp_kses_post($avatar); ?>
</div>
