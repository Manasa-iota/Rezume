import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import clsx from "clsx";

const routes = [
  { name: "Home", path: "/" },
  { name: "Upload", path: "/upload" },
  { name: "My Resumes", path: "/my-resumes" },
];

const Navbar = () => {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <header className="navbar border-b border-gray-200">
      <Link to="/" className="text-2xl font-bold text-gradient">
        REZUME
      </Link>
      <ul className="flex gap-6 text-sm md:text-base h-full items-center relative">
        {routes.map((route) => (
          <li
            key={route.name}
            className={clsx(
              "pb-1 relative transition hover:text-black",
              route.name=='Home' && "hidden sm:block",
              activePath === route.path
                ? "text-black"
                : "text-gray-400"
            )}
          >
            <Link to={route.path}>{route.name}</Link>
            {activePath === route.path && (
              <motion.div
                layoutId="navbar-underline"
                className="absolute bottom-0 left-0 h-[2px] w-full bg-[#a169e5]"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Navbar;
