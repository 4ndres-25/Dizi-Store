
import type { ReactNode } from 'react'
import styles from './BotonSimple.module.css'


type Props = {
  children : ReactNode 
}

function BotonSimple({children}: Props) {
  return (
    <button className={styles.button}>{children}</button>
  )
}
 
 export default BotonSimple
