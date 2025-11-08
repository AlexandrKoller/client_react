import NavItem from "./NavItem";

import { useSelector, useDispatch } from "react-redux";

export default function Nav() {
  const items = useSelector((state) => state.user_list);
  const dispatch = useDispatch();

  const navItems = [{ label: "Главная", link: "/" }];
  if (items.token) {
    navItems.push({ label: "Мои Файлы", link: "/files" });
    if (items.is_staff) {
      navItems.push({ label: "Пользователи", link: "/members" });
    }
    navItems.push({ label: "Выйти", link: "/exit" });
  }
  if (!items.token) {
    navItems.push({ label: "Войти", link: "/login" });
    navItems.push({ label: "Зарегистрироваться", link: "/registration" });
  }
  const active = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");
  return (
    <nav
      className="navbar bg-dark navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {navItems.map(({ label, link }) => (
          <NavItem key={label} label={label} isActive={active} link={link} />
        ))}
      </ul>
    </nav>
  );
}
