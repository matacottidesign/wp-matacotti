<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$container = get_theme_mod( 'understrap_container_type' );
?>

<?php get_template_part( 'sidebar-templates/sidebar', 'footerfull' ); ?>

</div><!--close Swup-->

<!--Contatti-->
<footer class="py-5 bg-social">
    <div class="container">
    <div class="row">
      <div class="col-12 col-lg-4 my-5 text-center d-flex align-items-center justify-content-center">
        <ul class="list-inline">
          <li class="list-inline-item px-3"><a class="footer-link" href="tel:3482989187"><i class="fas fa-mobile-alt"></i></a></li>
          <li class="list-inline-item px-3"><a class="footer-link" href="mailto:francesco1984.go@gmail.com"><i class="fas fa-envelope"></i></a></li>
        </ul>
      </div>
      <div class="col-12 col-lg-4 d-flex align-items-center justify-content-center my-5 text-center">
	  	<?php 
		$image = get_field('immagine_footer');
		if( !empty( $image ) ): ?>
			<img class="w-100 fade-in" src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
		<?php endif; ?>
      </div>
      <div class="col-12 col-lg-4 my-5 text-center d-flex align-items-center justify-content-center">
        <ul class="list-inline">
          <li class="list-inline-item px-3"><a class="footer-link" href="https://www.linkedin.com/in/francesco-matacotti-37166a162/" target="_blank"><i class="fab fa-linkedin-in"></i></a></li>
          <li class="list-inline-item px-3"><a class="footer-link" href="https://www.instagram.com/matacottidesign/?hl=it"><i class="fab fa-instagram" target="_blank"></i></a></li>
          <li class="list-inline-item px-3"><a class="footer-link" href="https://www.facebook.com/profile.php?id=100008874519250" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
          <li class="list-inline-item px-3"><a class="footer-link" href="https://github.com/matacottidesign" target="_blank"><i class="fab fa-github"></i></a></li>
        </ul>
      </div>
    </div>
    </div>

    <div class="container text-center footer-menu">
      <div class="row">
        <div class="col-12 col-sm-6">
          <h3><?php the_field('titolo_footer'); ?></h3>
          <ul class="pl-0">
            <li>
				<a href="#">
				<?php 
				$link = get_field('menu1');
				if( $link ): 
					$link_url = $link['url'];
					$link_title = $link['title'];
					$link_target = $link['target'] ? $link['target'] : '_self';
					?>
					<a class="button" href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>"><?php echo esc_html( $link_title ); ?></a>
				<?php endif; ?>
				</a>
			</li>
            <li>
				<a href="#">
				<?php 
				$link = get_field('menu2');
				if( $link ): 
					$link_url = $link['url'];
					$link_title = $link['title'];
					$link_target = $link['target'] ? $link['target'] : '_self';
					?>
					<a class="button" href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>"><?php echo esc_html( $link_title ); ?></a>
				<?php endif; ?>
				</a>
			</li>
			<li>
				<a href="#">
				<?php 
				$link = get_field('menu3');
				if( $link ): 
					$link_url = $link['url'];
					$link_title = $link['title'];
					$link_target = $link['target'] ? $link['target'] : '_self';
					?>
					<a class="button" href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>"><?php echo esc_html( $link_title ); ?></a>
				<?php endif; ?>
				</a>
			</li>
			<li>
				<a href="#">
				<?php 
				$link = get_field('menu4');
				if( $link ): 
					$link_url = $link['url'];
					$link_title = $link['title'];
					$link_target = $link['target'] ? $link['target'] : '_self';
					?>
					<a class="button" href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>"><?php echo esc_html( $link_title ); ?></a>
				<?php endif; ?>
				</a>
			</li>
			<li>
				<a href="#">
				<?php 
				$link = get_field('menu5');
				if( $link ): 
					$link_url = $link['url'];
					$link_title = $link['title'];
					$link_target = $link['target'] ? $link['target'] : '_self';
					?>
					<a class="button" href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>"><?php echo esc_html( $link_title ); ?></a>
				<?php endif; ?>
				</a>
			</li>
			<li>
				<a href="#">
				<?php 
				$link = get_field('menu6');
				if( $link ): 
					$link_url = $link['url'];
					$link_title = $link['title'];
					$link_target = $link['target'] ? $link['target'] : '_self';
					?>
					<a class="button" href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>"><?php echo esc_html( $link_title ); ?></a>
				<?php endif; ?>
				</a>
			</li>
			<li>
				<a href="#">
				<?php 
				$link = get_field('menu7');
				if( $link ): 
					$link_url = $link['url'];
					$link_title = $link['title'];
					$link_target = $link['target'] ? $link['target'] : '_self';
					?>
					<a class="button" href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>"><?php echo esc_html( $link_title ); ?></a>
				<?php endif; ?>
				</a>
			</li>
          </ul>
        </div>
        <div class="col-12 col-sm-6">
			<?php the_field('descrizione_link_footer'); ?>
          <button type="button" class="mt-3 btn btn-warning">
		  <?php 
			$link = get_field('link_footer');
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
  </footer>


	<div id="telefono" class="fixed-bottom contattaci-banner d-flex align-items-center justify-content-center rounded-circle ml-4 mb-4">
		<a href="tel:3482989187"><i class="fas fa-phone-alt"></i></a>
	</div>

	<div id="darkmode" class="dark-mode fixed-bottom text-right mb-4 mr-4 d-flex justify-content-end">
		<div class="d-flex justify-content-center align-items-center">
			<label class="switch">
				<input onclick="myFunction()" type="checkbox" id="switch" name="theme">
				<span class="slider round"></span>
			</label>
		</div>
	</div>

  

</div><!-- #page we need this extra closing tag here -->


<?php wp_footer(); ?>


</body>

</html>

