<?php

$playerSide = ($block->context['gutenberg-chess/playerSide'] ?? $attributes['playerSide'] ?? 'white') === 'black'
    ? 'black'
    : 'white';
$whitePlayerId = absint($block->context['gutenberg-chess/whitePlayerId'] ?? 0);
$blackPlayerId = absint($block->context['gutenberg-chess/blackPlayerId'] ?? 0);
$playerId = $playerSide === 'white' ? $whitePlayerId : $blackPlayerId;
$fallbackName = $attributes['playerName'] ?? '';
$playerName = $fallbackName;

if ($playerId) {
    $user = get_userdata($playerId);

    if ($user && isset($user->display_name)) {
        $playerName = (string) $user->display_name;
    }
}

$wrapperAttributes = get_block_wrapper_attributes();
?>

<div <?= $wrapperAttributes; ?>>
	<?= esc_html($playerName); ?>
</div>
