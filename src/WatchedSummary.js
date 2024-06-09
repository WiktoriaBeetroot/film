import { useBoxContext } from "./ListBox";

export const WatchedSummary = ({watched}) => {
    function average(arr) {
        return arr.reduce((prev, cur, i, arr) => prev + cur / arr.length, 0 ) 
    }

    function sum(arr) {
        return arr.reduce((prev, cur) => prev + cur, 0)
    }

    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const sumRuntime = sum(watched.filter((movie) => !isNaN(movie.runtime)).map((movie) => movie.runtime));
    const { isOpen } = useBoxContext();

    return (
        
        <div className={`summary ${isOpen ? 'active' : 'hidden'}`}>
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{Math.round(avgImdbRating)}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating.toFixed(1)}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{sumRuntime.toFixed(1)} min</span>
          </p>
        </div>
      </div>
    )
}