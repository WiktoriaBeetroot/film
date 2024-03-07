import { useState } from "react";
import { FilmList } from "./FilmList";

export const ListBox = ({movies}) => {
    const [isOpen1, setIsOpen1] = useState(true);
    return (
    <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen1((open) => !open)}
        >
          {isOpen1 ? "–" : "+"}
        </button>
        {isOpen1 && (
          <FilmList movies={movies} />
        )}
      </div>
    )
}