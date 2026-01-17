import { Link } from "react-router-dom"
import { FaRegHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Logo from '../../assets/Images/Captura_Dizi_Logo.jpg'
import styles from './Header.module.css'
import { IoClose } from "react-icons/io5";
import { useEffect, useState} from "react";
import Menu from "../../components/Menu/Index"
import type {Vestido} from "../../types/Vestidos"
import vestidos from "../../data/vestidos.json";


type Props = {
  changeData?: (newData: Vestido[]) => void
}
 
function Header ({changeData}: Props) {
   const [searchState, setSearchState] = useState("header__search--off")
   const [inputValue, setInputValue] = useState("")
   const [noMatches, setNoMatches] = useState(false)
   const [searchClicked, setSearchClicked] = useState(false)
   const [opacityNoMatches, setOpacityNoMatches] = useState(false)
   const [dataFiltrado, setDataFiltrado] = useState<Vestido[]>([])
   const data: Vestido[] = vestidos;
   /* const dataFiltrado: Vestido[] = [] */
   useEffect(() => {
    if(changeData){
      changeData(dataFiltrado)
    }
    if(searchClicked){
      console.log("es click")
      if(dataFiltrado?.length === 0){
        console.log("no coincidencias")
        setNoMatches(noMatches ? noMatches : !noMatches)
      }
      else{
          console.log("SI COINCIDENCIAS")
          setNoMatches(false)
      }

    }
        
   }, [dataFiltrado])

   
   

   useEffect(() => {
     console.log("SADWDAWFAFWWFAWFAAWFAF")
    if (noMatches === true) {
      console.log("SADWDAWFAFWWFAWFAAWFAF")
      const timer = setTimeout(() => {
        setOpacityNoMatches(true)
      }, 5000);
      
      const timer2 = setTimeout(() => {
        setNoMatches(false)

      }, 6000)

      // limpiar si el componente se desmonta o si activo cambia antes
      return () => clearTimeout(timer);
    }
    else{
      setOpacityNoMatches(false)
    }
  }, [noMatches]);

  
 const onClickSearch = () =>{
    
    setSearchState(searchState==="header__search--off"?"header__search":"header__search--off")
 }
 const handleChangeSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    const newE = e.target.value.toLowerCase()
    setInputValue(newE)
 }
 const handleSearchProduct = () =>{
  const newData = data.filter(v => v.tags.some(item => item === inputValue) )
   setDataFiltrado(newData)
   setSearchClicked(true)
     
 }
 console.log(`N matches: ${noMatches}`)
 console.log(dataFiltrado.length)
  return (
    <>
    <header className={styles.header__container}>
        <div className={styles.header__logo}>
            <img className={styles.logo__img} src={Logo} alt="Logo Dizi Store" />
        </div>
        <nav className={styles.header__nav}>
            <IoSearch className={styles.header__searchlogo} onClick={()=>onClickSearch()}/>
            <Link to={"/Favortios"} className={styles.header__Favoritologo}><FaRegHeart /></Link>
            <Menu></Menu>

        </nav>
        
    </header>
    <div className={styles[`${searchState}`]}>

      <div className={styles.header__inputSearch}>

            <input type="text" className={styles.search__input} onChange={(e)=>handleChangeSearch(e)}/>
            <button className={styles.search__button} onClick={handleSearchProduct}>Buscar</button>
            <IoClose className={styles.header__closelogo} onClick={onClickSearch}/>
          
      </div>
      <div className={`${styles["header__noMatches--off"]} ${noMatches ? styles["header__noMatches--on"]: ""} ${opacityNoMatches ? styles["header__noMatches--time"]: ""}`}>
          <label>No se encontraron coincidencias, intente con otra palabra</label>
      </div>
    </div>
    </>
  )
}

export default Header 