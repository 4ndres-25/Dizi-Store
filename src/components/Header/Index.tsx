import { Link } from "react-router-dom"
import { FaRegHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Logo from '../../assets/Images/Captura_Dizi_Logo.jpg'
import styles from './Header.module.css'
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import Menu from "../../components/Menu/Index"


type Props = {}
 
function Header ({}: Props) {
   const [searchState, setSearchState] = useState("header__search--off")
 const onClickSearch = () =>{
    
    setSearchState(searchState==="header__search--off"?"header__search":"header__search--off")
 }
  return (
    <>
    <header className={styles.header__container}>
        <div className={styles.header__logo}>
            <img className={styles.logo__img} src={Logo} alt="Logo Dizi Store" />
        </div>
        <nav className={styles.header__nav}>
            <IoSearch className={styles.header__searchlogo} onClick={()=>onClickSearch()}/>
            <Link to={"/Favoritos"} className={styles.header__Favoritologo}><FaRegHeart /></Link>
            <Menu></Menu>

        </nav>
        
    </header>
    <div className={styles[`${searchState}`]}>
          <input type="text" className={styles.search__input}/>
          <button className={styles.search__button}>Buscar</button>
          <IoClose className={styles.header__closelogo}/>
    </div>
    </>
  )
}

export default Header 