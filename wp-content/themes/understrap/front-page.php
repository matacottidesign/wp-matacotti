<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

$container = get_theme_mod( 'understrap_container_type' );
?>

<?php if ( is_front_page() && is_home() ) : ?>
	<?php get_template_part( 'global-templates/hero' ); ?>
<?php endif; ?>

<!-- Start -->

	<?php if ( have_posts() ) : ?>

		<?php /* Start the Loop */ ?>

		<?php while ( have_posts() ) : the_post(); ?>
			<?php the_content(); ?>
		<?php endwhile; ?>

	<?php else : ?>

		<?php get_template_part( 'loop-templates/content', 'none' ); ?>

	<?php endif; ?>

	<!--HERO-->
	<div class="py-5 bg-hero">
		<div class="container">
			<div class="row">
			<div class="col-12 col-lg-6 my-5">
				<h1 class="blue-primary mb-5 d-flex">
					<span class="mr-3">&#128075;&#127995;</span>
					<?php the_field('titolo_presentazione'); ?>
				</h1>
				<p><?php the_field('descrizione_presentazione'); ?></p>
				<button type="button" class="mt-5 btn btn-warning">
				<?php 
				$link = get_field('link_presentazione');
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
			$image = get_field('immagine_presentazione');
			if( !empty( $image ) ): ?>
				<img class="w-100" src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
			<?php endif; ?>
			</div>
			</div>
		</div>
  	</div>


	<!--Di cosa mi occupo-->
	<div class="py-5 bg-skills">
		<div class="container">
		<div class="row">
			<div class="col-12 col-lg-6 d-flex justify-content-center align-items-center my-5">
				<?php 
				$image = get_field('immagine_di_cosa_mi_occupo');
				if( !empty( $image ) ): ?>
					<img class="w-100" src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
				<?php endif; ?>
			</div>
			<div class="col-12 col-lg-6 my-5 text-right">
				<h2 class="blue-primary mb-5">
					<span class="mr-3">&#129300;</span>
					<?php the_field('titolo_di_cosa_mi_occupo'); ?>
				</h2>
				<p><?php the_field('descrizione_di_cosa_mi_occupo'); ?></p>
			</div>
		</div>

		<div class="row skills-row">
			<div class="col-12 col-sm-6 text-center">
			<a href="#">
				<div class="card skills-card my-5 py-4">
					<span>&#128421;</span>
				</div>
			</a>
			</div>
			<div class="col-12 col-sm-6 text-center">
			<a href="#">
				<div class="card skills-card my-5 py-4">
					<span>&#128396;</span>
				</div>
			</a>
			</div>
		</div>
		</div>
  	</div>


	<!--Info-->
	<div class="py-5 bg-help">
		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-6 my-5">
					<h2 class="blue-primary mb-5">
						<?php the_field('titolo_aiuto'); ?>
						<span class="ml-3">&#128161;</span>
					</h2>
					<p><?php the_field('descrizione_aiuto'); ?></p>
					<div class="pt-5">
					<button type="button" class="btn btn-warning">
						<?php 
						$link = get_field('link_aiuto');
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
				<div class="col-12 col-lg-6 d-flex justify-content-center align-items-center my-5">
					<?php 
					$image = get_field('immagine_aiuto');
					if( !empty( $image ) ): ?>
						<img class="w-100" src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
					<?php endif; ?>
				</div>
			</div>
		</div>
	  </div>
	  

	  <!--Dicono di me-->
  <div class="py-5 bg-review">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-6 d-flex justify-content-center align-items-center my-5">
			<?php 
			$image = get_field('immagine_about');
			if( !empty( $image ) ): ?>
				<img class="w-100" src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
			<?php endif; ?>
        </div>
        <div class="col-12 col-lg-6 my-5 text-right">
          	<h2 class="blue-primary mb-5">
			  <span class="mr-3">&#127908;</span>
			  <?php the_field('titolo_about'); ?>
			</h2>
          <p><?php the_field('descrizione1_about'); ?></p>

          <div id="carouselExampleSlidesOnly" class="mt-3 carousel slide carousel-fade text-left" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div style="height: 200px;" style="height: 200px;" class="card w-100">
                  <div class="card-body">
                    <p class="card-text"><i>"Persona molto seria disponibile corretta e professionale. <br> Ha subito capito i miei gusti e ha esguiti il lavoro scrupolosamente...veramente consigliato."</i></p>
                    <h6 class="mt-3 card-title">Alessandro</h6>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div style="height: 200px;" class="card w-100">
                  <div class="card-body">
                    <p class="card-text"><i>"Grande persona e grande professionista."</i></p>
                    <h6 class="mt-3 card-title">Gianmarco</h6>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div style="height: 200px;" class="card w-100">
                  <div class="card-body">
                    <p class="card-text"><i>"Ottima professionalità e tantissima creatività! <br> Consiglio assolutamente"</i></p>
                    <h6 class="mt-3 card-title">Benedetta</h6>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div style="height: 200px;" class="card w-100">
                  <div class="card-body">
                    <p class="card-text"><i>"Ragazzo sveglio e professionale, con organizzazione e passione per il suo lavoro! Felice di collaborare ancora con lui per progetti futuri!"</i></p>
                    <h6 class="mt-3 card-title">Valerio</h6>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div style="height: 200px;" class="card w-100">
                  <div class="card-body">
                    <p class="card-text"><i>"Ho avuto modo di conoscere Francesco e poterne apprezzare le sue capacità: comunicative e soprattutto professionali, nell'ambito della creazione di siti web."</i></p>
                    <h6 class="mt-3 card-title">Giuseppe</h6>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div style="height: 200px;" class="card w-100">
                  <div class="card-body">
                    <p class="card-text"><i>"Meticoloso, efficente, sincero e affidabile sia nel lavoro di squadra, che nel lavoro singolo specifico. <br> Ho imparato molto da Francesco e spero di avere il piacere di continuare a farlo. <br> Lo raccomando."</i></p>
                    <h6 class="mt-3 card-title">Giulia</h6>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div style="height: 200px;" class="card w-100">
                  <div class="card-body">
                    <p class="card-text"><i>"La caratteristica che più salta alla luce quando si ha a che fare con Francesco, è la sua grandissima curiosità, curiosità sana che sfocia prima in un approfondimento degli argomenti e poi in una originalissima creatività."</i></p>
                    <h6 class="mt-3 card-title">Federico</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p class="mt-3">
		  	<?php the_field('sottotitolo_about'); ?>
          </p>
          <button type="button" class="mt-5 btn btn-warning">
				<?php 
				$link = get_field('link_about');
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
 	</div>



	<!-- The pagination component -->
	<?php understrap_pagination(); ?>

	<!-- Do the right sidebar check -->
	<?php get_template_part( 'global-templates/right-sidebar-check' ); ?>

<?php get_footer(); ?>
