import styles from "./PoliticaPrivacidad.module.css"

type Props = {}

function PoliticaPrivacidad({}: Props) {
  return (
    <div className={styles.privacidad__container}>
        <h1 className={styles.privacidad__titulo}>Politica de privacidad</h1>
        <p>Este sitio web recopila datos de navegación con fines estadísticos y publicitarios.

          Utilizamos servicios de terceros, incluyendo:

          Google AdSense para mostrar publicidad relevante.

          Cloudflared Analytics para analizar el uso del sitio y mejorar la experiencia del usuario.

          Los datos recopilados pueden incluir: dirección IP, tipo de dispositivo, páginas visitadas, tiempo de navegación y acciones realizadas dentro del sitio. Estos datos son gestionados por los proveedores mencionados y no incluyen información personal sensible.

          No almacenamos datos personales.</p>




          <h2 className={styles.privacidad__titulo}>Enlaces a Terceros</h2>
          <p>

          Este sitio web puede contener enlaces a otros sitios que podrían ser de interés para el usuario, tales como redes sociales y plataformas de mensajería (por ejemplo, WhatsApp, TikTok o Facebook). Una vez que el usuario hace clic en estos enlaces y abandona nuestro sitio, dejamos de tener control sobre el sitio al que es redirigido.

          Por lo tanto, no somos responsables por los términos, políticas de privacidad ni por la protección de datos que dichos terceros gestionen. Estos sitios cuentan con sus propias políticas, por lo que se recomienda revisarlas para asegurarse de que está de acuerdo con ellas.</p>
    </div>
    
  )
}

export default PoliticaPrivacidad