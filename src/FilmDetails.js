import { useState, useEffect } from "react";
import { StarRating } from "./Star";
import { Loader } from "./Loader";
import { useBoxContext } from "./ListBox";

const KEY = '73aaaa6d';

export const FilmDetails = ({selectedId, handleCloseFilmDetails, handleAddWatchedFilm, watchedMovie}) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState();
    const { isOpen } = useBoxContext();

    const isWatched = watchedMovie.map((item) => item.imdbId).includes(selectedId);
    const watchedRating = watchedMovie.find((item) => item.imdbId === selectedId)?.userRating;

    const {
        Title : title,
        Year : year,
        Poster: poster,
        Runtime : runtime,
        imdbRating,
        Plot: plot,
        Released : released,
        Actors : actors,
        Director : director,
        Genre : genre,
    } = movie;

    function onSelectWacthed() {
        const newWatchedMview = {
            imdbId : selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
        }

        handleAddWatchedFilm(newWatchedMview)
        handleCloseFilmDetails()
        setUserRating(null)
    }

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
        <div className={`details  ${isOpen ? ' active' : 'hidden'}`}>
             {isLoading ? <Loader/> :
            <>
                <header>
                    <button onClick={handleCloseFilmDetails} className="btn-back">&larr;</button>
                    <img src={poster} alt={title}></img>

                    <div className="details-overview">
                        <h2>{title}</h2>
                        <p>🗓 {released}, 🕛 {runtime}</p>
                        <p>🎞 {genre}</p>
                        <p>⭐️ {imdbRating}</p>
                    </div>
                </header>

                <section>
                    {!isWatched ? (
                        <>
                            <div className="rating">
                                <StarRating maxRating={10} size={25} onSetRating={setUserRating}></StarRating>
                            </div>
                            {userRating > 0 ? (
                                <button className="btn-add" onClick={onSelectWacthed}>+ Add to watched list</button>
                                ) : (
                                <button className="btn-add" onClick={onSelectWacthed} disabled>+ Add to watched list</button>
                            )}
                        </>
                    ) : (
                        <p className="notify">❗️ This film was already added to your list <br></br><span>🌟 You have rate it by {watchedRating}</span></p>
                    )}
                    <p><em>{plot}</em></p>
                    <p>💁‍♀️ Actors: {actors}</p>
                    <p>🎞 Directed by {director}</p>
                </section>
            </>
        }
        </div>
    )
}