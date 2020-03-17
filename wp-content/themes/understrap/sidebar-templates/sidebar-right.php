<?php
/**
 * The right sidebar containing the main widget area.
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! is_active_sidebar( 'right-sidebar' ) ) {
	return;
}

// when both sidebars turned on reduce col size to 3 from 4.
$sidebar_pos = get_theme_mod( 'understrap_sidebar_position' );
?>

<?php if ( 'both' === $sidebar_pos ) : ?>
	<div class="col-md-3 widget-area" id="right-sidebar" role="complementary">
<?php else : ?>
	<div class="col-lg-4 widget-area">
	<!-- <div class="col-md-4 widget-area" id="right-sidebar" role="complementary"> -->
	<div class="sticky-top" id="right-sidebar" role="complementary">

	<!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni voluptates voluptatibus, accusantium hic tempora expedita quidem modi obcaecati voluptate earum veritatis quia enim voluptas nisi soluta, non mollitia molestiae maxime. -->
	

<?php endif; ?>
<?php dynamic_sidebar( 'right-sidebar' ); ?>

<hr class="my-5">
<p>Per informazioni su preventivi o progetti da sviluppare scrivimi una mail</p>
<button type="button" class="main-btn mt-4 btn btn-warning"><a href="contatti.html">CONTATTAMI</a></button>

</div><!-- #right-sidebar -->
</div>
