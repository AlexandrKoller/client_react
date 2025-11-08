import { useState, useEffect } from "react";
import { serverBackendUrl } from "../../../settings";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setALL } from "../../../contexts/redux/actions";

export default function FormRegistration() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  });
  const [saveMarker, setSaveMarker] = useState(false);
  const [error, setError] = useState();
  const [errorMassage, setErrorMassage] = useState();
  const urlGetUser = serverBackendUrl + "user/";
  const urlGetToken = serverBackendUrl + "api-token-auth/";
  const location = useLocation();
  const pathname = location.pathname;
  const items = useSelector((state) => state.user_list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userDataRegistration"))) {
      setForm(JSON.parse(localStorage.getItem("userDataRegistration")));
    }
    return;
  }, []);

  const fetchData = async (event) => {
    event.preventDefault();
    const regExUserName = /^[A-Za-z0-9]{4,20}$/.test(`${form.username}`);
    const regExPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,20}$/.test(form.password);
    const regExEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,50}$/.test(form.email);
    if (!regExUserName) {
      setErrorMassage(<div>Имя содержит недопустимые символы</div>);
      return;
    }
    if (!regExPassword) {
      setErrorMassage(
        <div>
          Пароль должен быть длиной не менее 6 символов, содержать комбинацию
          прописных и строчных букв, цифр и специальных символов
        </div>,
      );
      return;
    }
    if (!regExEmail) {
      setErrorMassage(<div>Введите коррректный Email</div>);
      return;
    }
    try {
      let response = await fetch(urlGetUser, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      let userResult = await response.json();
      sessionStorage.setItem("user", JSON.stringify(userResult));
      let response1 = await fetch(urlGetToken, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      if (!response1.ok) {
        throw new Error(response1.statusText);
      }
      let tokenResult = await response1.json();
      if (saveMarker) {
        localStorage.setItem("user", JSON.stringify(userResult));
        localStorage.setItem("userToken", JSON.stringify(tokenResult));
      }
      sessionStorage.setItem("userToken", JSON.stringify(tokenResult));
      dispatch(setALL(userResult, tokenResult));
      setError();
    } catch (e) {
      if (e instanceof Error) setError(e);
    }
  };
  if (items.token) {
    return <Navigate to="/" state={{ from: pathname }} />;
  }
  return (
    <div>
      <form onSubmit={fetchData}>
        <label htmlFor="username">Имя пользователя:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={form.username}
          onChange={(e) => {
            const userDataRegistration = { ...form, username: e.target.value };
            localStorage.setItem(
              "userDataRegistration",
              JSON.stringify(userDataRegistration),
            );
            setForm(userDataRegistration);
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
            const userDataRegistration = { ...form, password: e.target.value };
            localStorage.setItem(
              "userDataRegistration",
              JSON.stringify(userDataRegistration),
            );
            setForm(userDataRegistration);
          }}
        />
        <label htmlFor="first_name">Имя:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={form.first_name}
          onChange={(e) => {
            const userDataRegistration = {
              ...form,
              first_name: e.target.value,
            };
            localStorage.setItem(
              "userDataRegistration",
              JSON.stringify(userDataRegistration),
            );
            setForm(userDataRegistration);
          }}
        />
        <label htmlFor="last_name">Фамилия:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={form.last_name}
          onChange={(e) => {
            const userDataRegistration = { ...form, last_name: e.target.value };
            localStorage.setItem(
              "userDataRegistration",
              JSON.stringify(userDataRegistration),
            );
            setForm(userDataRegistration);
          }}
        />
        <label htmlFor="email">E-mail:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={form.email}
          onChange={(e) => {
            const userDataRegistration = { ...form, email: e.target.value };
            localStorage.setItem(
              "userDataRegistration",
              JSON.stringify(userDataRegistration),
            );
            setForm(userDataRegistration);
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
        <button type="submit">Зарегестрироваться</button>
      </form>
      <div>{errorMassage}</div>
    </div>
  );
}
