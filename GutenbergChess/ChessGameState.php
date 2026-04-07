<?php

declare(strict_types=1);

namespace GutenbergChess;

use WP_Block;
use WP_User;

final class ChessGameState
{
    private const DEFAULT_PLAYER_SIDE = 'white';
    private const DEFAULT_GAME_RESULT = '';
    private const MIN_AVATAR_SIZE = 16;
    private const MAX_AVATAR_SIZE = 256;
    private const GAME_RESULTS = ['white_won', 'black_won', 'draw'];

    /**
     * @return array<int, array{from: string, to: string, promotion: string}>
     */
    public static function movesFromSource(array $attributes = [], ?WP_Block $block = null): array
    {
        $source = $block->context['gutenberg-chess/moves'] ?? ($attributes['moves'] ?? []);

        if (!is_array($source)) {
            return [];
        }

        $moves = [];

        foreach ($source as $move) {
            if (!is_array($move)) {
                continue;
            }

            $from = isset($move['from']) && is_string($move['from']) ? trim($move['from']) : '';
            $to = isset($move['to']) && is_string($move['to']) ? trim($move['to']) : '';
            $promotion = isset($move['promotion']) && is_string($move['promotion'])
                ? trim($move['promotion'])
                : '';

            if ($from === '' || $to === '') {
                continue;
            }

            $moves[] = [
                'from' => $from,
                'to' => $to,
                'promotion' => $promotion !== '' ? $promotion : 'q',
            ];
        }

        return $moves;
    }

    public static function playerSideFromSource(array $attributes = [], ?WP_Block $block = null): string
    {
        $value = $block->context['gutenberg-chess/playerSide'] ?? ($attributes['playerSide'] ?? self::DEFAULT_PLAYER_SIDE);

        return $value === 'black' ? 'black' : 'white';
    }

    /**
     * @return array{whitePlayerId: int, blackPlayerId: int}
     */
    public static function playerIdsFromSource(array $attributes = [], ?WP_Block $block = null): array
    {
        $whitePlayerId = self::normalizePositiveInt(
            $block->context['gutenberg-chess/whitePlayerId'] ?? ($attributes['whitePlayerId'] ?? 0),
        );
        $blackPlayerId = self::normalizePositiveInt(
            $block->context['gutenberg-chess/blackPlayerId'] ?? ($attributes['blackPlayerId'] ?? 0),
        );

        return [
            'whitePlayerId' => $whitePlayerId,
            'blackPlayerId' => $blackPlayerId,
        ];
    }

    public static function playerIdFromSource(array $attributes = [], ?WP_Block $block = null): int
    {
        $playerSide = self::playerSideFromSource($attributes, $block);
        $playerIds = self::playerIdsFromSource($attributes, $block);

        return $playerSide === 'white' ? $playerIds['whitePlayerId'] : $playerIds['blackPlayerId'];
    }

    public static function playerNameFromSource(array $attributes = [], ?WP_Block $block = null): string
    {
        $playerId = self::playerIdFromSource($attributes, $block);
        $resolvedName = self::userDisplayName($playerId);

        if ($resolvedName !== '') {
            return $resolvedName;
        }

        $fallback = isset($attributes['playerName']) && is_string($attributes['playerName'])
            ? trim($attributes['playerName'])
            : '';

        return $fallback;
    }

    public static function avatarSizeFromSource(array $attributes = [], int $default = 32): int
    {
        $size = self::normalizePositiveInt($attributes['size'] ?? $default);

        if ($size === 0) {
            $size = $default;
        }

        return max(self::MIN_AVATAR_SIZE, min(self::MAX_AVATAR_SIZE, $size));
    }

    public static function gameResultFromSource(array $attributes = [], ?WP_Block $block = null): string
    {
        $value = $block->context['gutenberg-chess/gameResult'] ?? ($attributes['gameResult'] ?? self::DEFAULT_GAME_RESULT);

        if (!is_string($value)) {
            return self::DEFAULT_GAME_RESULT;
        }

        $normalized = trim($value);

        return in_array($normalized, self::GAME_RESULTS, true)
            ? $normalized
            : self::DEFAULT_GAME_RESULT;
    }

    public static function statusTextFromSource(array $attributes = [], ?WP_Block $block = null): string
    {
        $playerSide = self::playerSideFromSource($attributes, $block);
        $gameResult = self::gameResultFromSource($attributes, $block);

        if ($gameResult === 'white_won') {
            return $playerSide === 'white' ? 'White won' : '';
        }

        if ($gameResult === 'black_won') {
            return $playerSide === 'black' ? 'Black won' : '';
        }

        if ($gameResult === 'draw') {
            return 'Draw';
        }

        $moves = self::movesFromSource($attributes, $block);
        $sideToPlay = count($moves) % 2 === 0 ? 'white' : 'black';

        return $sideToPlay === $playerSide ? ucfirst($sideToPlay) . ' to play' : '';
    }

    private static function userDisplayName(int $userId): string
    {
        if ($userId <= 0) {
            return '';
        }

        $user = get_userdata($userId);

        if (!$user instanceof WP_User) {
            return '';
        }

        $displayName = trim((string) $user->display_name);

        return $displayName !== '' ? $displayName : '';
    }

    /**
     * @param mixed $value
     */
    private static function normalizePositiveInt($value): int
    {
        if (!is_numeric($value)) {
            return 0;
        }

        $normalized = (int) $value;

        return $normalized > 0 ? $normalized : 0;
    }
}
