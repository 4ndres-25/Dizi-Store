import Header from "../Header/Index"
import { Outlet } from "react-router-dom"
import type { Vestido } from "../../types/Vestidos"

type Props = {
    onSearch: (dataFiltered : Vestido[]) => void
}

function LayoutConHeader({onSearch}: Props) {
  return (
    <>
      <Header changeData={onSearch}/>
      <Outlet />
    </>
  )
}

export default LayoutConHeader