import { FilmItem } from "./FilmItem"

export const FilmList = ({movies, isOpen}) => {
    return (
        <ul className={`list ${isOpen ? ' active' : 'hidden'}`}>
        {movies?.map((movie) => (
            <FilmItem movie={movie} key={movie.imdbID}/>
        ))}
      </ul>
    )
}