import { useContext } from "react";
import { Context } from "../context";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "./TableSearch.css";
import minus from "../icons/minus.svg";
import plus from "../icons/plus.svg";
import SearchCell from "./SearchCell";

const TableSearch = () => {
  const { search, searchInput, users, collapse } = useContext(Context);

  const useStyles = makeStyles(() => ({
    root: {
      "& .MuiOutlinedInput-input": {
        width: "200px",
        height: "25px",
        fontSize: "20px",
        padding: "5px",
      },
    },
  }));
  const classes = useStyles();

  return (
    <div className="Table">
      <div className="Table__head">
        <p className="Table__head--title">Поиск</p>
        <TextField
          className={classes.root}
          onChange={search}
          value={searchInput}
          id="outlined-search"
          type="search"
          variant="outlined"
        />
      </div>
      <div className="Table__body">
        {Object.keys(users).length ? (
          Object.keys(users).map((group) => (
            <>
              <div
                className={
                  users[group].disabled
                    ? "Table__body--disabled"
                    : "Table__body--group"
                }
                onClick={users[group].disabled ? null : () => collapse(group)}
              >
                <div>{group}</div>
                {users[group].disabled ? null : (
                  <img
                    id="plus"
                    src={users[group].collapsed ? plus : minus}
                    alt="#"
                  />
                )}
              </div>
              {!users[group].collapsed && !users[group].disabled
                ? users[group].data.map((user) => <SearchCell user={user} />)
                : null}
            </>
          ))
        ) : (
          <div className="Table__body--placeholder">
            <p>Совпадений не найдено</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableSearch;
