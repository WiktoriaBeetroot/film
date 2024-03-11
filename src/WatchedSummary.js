export const WatchedSummary = ({watched, classOpen}) => {
    function average(arr) {
        return arr.reduce((prev, cur, i, arr) => prev + cur / arr.length, 0 ) 
    }

    function sum(arr) {
        return arr.reduce((prev, cur) => prev + cur, 0)
    }

    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const sumRuntime = sum(watched.map((movie) => movie.runtime));

    return (
        <div className={classOpen ? 'summary active' : 'summary hidden'}>
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{sumRuntime} min</span>
          </p>
        </div>
      </div>
    )
}