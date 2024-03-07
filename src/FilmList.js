import { FilmItem } from "./FilmItem"

export const FilmList = ({movies}) => {
    return (
        <ul className="list">
        {movies?.map((movie) => (
            <FilmItem movie={movie} key={movie.imdbID}/>
        ))}
      </ul>
    )
}