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


type Props = {
  changeData?: (newData: Vestido[]) => void
}
 
function Header ({changeData}: Props) {
   const [searchState, setSearchState] = useState("header__search--off")
   const [inputValue, setInputValue] = useState<string[]>([])
   const [noMatches, setNoMatches] = useState(false)
   const [searchClicked, setSearchClicked] = useState(false)
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
   /* const dataFiltrado: Vestido[] = [] */
   useEffect(() => {
    if(changeData){
      changeData(dataFiltrado)
    }
    if(searchClicked){
      
      if(dataFiltrado?.length === 0){
        setNoMatches(noMatches ? noMatches : !noMatches)
      }
      else{
          setNoMatches(false)
      }

    }
        
   }, [dataFiltrado])

   
   

   useEffect(() => {
    if (noMatches === true) {
      const timer = setTimeout(() => {
        setOpacityNoMatches(true)
      }, 5000);
      
      const timer2 = setTimeout(() => {
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
    setInputValue(newE.split(" "))
 }
 
 const handleSearchProduct = () =>{
  setDataFiltrado([])
  data.map((value,key)=>{
      nuevo = inputValue.filter(e => value.tags.includes(e))
      

      objeto1.push( {
        id: value.id,
        r: nuevo.length, 
      })
      if(nuevo.length > 0){
        arrayNum.push(nuevo.length)

      }
    
    })
    arrayNum.sort((a,b)=>b-a)
    arraySinRepetidos = [...new Set(arrayNum)]

    
      
    arraySinRepetidos.map(value => {
      f = objeto1.filter(e => e.r === value)
      f.map((df)=>{
        final.push(df)
      })
        
      })

      final.map((value)=>{
        const encontrado = data.find(s => s.id === value.id )
        if(encontrado){
          setDataFiltrado(prev => [...prev,encontrado])
        }
      })



  //aqui poner el resultado final
   /* setDataFiltrado(mostrar) */
   setSearchClicked(true)
     
 }
 /* console.log(`N matches: ${noMatches}`)
 console.log(dataFiltrado.length) */

 
  return (
    <>
    <header className={styles.header__container}>
      <Link to={"/"} className={styles.header__logo}>        
        <img className={styles.logo__img} src={Logo} alt="Logo Dizi Store" />      
      
      </Link>
        <nav className={styles.header__nav}>
            <IoSearch className={styles.header__searchlogo} onClick={()=>onClickSearch()}/>
            <Link to={"/Favoritos"} className={styles.header__Favoritologo}><FaRegHeart /></Link>
            <Menu></Menu>

        </nav>
        
    </header>
    <div className={styles[`${searchState}`]}>

      <form className={styles.header__inputSearch} onSubmit={(e) => {  
           e.preventDefault()
          handleSearchProduct()
          

        }}
>

            <input type="text" className={styles.search__input} onChange={(e)=>handleChangeSearch(e)}/>
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