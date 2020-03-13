<?php
/**
 * Template Name: Biografia
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
                        <?php the_field('titolo1_biografia'); ?>
                        <span class="ml-3">&#128100;</span>
                    </h1>

                    <p><?php the_field('descrizione1_biografia'); ?></p>

                    <button type="button" class="main-btn mt-5 btn btn-warning">
                    <?php 
                    $link = get_field('link1_biografia');
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
                    $image = get_field('immagine1_biografia');
                    if( !empty( $image ) ): ?>
                        <img class="w-100" src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>


    <!--Percorso-->
    <div class="py-5 bg-skills">
        <div class="container">
        <div class="row">
            <div class="col-12 col-lg-6 d-flex justify-content-center align-items-center my-5">
                <div class="card profile-card p-3 fade-in">
                    <?php 
                    $image = get_field('immagine2_biografia');
                    if( !empty( $image ) ): ?>
                        <img class="w-100 p-2 rounded-circle" src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
                    <?php endif; ?>
                    <div class="card-body p-3 pt-5">
                        <p>
                            <b class="blue-primary">Nome:</b> Francesco <br>
                            <b class="blue-primary">Cognome:</b>  Matacotti <br>
                            <b class="blue-primary">Classe:</b>  '97 <br>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6 my-5 text-right">
            <h2 class="blue-primary mb-5">
                <span class="mr-3">&#128214;</span>
                <?php the_field('titolo2_biografia'); ?>
            </h2>
            <p><?php the_field('descrizione2_biografia'); ?></p>
            </div>
        </div>
        </div>
    </div>

    
    <!--Skills-->
    <div class="py-5 bg-help">
        <div class="container">
            <div class="row">
            <div class="col-12 col-lg-6 my-5">
            <h2 class="blue-primary mb-5">
                <?php the_field('titolo3_biografia'); ?>
                <span class="mr-3">&#128296;</span>
            </h2>
                <p><?php the_field('descrizione3_biografia'); ?></p>
            </div>
            <div class="col-12 col-lg-6 d-flex justify-content-center align-items-center my-5">
                <?php 
                $image = get_field('immagine3_biografia');
                if( !empty( $image ) ): ?>
                    <img class="w-100" src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
                <?php endif; ?>
            </div>
            </div>
            <p><?php the_field('descrizione3-1_biografia'); ?></p>
        </div>
    </div>


    <!--Softwares & Tools-->
    <div class="py-5 bg-review">
        <div class="container">
        <div class="d-flex justify-content-center align-items-center my-5 fade-in">
            <ul class="list-inline softwares text-center">
                <li class="list-inline-item px-3 pb-3">
                    <i class="fab fa-bootstrap"></i>
                </li>
                <li class="list-inline-item px-3 pb-3">
                    <i class="fab fa-github"></i>
                </li>
                <li class="list-inline-item px-3 pb-3">
                    <i class="fab fa-git-alt"></i>
                </li>
                <li class="list-inline-item px-3 pb-3">
                    <i class="fab fa-gulp"></i>
                </li>
                <li class="list-inline-item px-3 pb-3">
                    <i class="fab fa-wordpress"></i>
                </li>
                <li class="list-inline-item px-3 pb-3">
                    <i class="fab fa-html5"></i>
                </li>
                <li class="list-inline-item px-3 pb-3">
                    <i class="fab fa-css3-alt"></i>
                </li>
                <li class="list-inline-item px-3 pb-3">
                    <i class="fab fa-sass"></i>
                </li>
                <li class="list-inline-item px-3 pb-3">
                    <i class="fab fa-php"></i>
                </li>
                <li class="list-inline-item px-3 pb-3">
                    <i class="fab fa-js"></i>
                </li>
                <li class="list-inline-item px-3 pb-3">
                    <i class="fab fa-adobe"></i>
                </li>
            </ul> 
        </div>
        <div class="d-flex justify-content-center align-items-center my-5 fade-in">
            <ul class="list-inline softwares text-center">
                <li class="list-inline-item px-3 pb-3">
                    <i class="fab fa-apple"></i>
                </li>
                <li class="list-inline-item px-3 pb-3">
                    <i class="fab fa-windows"></i>
                </li>
            </ul> 
        </div>
        </div>
    </div>

    
<?php    
endwhile;

get_footer();
?>