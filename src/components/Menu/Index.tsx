import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import styles from "./Menu.module.css"
import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTiktok } from "react-icons/fa";



type Props = {}

function Menu({}: Props) {
  const [showMenu, setShowMenu] = useState(false)
  const handleOpenMenu = () => {
    setShowMenu(!showMenu)
  } 
  return (
    <div className={styles.menu__container}>
      
      <button className={styles.menu__iconHamburguer} onClick={handleOpenMenu}>
        <IoMenu />
      </button>
      
      
      <div className={`${styles["menu__main-container--off"]} ${showMenu ? styles["menu__main-container--on"] : ""}`} >
        <button className={styles.menu__iconClose} onClick={handleOpenMenu}><IoCloseSharp /></button>
        <div >
          <h2 className={styles.menu__h2}>SIGUENOS EN NUESTRAS REDES SOCIALES</h2>
          <div className={styles.menu__redesSociales}>
            <a className={`${styles.menu__redSocial} ${styles["menu__redSocial--facebook"]}`} href="https://www.facebook.com/share/17j4H6Ln84/">
              <div className={`${styles.menu__redCirculo} ${styles["menu__redCirculo--facebook"]}`}>
                <FaFacebook className={`${styles.menu__redIconFacebook}`}/>
              </div>
              <p>Dizi Store</p>
            </a>

            <a className={`${styles.menu__redSocial} ${styles["menu__redSocial--whatsapp"]}`} href="https://wa.me/59172234794">
              <div className={`${styles.menu__redCirculo} ${styles["menu__redCirculo--whatsapp"]}`}>
                <IoLogoWhatsapp className={`${styles.menu__redIconWhatsapp}`}/>
              </div>
              <p>Dizi Store</p>
            </a>

            <a className={`${styles.menu__redSocial} ${styles["menu__redSocial--tiktok"]}`} href="https://www.tiktok.com/@dizistore.bol">
              <div className={`${styles.menu__redCirculo} ${styles["menu__redCirculo--tiktok"]}`}>
                <FaTiktok className={`${styles.menu__redIconTiktok}`}/>
              </div>
              <p>Dizi Store</p>
            </a>
          </div>
        </div>
      </div>      
    

      

      

    </div>
  )
}

export default Menu