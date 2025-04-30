import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/axios";
import { removeUser } from "../redux/userSlice";
import { useQueryClient } from "@tanstack/react-query";

const NavBar = () => {
  const user = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      queryClient.removeQueries({ queryKey: ["user"] });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
      // navigate("/signup");
    }
  };

  return (
    <div className="bg-base-200">
      <div className="navbar max-w-5xl mx-auto rounded-full bg-base-100 shadow-lg my-4 px-6">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-bold">
              Match For Geeks
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          {user && (
            <ul className="menu menu-horizontal px-1 gap-2">
              <li>
                <Link to="/connections" className="rounded-full">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="rounded-full">
                  Requests
                </Link>
              </li>
            </ul>
          )}
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm hidden md:inline-block">
                Welcome, {user.firstName}!
              </span>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-circle btn-ghost avatar"
                >
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      alt="Profile"
                      src={
                        user.photoUrl ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile" className="rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Profile
                      <span className="badge badge-sm badge-primary">New</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="rounded-lg text-error"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                      </svg>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-ghost btn-sm rounded-full">
                Login In
              </Link>
              <a
                href="#SingUpFrom"
                className="btn btn-primary btn-sm rounded-full"
              >
                Join Now
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
