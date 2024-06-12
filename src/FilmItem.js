export const FilmItem = ({movie, handleSelectedFilm}) => {
    return (
    <li onClick={() => handleSelectedFilm(movie.imdbID)}>
       {movie.Poster !== 'N/A' ? (
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
       ) : (
          <img src={`${process.env.PUBLIC_URL}/images/default_image.jpeg`} alt="default_image"></img>
       )}
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    )
}