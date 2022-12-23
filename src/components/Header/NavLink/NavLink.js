import { Link, useMatch, useResolvedPath } from "react-router-dom";

const NavLink = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        to={to}
        className={`${props.className} ${match ? props.activeClass : ""}`}
      >
        {children}
      </Link>
    </div>
  );
};

export default NavLink;
