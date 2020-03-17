<?php
/**
 * Template Name: Contatti
 *
 * Template for displaying a page just with the header and footer area and a "naked" content area in between.
 * Good for landingpages and other types of pages where you want to add a lot of custom markup.
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) :
	the_post();?>
    
    <!--HERO-->
    <div class="py-5 bg-hero">
        <div class="container">
        <div class="row">
        <div class="col-12 col-lg-6 my-5">
            <h1 class="blue-primary mb-5">
                <?php the_field('titolo1_contatti'); ?>
                <span class="ml-3">&#128238;</span>
            </h1>
            <p><?php the_field('descrizione1_contatti'); ?></p>
            <button style="width: 100px;" type="button" class="main-btn mt-5 btn btn-warning">
                <a class="footer-link" href="tel:3482989187">
                    <i class="fas fa-phone-alt" aria-hidden="true"></i>
                </a>
            </button>
        </div>
        <div class="col-12 col-lg-6 d-flex justify-content-center align-items-center my-5">
            <?php 
			$image = get_field('immagine1_contatti');
			if( !empty( $image ) ): ?>
				<img data-aos-duration="2000" data-aos="fade-right" class="w-100" src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
			<?php endif; ?>
        </div>
        </div>
        </div>
    </div>

    <!-- Contact Form -->
    <div class="container">
        <?php the_content(); ?>
    </div>


    
<?php    
endwhile;

get_footer();
?>