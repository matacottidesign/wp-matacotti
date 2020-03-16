<?php
/**
 * Template Name: Blog
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
                <?php the_field('titolo1_blog'); ?>
                <span class="ml-3">&#128221;</span>
            </h1>
            <p><?php the_field('descrizione1_blog'); ?></p>
            <button type="button" class="main-btn mt-5 btn btn-warning">
                <?php 
				$link = get_field('link1_blog');
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
			$image = get_field('immagine1_blog');
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

            <?php if( have_rows('blog_cards') ): ?>

                <?php while( have_rows('blog_cards') ): the_row(); 

                    // vars
                    $title = get_sub_field('titolo_card');
                    $description = get_sub_field('descrizione_card');

                    ?>
                        <div class="col-12 col-md-6">
                            <div class="py-5 fade-in" style="visibility: inherit; opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);">
                                <div class="blog-card">
                                    <div class="blog-card-image mx-5">
                                        <?php 
                                        $image = get_sub_field('immagine_card');
                                        if( !empty( $image ) ): ?>
                                            <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
                                        <?php endif; ?>
                                    </div>
                                    <div class="blog-table">
                                        <?php echo $title ?>
                                        
                                        <div class="container mt-5">
                                            <div class="mb-4">
                                                <?php echo $description ?>
                                            </div>
                                            <div class="mb-4">
                                                <button type="button" class="btn btn-warning">
                                                <?php 
                                                $link = get_sub_field('link_card');
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
                                        
                                        <!-- <div class="accordion mt-4" id="accordionExample1">
                                            <div class="card blog-text-button">
                                            <div class="card-header" id="headingOne">
                                                <h2 class="text-center">
                                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapseOne">
                                                    <i class="fas fa-align-left description-web-project" aria-hidden="true"></i>
                                                </button>
                                                </h2>
                                            </div>
                                        
                                            <div id="collapse1" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample1" style="">
                                                <div class="card-body">
                                                    <?php echo $description ?>
                                                </div>
                                            </div>
                                            </div>
                                        </div> -->

                                    </div>
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