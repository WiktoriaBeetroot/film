import { WatchedItem } from "./WatchedItem";
import { useBoxContext } from "./ListBox";

export const WatchedList = ({watched}) => {
  const { isOpen } = useBoxContext();
    return (
        <ul className={`list ${isOpen ? 'active' : 'hidden'}`}>
        {watched.map((movie) => (
          <WatchedItem movie={movie} key={movie.imdbID}/>
        ))}
      </ul>
    )
}