import styles from "./Footer.module.css"
import { Link } from "react-router-dom"
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTiktok } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";



type Props = {}

function Footer({}: Props) {
  return (
    <div className={styles.footer__container}>
        <div className={styles.footer__referencia}>
            <Link to={"/politica-de-privacidad"} className={styles.footer__link}>
                <div className={styles.footer__div}>Politica de Privacidad</div>
            </Link>
            <Link to={"/terminos-y-condiciones"} className={styles.footer__link}>
                <div className={styles.footer__div}>Términos y condiciones</div>
            </Link>
            <Link to={"/contacto"} className={styles.footer__link}>
                <div className={styles.footer__div}>Página de Contacto</div>
            </Link>
            <Link to={"/sobre-nosotros"} className={styles.footer__link}>
                <div className={styles.footer__div}>Sobre nosotros</div>
            </Link>

        </div>
        <div className={styles.footer__redes}>
            <a href=""><IoLogoWhatsapp className={styles.footer__icon}/></a>
            <a href=""><FaTiktok className={styles.footer__icon}/></a>
            <a href=""><FaFacebook className={styles.footer__icon}/></a>
        </div>
    </div>
  )
}

export default Footer