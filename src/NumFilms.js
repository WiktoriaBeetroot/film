export const NumFilm = ({movies}) => {
    return (
    <p className="num-results">
        Found <strong>{movies.length}</strong> {movies.length <= 0 ? 'result' : 'results'}
      </p>
    )
}