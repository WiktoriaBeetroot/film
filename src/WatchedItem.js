export const WatchedItem = ({movie, handleRemoveWatchedFilm}) => {
    return (
     <li>
      { movie.poster !== 'N/A' ? (
          <img src={movie.poster} alt={`${movie.title} poster`} />
      ) : (
        <img src={`${process.env.PUBLIC_URL}/images/default_image.jpeg`} alt="default_image" />
      )}
        <h3>{movie.title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          {movie.userRating > 0 && (
              <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
              </p>
          )}

          {!isNaN(movie.runtime) && 
              <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
              </p>
          }

          <button className="btn-delete" onClick={() => handleRemoveWatchedFilm(movie.imdbId)}>X</button>
        </div>
      </li>
    )
}