<?php

use GutenbergChess\ChessGameState;

$playerId = ChessGameState::playerIdFromSource($attributes, $block);
$size = ChessGameState::avatarSizeFromSource($attributes, 32);
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
