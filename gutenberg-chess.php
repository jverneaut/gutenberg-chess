<?php

/**
 * Plugin Name:       Gutenberg Chess
 * Description:       Real-time collaborative chess blocks for WordPress.
 * Version:           0.1.0
 * Requires at least: 7.0
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
require_once(__DIR__ . '/gutenberg-chess-class.php');
