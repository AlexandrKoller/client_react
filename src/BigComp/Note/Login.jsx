import { useState } from "react";
import { serverBackendUrl } from "../../../settings";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setALL } from "../../../contexts/redux/actions";

export default function FormLogin() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [saveMarker, setSaveMarker] = useState(false);
  const [error, setError] = useState();
  const [errorMassage, setErrorMassage] = useState();
  const url = serverBackendUrl + "api-token-auth/";
  const urlGetUser = serverBackendUrl + "user/";
  const location = useLocation();
  const pathname = location.pathname;
  const items = useSelector((state) => state.user_list);
  const dispatch = useDispatch();

  const fetchData = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form),
      });
      let resultToken = await response.json();
      if (resultToken.non_field_errors) {
        setErrorMassage(<div>Пароль похоже не верный, попробуйте еще раз</div>);
      }
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      if (saveMarker) {
        localStorage.setItem("userToken", JSON.stringify(resultToken));
      }
      sessionStorage.setItem("userToken", JSON.stringify(resultToken));
      response = await fetch(urlGetUser, {
        headers: { Authorization: `Token ${resultToken.token}` },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      let resultUser = await response.json();
      const filred = resultUser.filter(
        (item) => item.username == form.username,
      );
      if (saveMarker) {
        localStorage.setItem("user", JSON.stringify(filred[0]));
      }
      sessionStorage.setItem("user", JSON.stringify(filred[0]));
      dispatch(setALL(filred[0], resultToken));
      setError();
    } catch (e) {
      if (e instanceof Error) setError(e);
    }
  };
  if (items.token) {
    return <Navigate to="/" state={{ from: pathname }} />;
  }
  return (
    <>
      <div>
        <form onSubmit={fetchData}>
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={(e) => {
              const userData = { ...form, username: e.target.value };
              localStorage.setItem("userData", JSON.stringify(userData));
              setForm(userData);
            }}
          />
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="on"
            value={form.password}
            onChange={(e) => {
              const userData = { ...form, password: e.target.value };
              setForm(userData);
            }}
          />
          <label htmlFor="newsletter">Запомнить меня</label>
          <input
            type="checkbox"
            id="newsletter"
            name="newsletter"
            onChange={() => {
              saveMarker ? setSaveMarker(false) : setSaveMarker(true);
            }}
          />
          <button type="submit">Войти</button>
        </form>
        {errorMassage}
      </div>
    </>
  );
}
