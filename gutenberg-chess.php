<?php

/**
 * Plugin Name:       Gutenberg Chess
 * Description:
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Julien Verneaut
 * License:           MIT
 * License URI:       https://mit-license.org
 * Text Domain:       gutenberg-chess
 *
 * @package GutenbergChess
 */

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

require_once(__DIR__ . '/vendor/autoload.php');

use GutenbergChess\BlocksRegistrar;

BlocksRegistrar::register(__DIR__ . '/build');
