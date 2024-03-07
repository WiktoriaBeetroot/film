import { useState } from "react";
import {tempWatchedData} from './data';
import { WatchedSummary } from "./WatchedSummary";
import { WatchedList } from "./WatchedList";

export const WatchBox = () => {
    const [isOpen2, setIsOpen2] = useState(true);
    const [watched, setWatched] = useState(tempWatchedData);

    return (
        <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen2((open) => !open)}
        >
          {isOpen2 ? "–" : "+"}
        </button>
        {isOpen2 && (
          <>
           <WatchedSummary watched={watched}/>

            <WatchedList watched={watched}/>
          </>
        )}
      </div>
    )
}