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
      navigate("/login");
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm ">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          Match For Geeks
        </Link>
      </div>
      <div className="flex gap-2 mx-6 items-center">
        {user && <p>{user.firstName}</p>}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  user
                    ? user.photoUrl
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
