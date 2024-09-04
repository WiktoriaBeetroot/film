import { useState, useEffect } from "react";
const KEY = '73aaaa6d';

export function useMovie(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(function () {
        let controller = new AbortController();
        async function fetchMovies() {
          try {
            setIsLoading(true);
            setErrorMessage('');
            const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal});
    
            if (!res.ok) {
              throw new Error('Something went wrong while fetching data')
            }
    
            const data = await res.json();
    
            if (data.Response === 'False') {
              throw new Error('Nothing is found')
            }
       
            setMovies(data.Search)
            setErrorMessage('')
          }catch(err) {
            if (err.name !== "AbortError") {
              console.error(err.message)
              setErrorMessage(err.message)
            }
          }finally {
            setIsLoading(false)
          }
        }
        if (!query.length) {
          setMovies([]);
          setErrorMessage('');
          return
        }

        // handleCloseFilmDetails();
        fetchMovies();
        // Clean up data fetching
        return function() {
          controller.abort();
        }
      }, [query])

      return {movies, isLoading, errorMessage};
}