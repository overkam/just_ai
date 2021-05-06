import { useContext } from "react";
import { Context } from "../context";
import "./SearchCell.css";

const SearchCell = (props) => {
  const { searchInput, dragStartHandler } = useContext(Context);

  return (
    <div
      className="Table__cell"
      onDragStart={(e) => dragStartHandler(e, props.user)}
      draggable={true}
      key={Date.parse(props.user.registered.date)}
    >
      <img alt='#' src={props.user.picture.thumbnail} />
      <div>
        <p className="Table__cell--info">
          {searchInput &&
          props.user.name.first
            .toLowerCase()
            .indexOf(searchInput.toLowerCase()) !== -1 ? (
            <>
              {props.user.name.first.slice(
                0,
                props.user.name.first
                  .toLowerCase()
                  .indexOf(searchInput.toLowerCase())
              )}
              <span className="bold">
                {props.user.name.first.slice(
                  props.user.name.first
                    .toLowerCase()
                    .indexOf(searchInput.toLowerCase()),
                  props.user.name.first
                    .toLowerCase()
                    .indexOf(searchInput.toLowerCase()) + searchInput.length
                )}
              </span>
              {props.user.name.first.slice(
                props.user.name.first
                  .toLowerCase()
                  .indexOf(searchInput.toLowerCase()) + searchInput.length
              )}
            </>
          ) : (
            props.user.name.first
          )}{" "}
          {searchInput &&
          props.user.name.last
            .toLowerCase()
            .indexOf(searchInput.toLowerCase()) !== -1 ? (
            <>
              {props.user.name.last.slice(
                0,
                props.user.name.last
                  .toLowerCase()
                  .indexOf(searchInput.toLowerCase())
              )}
              <span className="bold">
                {props.user.name.last.slice(
                  props.user.name.last
                    .toLowerCase()
                    .indexOf(searchInput.toLowerCase()),
                  props.user.name.last
                    .toLowerCase()
                    .indexOf(searchInput.toLowerCase()) + searchInput.length
                )}
              </span>
              {props.user.name.last.slice(
                props.user.name.last
                  .toLowerCase()
                  .indexOf(searchInput.toLowerCase()) + searchInput.length
              )}
            </>
          ) : (
            props.user.name.last
          )}
          , registred date:{" "}
          {props.user.registered.date
            .split("T")[0]
            .split("-")
            .reverse()
            .join(".")}
        </p>
        <p className="Table__cell--email">Email {props.user.email}</p>
      </div>
    </div>
  );
};

export default SearchCell;
