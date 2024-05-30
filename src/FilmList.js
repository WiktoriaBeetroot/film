import { FilmItem } from "./FilmItem";
import { useBoxContext } from "./ListBox";

export const FilmList = ({movies, handleSelectedFilm}) => {
    const { isOpen } = useBoxContext();
    return (
        <ul className={`list list-movies ${isOpen ? ' active' : 'hidden'}`}>
        {movies?.map((movie) => (
            <FilmItem movie={movie} key={movie.imdbID} handleSelectedFilm={handleSelectedFilm}/>
        ))}
      </ul>
    )
}