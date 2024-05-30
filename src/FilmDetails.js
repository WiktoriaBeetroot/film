import { useState, useEffect } from "react";
import { StarRating } from "./Star";
import { Loader } from "./Loader";

const KEY = '73aaaa6d';

export const FilmDetails = ({selectedId, handleCloseFilmDetails}) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function() {
        async function getMovieDetails() {
            setIsLoading(true)
            try{
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
                const data = await res.json();
                setMovie(data)
                setIsLoading(false)
            }catch(err) {
                console.error(err.message)
            }
        }
        getMovieDetails()
    }, [selectedId])


    return (
        <div className="details">
             {isLoading ? <Loader/> :
            <>
                <header>
                    <button onClick={handleCloseFilmDetails} className="btn-back">&larr;</button>
                    <img src={movie.Poster} alt={movie.Title}></img>

                    <div className="details-overview">
                        <h2>{movie.Title}</h2>
                        <p>🗓 {movie.Released}, 🕛 {movie.Runtime}</p>
                        <p>🎞 {movie.Genre}</p>
                        <p>⭐️ {movie.imdbRating}</p>
                    </div>
                </header>

                <section>
                    <div className="rating">
                        <StarRating maxRating={10} size={25}></StarRating>
                    </div>

                    <p><em>{movie.Plot}</em></p>
                    <p>{movie.Actors}</p>
                    <p>Directed by {movie.Director}</p>
                </section>
            </>
        }
        </div>
    )
}