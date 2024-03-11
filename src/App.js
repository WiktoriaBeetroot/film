import { useState } from "react";
import { Nav } from "./Nav";
import { tempMovieData } from './data';
import { Main } from "./Main";
import { Search } from "./Search";
import { Logo } from "./Logo";
import { NumFilm } from "./NumFilms";
import { ListBox } from './ListBox';
import { WatchBox } from './WatchBox';
import { FilmList } from "./FilmList";


export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [isOpen1, setIsOpen1] = useState(true);
  
  return (
    <>
      <Nav> 
        <Logo />
        <Search/>
        <NumFilm movies={movies}/>
      </Nav>
      <Main>
        <ListBox onIsOpen1={setIsOpen1} classOpen={isOpen1}>
          <FilmList movies={movies} classOpen={isOpen1} /> 
        </ListBox> 
        <WatchBox /> 
    </Main>
    </>
  );
}
