<?php
/**
 * Template Name: Curriculum Vitae
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
                <?php the_field('titolo1_cv'); ?>
                <span class="ml-3">&#128203;</span>
            </h1>
            <p><?php the_field('descrizione1_cv'); ?></p>
            <button type="button" class="main-btn mt-5 btn btn-warning">
                <?php 
				$link = get_field('link1_cv');
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
			$image = get_field('immagine1_cv');
			if( !empty( $image ) ): ?>
				<img data-aos-duration="2000" data-aos="fade-right" class="w-100" src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
			<?php endif; ?>
        </div>
        </div>
        </div>
    </div>


  <!--Lista-->
  <div class="py-5 bg-skills">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-6 my-5 text-left">
            <h2 class="blue-primary mb-5">
                <?php the_field('titolo2_cv'); ?>
                <span class="ml-3">&#127891;</span>
            </h2>

            <?php if( have_rows('elenco_formazioni') ): ?>

                <?php while( have_rows('elenco_formazioni') ): the_row();?>
                    <?php the_sub_field('descrizione2_cv'); ?>
                <?php endwhile; ?>

            <?php endif; ?>

        </div>

        <div class="col-12 col-lg-6 my-5 text-right">
            <h2 class="blue-primary mb-5">
                <span class="ml-3">&#128170;&#127995;</span>
                <?php the_field('titolo3_cv'); ?>
            </h2>
            
            <?php if( have_rows('elenco_esperienze') ): ?>

            <?php while( have_rows('elenco_esperienze') ): the_row();?>
                <?php the_sub_field('descrizione3_cv'); ?>
            <?php endwhile; ?>

            <?php endif; ?>

        </div>
      </div>
    </div>
    </div>

    
<?php    
endwhile;

get_footer();
?>