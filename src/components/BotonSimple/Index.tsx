
import styles from './BotonSimple.module.css'


type Props = {
  children : string
  active: boolean
  changeSize?: (talla: string) => void 
}

function BotonSimple({children, changeSize, active}: Props) {
  return (
    <button className={`${styles.button} ${active ? styles["button--selected"]:""}`} onClick={()=>changeSize?.(children)}>{children}</button>
  )
}
 
 export default BotonSimple
