import { Link } from "react-router-dom"

type Props = {}

function Header ({}: Props) {
  return (
    <header>
        <div>
            <img src="" alt="Logo Dizi Store" />
        </div>
        <nav>
            <Link to={"/Favortios"}>Favoritos</Link>
        </nav>
    </header>
  )
}

export default Header 