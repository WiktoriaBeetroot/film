import { useState } from "react";
import { Nav } from "./Nav";
import { tempMovieData } from './data';
import { Main } from "./Main";


export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  
  return (
    <>
      <Nav movies={movies}/>
      <Main movies={movies}/>
    </>
  );
}
