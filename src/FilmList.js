import { FilmItem } from "./FilmItem"

export const FilmList = ({movies, classOpen}) => {
    return (
        <ul className={classOpen ? 'list active' : 'list hidden'}>
        {movies?.map((movie) => (
            <FilmItem movie={movie} key={movie.imdbID}/>
        ))}
      </ul>
    )
}