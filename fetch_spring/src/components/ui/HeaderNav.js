import { NavLink } from "react-router-dom";

export default function HeaderNav() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            {/* <a href="/">Login</a> */}
            <NavLink to="/">Login</NavLink>
          </li>
          <li>
            {/* <a href="/articles">Articles</a> */}
            <NavLink to="/articles">Articles</NavLink>
          </li>
          <li>
            {/* <a href="/write">Write</a> */}
            <NavLink to="/write">Write</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
