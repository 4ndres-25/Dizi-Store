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
            <a className={`${styles.menu__redSocial} ${styles["menu__redSocial--facebook"]}`} href="">
              <a className={`${styles.menu__redCirculo} ${styles["menu__redCirculo--facebook"]}`}>
                <FaFacebook className={`${styles.menu__redIconFacebook}`}/>
              </a>
              <p>Dizi Store</p>
            </a>

            <a className={`${styles.menu__redSocial} ${styles["menu__redSocial--whatsapp"]}`}>
              <a className={`${styles.menu__redCirculo} ${styles["menu__redCirculo--whatsapp"]}`}>
                <IoLogoWhatsapp className={`${styles.menu__redIconWhatsapp}`}/>
              </a>
              <p>Dizi Store</p>
            </a>

            <a className={`${styles.menu__redSocial} ${styles["menu__redSocial--tiktok"]}`} href="https://www.tiktok.com/@dizistore.bol">
              <a className={`${styles.menu__redCirculo} ${styles["menu__redCirculo--tiktok"]}`} href="https://www.tiktok.com/@dizistore.bol">
                <FaTiktok className={`${styles.menu__redIconTiktok}`}/>
              </a>
              <p>Dizi Store</p>
            </a>
          </div>
        </div>
      </div>      
    

      

      

    </div>
  )
}

export default Menu