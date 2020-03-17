<?php
/**
 * Template Name: Recensioni
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
                <?php the_field('titolo1_recensioni'); ?>
                <span class="ml-3">&#11088;</span>
            </h1>
            <p><?php the_field('descrizione1_recensioni'); ?></p>
            <button type="button" class="main-btn mt-5 btn btn-warning">
                <?php 
				$link = get_field('link1_recensioni');
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
			$image = get_field('immagine1_recensioni');
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


    <div class="container">
        <div class="pt-8">
        
            <?php if( have_rows('review_cards') ): ?>
                <?php while( have_rows('review_cards') ): the_row(); ?>
                <div class="card my-5 w-100 profile-card">
                    <div class="row no-gutters">

                    <?php
                    // vars
                    $nome = get_sub_field('nome_review');
                    $recensione = get_sub_field('descrizione_review');
                    $stelle = get_sub_field('rating_review');

                    ?>

                    <div class="col-md-4 d-flex justify-content-center align-items-center">
                        <?php 
                        $image = get_sub_field('immagine_review');
                        if( !empty( $image ) ): ?>
                            <img class="card-img-top rounded-circle review-card-img" src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
                        <?php endif; ?>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <?php 
                            echo $nome;
                            echo $recensione;
                            ?>

                            <div class="d-flex">
                                <?php echo $stelle; ?>
                            </div>
                            
                        </div>
                    </div>
                    
                    </div>
                    </div>
                <?php endwhile; ?>
            <?php endif; ?>

        </div>  
    </div>


    <div class="py-8 text-center">
        <?php the_field('nota_recensioni'); ?>
    </div>


    
<?php    
endwhile;

get_footer();
?>