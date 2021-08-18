import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { MouseEventHandler } from "react";
import { isAuthenticated, signout } from "../lib/auth";

function Navbar() {
  const router = useRouter();

  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <NavItem href="/" text="Home" />
        <NavItem href="/cart" text="Cart" />

        {isAuthenticated() && (
          <NavItem href="/dashboard/user" text="Dashboard" />
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 ? (
          <NavItem href="/dashboard/admin" text="Admin Dashboard" />
        ) : null}
        {!isAuthenticated() && <NavItem href="/signup" text="Sign up" />}
        {!isAuthenticated() && <NavItem href="/signin" text="Sign in" />}
        {isAuthenticated() && (
          <li
            className="nav-item"
            onClick={() =>
              signout(() => {
                router.push("/");
              })
            }
          >
            <a className="nav-link" style={{ color: "grey" }}>
              Signout
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

function NavItem({
  href,
  text,
  onClick,
}: {
  href: string;
  text: string;
  onClick?: MouseEventHandler<HTMLLIElement>;
}) {
  const router = useRouter();

  return (
    <li className="nav-item" onClick={onClick}>
      <Link href={href}>
        <a
          className="nav-link"
          style={{
            color: router.pathname === href ? "yellowgreen" : "grey",
          }}
        >
          {text}
        </a>
      </Link>
    </li>
  );
}

export default Navbar;
