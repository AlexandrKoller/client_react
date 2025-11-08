import { NavLink } from "react-router-dom";

export default function NavItem({ label, link, isActive }) {
  return (
    <li className="nav-item">
      <NavLink to={link} className={isActive} role="button">
        {label.toUpperCase()}
      </NavLink>
    </li>
  );
}
