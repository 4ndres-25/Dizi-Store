import styles from "./SobreNosotros.module.css"
type Props = {}

function SobreNosotros({}: Props) {
  return (
    <div className={styles.nosotros__container}>
        <h1 className={styles.nosotros__titulo}>Sobre Nosotros</h1>
        <p>Somos un catálogo online de ropa y accesorios dirigido al público de Bolivia. Nuestro objetivo es mostrar productos como vestidos y otros artículos de moda para que los usuarios puedan conocerlos y contactar directamente para consultas o compras.

No realizamos pagos dentro del sitio web. Si algún producto te interesa, puedes consultarnos por WhatsApp para más información sobre precios, tallas, colores o disponibilidad.

Nuestro propósito es ofrecer una experiencia visual clara, sencilla y accesible para quienes buscan moda y estilo dentro del país.</p>
    </div>
  )
}

export default SobreNosotros