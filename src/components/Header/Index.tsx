import { Link } from "react-router-dom"
import { FaRegHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Logo from '../../assets/Images/dizi.jpg'
import styles from './Header.module.css'
import { IoClose } from "react-icons/io5";
import { useEffect, useState} from "react";
import Menu from "../../components/Menu/Index"
import type {Vestido} from "../../types/Vestidos"
import vestidos from "../../data/vestidos.json";
import { useNavigate, useLocation  } from "react-router-dom";


type Props = {
  changeData?: (dataFiltered : Vestido[]) => void;
  noEncontro: boolean
  searchClicked: boolean
}
 
function Header ({changeData, noEncontro, searchClicked}: Props) {
   const [searchState, setSearchState] = useState("header__search--off")
   const [inputValue, setInputValue] = useState<string>()
   const [noMatches, setNoMatches] = useState(false)
   const [opacityNoMatches, setOpacityNoMatches] = useState(false)
   const [dataFiltrado, setDataFiltrado] = useState<Vestido[]>([])
   const data: Vestido[] = vestidos;
   //
   let nuevo:string[] = []
   let objeto1 = [{id: 0, r: 0}]
   let arrayNum :number[] = []
   let arraySinRepetidos : number[]= []
   let f: any[]= []
   let final: any[] = []
   const [mostrar, setMostrar] = useState<Vestido[]>([]);//ojo copiar del otro
   const navigate = useNavigate()
   const location = useLocation()
   /* const dataFiltrado: Vestido[] = [] */
   useEffect(() => {
    
    if(searchClicked){
      
      console.log("si entra al if")
      if(noEncontro === true){
        setNoMatches(noMatches ? noMatches : !noMatches)
      }
      else{
          setNoMatches(false)
      }

    }
        
   }, [noEncontro])

   
   

   useEffect(() => {
    if (noMatches === true) {
      const timer = setTimeout(() => {
        setOpacityNoMatches(true)
      }, 5000);
      
      const timer2 = setTimeout(() => {
        console.log("entra el timer")
        setNoMatches(false)

      }, 6000)

      // limpiar si el componente se desmonta o si activo cambia antes
      return () => {
        clearTimeout(timer);
        clearTimeout(timer2)
      } 
      
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
 
 
 /* console.log(`N matches: ${noMatches}`)
 console.log(dataFiltrado.length) */

 const handleLogoClick = () => {
  if (location.pathname === "/") {
    // Ya estás en Home → solo reset
    navigate("/?reset=true", { replace: true })
  } else {
    // Vienes desde otra ruta → ir a Home
    navigate("/?reset=true")
  }
}
  console.log(`noEncontro: ${noEncontro}`)
 console.log(`noMatches: ${noMatches}`)
  return (
    <>
    <header className={styles.header__container}>
      <div className={styles.header__logo} onClick={handleLogoClick}>        
        <img className={styles.logo__img} src={Logo} alt="Logo Dizi Store" />      
      
      </div>
        <nav className={styles.header__nav}>
            <IoSearch className={styles.header__searchlogo} onClick={()=>onClickSearch()}/>
            <Link to={"/Favoritos"} className={styles.header__Favoritologo}><FaRegHeart /></Link>
            <Menu></Menu>

        </nav>
        
    </header>
    <div className={styles[`${searchState}`]}>

      <form className={styles.header__inputSearch} autoComplete="off" onSubmit={(e) => { 
         
           e.preventDefault()
           navigate(`/?search=${inputValue}`)

        }}
>

            <input type="text" className={styles.search__input} autoComplete="off" inputMode="search" onChange={(e)=>handleChangeSearch(e)}/>
            <button className={styles.search__button} type="submit">Buscar</button>
            <IoClose className={styles.header__closelogo} onClick={onClickSearch}/>
          
      </form>
      <div className={`${styles["header__noMatches--off"]} ${noMatches ? styles["header__noMatches--on"]: ""} ${opacityNoMatches ? styles["header__noMatches--time"]: ""}`}>
          <label>No se encontraron coincidencias, intente con otra palabra</label>
      </div>
    </div>
    </>
  )
}

export default Header 