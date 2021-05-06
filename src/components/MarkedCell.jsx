import { useContext } from "react";
import { Context } from "../context";
import "./MarkedCell.css";
import trashCan from "../icons/trashCan.svg";

const MarkedCell = (props) => {
  const {
    dragMarkedStart,
    dropMarked,
    clearUser,
    deleteMarked,
    setClearUser,
  } = useContext(Context);

  return (
    <div
      onDragStart={(e) => dragMarkedStart(e, props.user)}
      onDrop={(e) => dropMarked(e, props.user)}
      draggable={true}
      className={`Table__cell markedAppear ${
        clearUser === props.user.customId ? "clearUser" : null
      }`}
    >
      <img alt="#" src={props.user.picture.thumbnail} />
      <div className="Table__cell--card">
        <div>
          <p className="Table__cell--info">
            {props.user.name.first} {props.user.name.last}, registered date:{" "}
            {props.user.registered.date
              .split("T")[0]
              .split("-")
              .reverse()
              .join(".")}
          </p>
          <p className="Table__cell--email">Email {props.user.email}</p>
        </div>
        <img
          id="clear"
          alt="#"
          src={trashCan}
          onClick={() => deleteMarked(props.user)}
          onMouseEnter={() => setClearUser(props.user.customId)}
          onMouseLeave={() => setClearUser(null)}
        />
      </div>
    </div>
  );
};

export default MarkedCell;
