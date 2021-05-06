import { useContext } from "react";
import { Context } from "../context";
import "./TableMarked.css";
import MarkedCell from "./MarkedCell";

const TableMarked = () => {
  const {
    markedHover,
    dragOverHandler,
    dropHandler,
    marked,
    sortMarked,
  } = useContext(Context);

  return (
    <div className="Table">
      <div className="Table__head">
        <p className="Table__head--title">Избранное</p>
      </div>
      <div
        className={`Table__body Marked ${markedHover}`}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e)}
      >
        <div>
          {marked.allIds.length
            ? marked.items
                .sort(sortMarked)
                .map((user) => <MarkedCell user={user} />)
            : null}
        </div>
      </div>
    </div>
  );
};

export default TableMarked;
