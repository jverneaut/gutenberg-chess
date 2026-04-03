<?php

use GutenbergChess\BlocksRegistrar;

BlocksRegistrar::registerBlockCategory([
    'slug' => 'games',
    'title' => 'Games',
    'textdomain' => 'gutenberg-chess',
    'icon' => 'games',
]);

BlocksRegistrar::registerBlockTypes(__DIR__ . '/build');
