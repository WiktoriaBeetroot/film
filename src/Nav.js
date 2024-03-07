import { Search } from "./Search"
import { Logo } from "./Logo"
import { NumFilm } from "./NumFilms"

export const Nav = ({movies}) => {
    return (
    <nav className="nav-bar">
        <Logo />
        <Search/>
        <NumFilm movies={movies}/>
      </nav> 
    )
}