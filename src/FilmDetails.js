import { useState, useEffect, useRef } from "react";
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

    const refCount = useRef(0);

    useEffect(function() {
        if (userRating) {
            refCount.current = refCount.current + 1;
        }
    }, [userRating])

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
            refUserRatig: refCount.current,
        }

        handleAddWatchedFilm(newWatchedMview)
        handleCloseFilmDetails()
        setUserRating(null)
    }

    useEffect(function() {
        function callback(e) {
            if(e.code === 'Escape') {
                handleCloseFilmDetails()
            } 
        }

        document.addEventListener('keydown', callback)

        return function() {
            document.removeEventListener('keydown', callback)
        }
    }, [handleCloseFilmDetails])

    useEffect(function() {
        async function getMovieDetails() {
            setIsLoading(true)
            try{
                const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
                const data = await res.json();
                setMovie(data)
                setIsLoading(false)
            }catch(err) {
                console.error(err.message)
            }
        }
        getMovieDetails()
    }, [selectedId])

    useEffect(function() {
        if (!title) {
            return
        }

        document.title = `Film | ${title}`

        return function() {
            document.title = 'usePopcorn';
        }
    }, [title])

    return (
        <div className={`details  ${isOpen ? ' active' : 'hidden'}`}>
             {isLoading ? <Loader/> :
            <>
                <header>
                    <button onClick={handleCloseFilmDetails} className="btn-back">&larr;</button>
                    {poster !== 'N/A' ? (
                            <img src={poster} alt={`${title} poster`} />
                        ) : (
                            <img src={`${process.env.PUBLIC_URL}/images/default_image.jpeg`} alt="default_image"></img>
                    )}

                    <div className="details-overview">
                        <h2>{title}</h2>
                        {(released !== 'N/A' && runtime !== 'N/A') &&
                            <p>🗓 {released}, 🕛 {runtime}</p>
                        }
                        
                        {genre !== 'N/A' && 
                            <p>🎞 {genre}</p>
                        }

                        {imdbRating !== 'N/A' &&
                            <p>⭐️ {imdbRating}</p>
                        }
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
                    {plot !== 'N/A' &&
                        <p><em>{plot}</em></p>
                    }

                    {actors !== 'N/A' && 
                        <p>💁‍♀️ Actors: {actors}</p>
                    }

                    {director !== 'N/A' && 
                        <p>🎞 Directed by {director}</p>
                    }
                </section>
            </>
        }
        </div>
    )
}