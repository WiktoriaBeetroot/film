import { WatchedItem } from "./WatchedItem"

export const WatchedList = ({watched, classOpen}) => {
    return (
        <ul className={classOpen ? 'list active' : 'list hidden'}>
        {watched.map((movie) => (
          <WatchedItem movie={movie} key={movie.imdbID}/>
        ))}
      </ul>
    )
}