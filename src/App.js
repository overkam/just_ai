import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Context } from "./context";
import TableSearch from "./components/TableSearch";
import TableMarked from "./components/TableMarked";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [requestData, setRequestData] = useState({});
  const [users, setUsers] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [marked, setMarked] = useState({ allIds: [], items: [] });
  const [dragUser, setDragUser] = useState(null);
  const [markedHover, setMarkedHover] = useState("");
  const [clearUser, setClearUser] = useState(null);

  const fakeUsers = (usersArr) => {
    usersArr.map(
      (user) =>
        (user.registered.age =
          user.registered.age * Math.trunc(Math.random() * Math.random() * 100))
    );
  };

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await axios.get(
          "https://randomuser.me/api/?results=5000"
        );

        setIsLoaded(true);
        setRequestData(data.results);
        // fakeUsers(data.results);
        setUsers(groupSorter(data.results));
      } catch (error) {
        setIsLoaded(true);
        setError(error);
      }
    }
    fetch();
  }, []);

  const groupSorter = (usersArr) => {
    let counter = 0;
    let left = 1;
    let right = 10;
    let groupedUsers = {};
    while (counter < usersArr.length - 1) {
      const group = left + "-" + right;
      usersArr.forEach((user, index) => {
        user.customId = Date.parse(user.registered.date);
        if (user.registered.age >= left && user.registered.age <= right) {
          if (groupedUsers[group]) {
            groupedUsers[group].data.push(user);
          } else {
            groupedUsers[group] = { data: [user], collapsed: false };
          }
          counter++;
        }
        if (index === usersArr.length - 1) {
          if (!groupedUsers[group]) groupedUsers[group] = { disabled: true };
          left += 10;
          right += 10;
        }
      });
    }
    return groupedUsers;
  };

  const collapse = (group) => {
    setUsers((prevState) => ({
      ...prevState,
      [group]: {
        data: [...users[group].data],
        collapsed: !users[group].collapsed,
      },
    }));
  };

  const deleteMarked = (user) => {
    setClearUser(
      marked.items[user.order] ? marked.items[user.order].customId : null
    );
    if (marked.allIds.includes(user.customId)) {
      setMarked((prevState) => ({
        ...prevState,
        allIds: marked.allIds.filter((id) => id !== user.customId),
        items: marked.items
          .map((item) => {
            if (user.order < item.order) {
              item.order--;
            }
            return item;
          })
          .filter((item) => item.customId !== user.customId),
      }));
    }
  };

  const search = (event) => {
    setSearchInput(event.target.value);
    const dataCopy = groupSorter(requestData);
    let result = {};
    Object.keys(dataCopy).map((group) => {
      if (dataCopy[group].data) {
        dataCopy[group].data.map((user) => {
          if (
            user.name.first
              .toLowerCase()
              .indexOf(event.target.value.toLowerCase()) !== -1 ||
            user.name.last
              .toLowerCase()
              .indexOf(event.target.value.toLowerCase()) !== -1
          ) {
            if (result[group]) {
              result[group].data.push(user);
            } else {
              result[group] = {
                data: [user],
                collapsed: dataCopy[group].collapsed,
              };
            }
          }
        });
      }
    });
    setUsers(result);
  };

  const dragStartHandler = (e, user) => {
    setDragUser(user);
    setMarkedHover("markedHover");
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e) => {
    setMarkedHover("");
    e.preventDefault();
    if (!marked.allIds.includes(dragUser.customId)) {
      dragUser.order = marked.items.length + 1;
      setMarked((prevState) => ({
        ...prevState,
        allIds: [...marked.allIds, dragUser.customId],
        items: [...marked.items, dragUser],
      }));
    }
  };

  const dragMarkedStart = (e, user) => {
    setDragUser(user);
  };

  const dropMarked = (e, user) => {
    e.preventDefault();
    setMarked((prevState) => ({
      ...prevState,
      items: marked.items.map((markedUser) => {
        if (user.order > dragUser.order) {
          if (
            markedUser.order <= user.order &&
            markedUser.order > dragUser.order
          ) {
            return { ...markedUser, order: markedUser.order - 1 };
          }
        } else {
          if (
            markedUser.order >= user.order &&
            markedUser.order < dragUser.order
          ) {
            return { ...markedUser, order: markedUser.order + 1 };
          }
        }
        if (markedUser.customId === dragUser.customId) {
          return { ...markedUser, order: user.order };
        }
        return markedUser;
      }),
    }));
  };

  const sortMarked = (a, b) => a.order - b.order;

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="loader"></div>;
  } else {
    return (
      <div className="App">
        <Context.Provider
          value={{
            search,
            searchInput,
            users,
            dragStartHandler,
            collapse,
            markedHover,
            dragOverHandler,
            dropHandler,
            marked,
            sortMarked,
            dragMarkedStart,
            dropMarked,
            clearUser,
            deleteMarked,
            setClearUser,
          }}
        >
          <TableSearch />
          <TableMarked />
        </Context.Provider>
      </div>
    );
  }
}

export default App;
