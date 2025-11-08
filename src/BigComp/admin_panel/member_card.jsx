import { useEffect, useState } from "react";
import { serverBackendUrl } from "../../../settings";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Member(params) {
  const id = params.id;
  const last_login = params.last_login;
  const username = params.username;
  const first_name = params.first_name;
  const last_name = params.last_name;
  const email = params.email;
  const is_staff = params.is_staff;
  const [user, setUser] = useState({
    id: id,
    username: username,
    last_name: last_name,
    first_name: first_name,
    email: email,
    is_staff: is_staff,
    last_login: last_login,
    size_storage: params.SizeStorage,
    file_count: params.FileCount,
  });
  const [error, setError] = useState();
  const items = useSelector((state) => state.user_list);
  const dispatch = useDispatch();
  const url = serverBackendUrl + `user/${user.id}/`;

  const removeChangesHandler = () => {
    setUser({
      id: id,
      username: username,
      last_name: last_name,
      first_name: first_name,
      email: email,
      is_staff: is_staff,
      last_login: last_login,
    });
  };

  const saveHendler = async () => {
    try {
      let response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${items.token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (e) {
      if (e instanceof Error) setError(e);
    }
  };
  const deleteMember = async () => {
    try {
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${items.token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log(response.json)
    } catch (e) {
      console.log(e)
      if (e instanceof Error) setError(e);
    }
  };

  const adminMarker = () => {
    if (items.is_staff) {
      return (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            checked={user.is_staff}
            onChange={(e) => setUser({ ...user, is_staff: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            Администратор
          </label>
        </div>
      );
    }
  };
  return (
    <>
      <div className="card" style={{ width: "36rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            Пользователь: {username} ID: {id}
          </h5>
          <div className="input-group">
            <span className="input-group-text">Имя и фамилия</span>
            <input
              type="text"
              aria-label="Имя"
              className="form-control"
              value={user.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            />
            <input
              type="text"
              aria-label="Фамилия"
              className="form-control"
              value={user.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            />
          </div>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            E-mail:
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Пример размера поля ввода"
            aria-describedby="inputGroup-sizing-default"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
        </div>
        <p className="card-text">{last_login}</p>
        <h6 className="card-title">
          Всего файлов: {user.file_count} Объем хранилища: {user.size_storage}
        </h6>
        {adminMarker()}
        <div className="card-body">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={removeChangesHandler}
          >
            Сбросить
          </button>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={saveHendler}
          >
            Сохранить
          </button>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={deleteMember}
          >
            Удалить
          </button>
          <Link
            to={"/memberfiles"}
            state={{ path: `file/${user.id}/memberfiles/` }}
            role="button"
            className="btn btn-outline-dark"
            label={"К хранилищу"}
          >
            {"К хранилищу"}
          </Link>
        </div>
      </div>
    </>
  );
}
