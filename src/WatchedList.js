import { WatchedItem } from "./WatchedItem"

export const WatchedList = ({watched, isOpen}) => {
    return (
        <ul className={`list ${isOpen ? 'active' : 'hidden'}`}>
        {watched.map((movie) => (
          <WatchedItem movie={movie} key={movie.imdbID}/>
        ))}
      </ul>
    )
}