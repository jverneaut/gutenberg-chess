<?php

namespace GutenbergChess;

class BlocksRegistrar
{
    public static function registerBlockCategory(array $category): void
    {
        add_filter(
            'block_categories_all',
            static function (array $categories, $blockEditorContext) use ($category): array {
                unset($blockEditorContext);

                return self::mergeBlockCategory($categories, self::translateBlockCategory($category));
            },
            10,
            2,
        );
    }

    public static function registerBlockTypes(string $path, string $manifest): void
    {
        add_action('init', static function () use ($path, $manifest): void {
            wp_register_block_types_from_metadata_collection(
                $path,
                $manifest,
            );
        });
    }

    private static function mergeBlockCategory(array $categories, array $category): array
    {
        foreach ($categories as $existingCategory) {
            if (($existingCategory['slug'] ?? null) === ($category['slug'] ?? null)) {
                return $categories;
            }
        }

        return array_merge([$category], $categories);
    }

    private static function translateBlockCategory(array $category): array
    {
        $title = $category['title'] ?? null;
        $textdomain = $category['textdomain'] ?? null;

        if (! is_string($title) || ! is_string($textdomain) || $textdomain === '') {
            return $category;
        }

        $category['title'] = __($title, $textdomain);

        return $category;
    }
}
