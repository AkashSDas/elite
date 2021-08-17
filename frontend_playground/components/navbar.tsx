import { useRouter } from "next/dist/client/router";
import Link from "next/link";

function Navbar() {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <NavItem href="/" text="Home" />
        <NavItem href="/cart" text="Cart" />
        <NavItem href="/dashboard/user" text="Dashboard" />
        <NavItem href="/dashboard/admin" text="A Dashboard" />
        <NavItem href="/signup" text="Sign up" />
        <NavItem href="/signin" text="Sign in" />
        <NavItem href="/signout" text="Signout" />
      </ul>
    </div>
  );
}

function NavItem({ href, text }: { href: string; text: string }) {
  const router = useRouter();

  return (
    <li className="nav-item">
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
