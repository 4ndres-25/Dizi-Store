import Header from "../Header/Index"
import { Outlet } from "react-router-dom"
import type { Vestido } from "../../types/Vestidos"
import styles from "./LayoutConHeader.module.css"
type Props = {
    onSearch: (dataFiltered : Vestido[]) => void;
    noEncontro: boolean
    searchClicked: boolean
}

function LayoutConHeader({onSearch, noEncontro, searchClicked}: Props) {
  return (
    <>
        <Header changeData={onSearch} noEncontro={noEncontro} searchClicked={searchClicked}/>
      <Outlet />

    
    </>
  )
}

export default LayoutConHeader