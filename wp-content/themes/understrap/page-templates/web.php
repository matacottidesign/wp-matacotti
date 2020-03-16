<?php
/**
 * Template Name: Web
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
                <?php the_field('titolo1_web'); ?>
                <span class="ml-3">&#128421;</span>
            </h1>
            <p><?php the_field('descrizione1_web'); ?></p>
            <button type="button" class="main-btn mt-5 btn btn-warning">
                <?php 
				$link = get_field('link1_web');
				if( $link ): 
					$link_url = $link['url'];
					$link_title = $link['title'];
					$link_target = $link['target'] ? $link['target'] : '_self';
					?>
					<a class="button" href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>"><?php echo esc_html( $link_title ); ?></a>
				<?php endif; ?>
            </button>
        </div>
        <div class="col-12 col-lg-6 d-flex justify-content-center align-items-center my-5">
            <?php 
			$image = get_field('immagine1_web');
			if( !empty( $image ) ): ?>
				<img data-aos-duration="2000" data-aos="fade-right" class="w-100" src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
			<?php endif; ?>
        </div>
        </div>
        </div>
    </div>


  <!-- Cards -->
  <div class="bg-skills">
        <div class="container">
            <div class="row">

            <?php if( have_rows('card_web') ): ?>

                <?php while( have_rows('card_web') ): the_row(); 

                    // vars
                    $description = get_sub_field('descrizione_card_web');

                    ?>
                        <div class="col-12 col-md-4">
                            <div class="mb-5">
                                <div class="card w-100">

                                    <?php 
                                    $image = get_sub_field('immagine_card_web');
                                    if( !empty( $image ) ): ?>
                                        <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
                                    <?php endif; ?>

                                    <div class="my-4">
                                    <?php echo $description ?>
                                    </div>

                                    <button type="button" class="btn btn-warning">
                                        <?php 
                                        $link = get_sub_field('link_card_web');
                                        if( $link ): 
                                            $link_url = $link['url'];
                                            $link_title = $link['title'];
                                            $link_target = $link['target'] ? $link['target'] : '_self';
                                            ?>
                                            <a class="button" href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>"><?php echo esc_html( $link_title ); ?></a>
                                        <?php endif; ?>
                                    </button>
                                </div>
                            </div>
                        </div>

                <?php endwhile; ?>

            <?php endif; ?>

            </div>
        </div>
  </div>

    
<?php    
endwhile;

get_footer();
?>