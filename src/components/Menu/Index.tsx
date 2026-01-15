import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import styles from "./Menu.module.css"
import { useState } from "react";
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
      </div>      
    

      

      

    </div>
  )
}

export default Menu