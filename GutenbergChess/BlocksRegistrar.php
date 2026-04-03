<?php

namespace GutenbergChess;

class BlocksRegistrar
{
    public static function register(string $root): void
    {
        add_action('init', static function () use ($root): void {
            wp_register_block_types_from_metadata_collection($root, $root . '/blocks-manifest.php');
        });
    }
}
