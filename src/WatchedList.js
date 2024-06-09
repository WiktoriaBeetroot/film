import { WatchedItem } from "./WatchedItem";
import { useBoxContext } from "./ListBox";

export const WatchedList = ({watched, handleRemoveWatchedFilm}) => {
  const { isOpen } = useBoxContext();
    return (
        <ul className={`list ${isOpen ? 'active' : 'hidden'}`}>
        {watched.map((movie) => (
          <WatchedItem movie={movie} key={`${movie.imdbID}-watched}`} handleRemoveWatchedFilm={handleRemoveWatchedFilm}/>
        ))}
      </ul>
    )
}