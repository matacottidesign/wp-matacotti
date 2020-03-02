<?php
/**
 * Il file base di configurazione di WordPress.
 *
 * Questo file viene utilizzato, durante l’installazione, dallo script
 * di creazione di wp-config.php. Non è necessario utilizzarlo solo via
 * web, è anche possibile copiare questo file in «wp-config.php» e
 * riempire i valori corretti.
 *
 * Questo file definisce le seguenti configurazioni:
 *
 * * Impostazioni MySQL
 * * Prefisso Tabella
 * * Chiavi Segrete
 * * ABSPATH
 *
 * È possibile trovare ulteriori informazioni visitando la pagina del Codex:
 *
 * @link https://codex.wordpress.org/it:Modificare_wp-config.php
 *
 * È possibile ottenere le impostazioni per MySQL dal proprio fornitore di hosting.
 *
 * @package WordPress
 */

// ** Impostazioni MySQL - È possibile ottenere queste informazioni dal proprio fornitore di hosting ** //
/** Il nome del database di WordPress */
define( 'DB_NAME', 'sito_matacotti' );

/** Nome utente del database MySQL */
define( 'DB_USER', 'root' );

/** Password del database MySQL */
define( 'DB_PASSWORD', 'root' );

/** Hostname MySQL  */
define( 'DB_HOST', 'localhost' );

/** Charset del Database da utilizzare nella creazione delle tabelle. */
define( 'DB_CHARSET', 'utf8mb4' );

/** Il tipo di Collazione del Database. Da non modificare se non si ha idea di cosa sia. */
define('DB_COLLATE', '');

/**#@+
 * Chiavi Univoche di Autenticazione e di Salatura.
 *
 * Modificarle con frasi univoche differenti!
 * È possibile generare tali chiavi utilizzando {@link https://api.wordpress.org/secret-key/1.1/salt/ servizio di chiavi-segrete di WordPress.org}
 * È possibile cambiare queste chiavi in qualsiasi momento, per invalidare tuttii cookie esistenti. Ciò forzerà tutti gli utenti ad effettuare nuovamente il login.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '(xj3[{t`zGXV4sYEk~j1n)ElJqtZ+U51RgTp)!Z|:tsJ dRLg4.[.=$aTf$Az,5j' );
define( 'SECURE_AUTH_KEY',  '3+Q ?&4s<q!$78N0Bxw!Pdqz-,;D<BFtgYrP Ex0_ P1}]^R[#wf3?NDgp{ZZ,-t' );
define( 'LOGGED_IN_KEY',    'X!H5f/#t,|{z6g4Jn`$f8=ry{, $FV&k!]K4qc;m$r8$6}M,C`[I8cE1XXhY2utI' );
define( 'NONCE_KEY',        'GJNS:3@7G-O$%;t0ZAHY 3&&?:#l#M@JOyzo6kj;6Vg$cD76@/%1,GP_U4?O1Tjt' );
define( 'AUTH_SALT',        '*OKXuE?UUKg]Btz*6V2/y4$(M{G9F_46[MbxOtVw%RtQ,l5ISJOv@#/&MRoo@B(k' );
define( 'SECURE_AUTH_SALT', 'p}T8. YbTw})nMcsNyOOD1B<jbYTg ZCPA95)aIG>9!t<LhK5Q(7q3LS>{Mn:mja' );
define( 'LOGGED_IN_SALT',   '6Y`irfmat,JAO`c0Xe7UrV^}yPC5{iqN98%k!d8N]tIBq9+%}|d4[~fRpqlVle#]' );
define( 'NONCE_SALT',       '~gfH{[OFzEcn5U[arPKvC]6#YxB-G(`{>~3S9/^]gv O?IfId9SE}+D*L4eo-<*k' );

/**#@-*/

/**
 * Prefisso Tabella del Database WordPress.
 *
 * È possibile avere installazioni multiple su di un unico database
 * fornendo a ciascuna installazione un prefisso univoco.
 * Solo numeri, lettere e sottolineatura!
 */
$table_prefix = 'xyz_';

/**
 * Per gli sviluppatori: modalità di debug di WordPress.
 *
 * Modificare questa voce a TRUE per abilitare la visualizzazione degli avvisi
 * durante lo sviluppo.
 * È fortemente raccomandato agli svilupaptori di temi e plugin di utilizare
 * WP_DEBUG all’interno dei loro ambienti di sviluppo.
 */
define('WP_DEBUG', false);

/* Finito, interrompere le modifiche! Buon blogging. */

/** Path assoluto alla directory di WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Imposta le variabili di WordPress ed include i file. */
require_once(ABSPATH . 'wp-settings.php');
