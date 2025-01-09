import { Link } from "react-router-dom";
import { useAuthStore } from "../zustand/useAuthStore";
import { LogOut, MessageSquareText, Settings, User } from "lucide-react";
import LogoutModal from "./LogoutModal";

function Navbar({ modalDisplay }) {
  const { authUser } = useAuthStore();

  return (
    <>
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 
    z-40 backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquareText className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chat App</h1>
            </Link>
          </div>

          <div className="flex justify-center gap-2">
            <Link
              to="/settings"
              className="btn btn-sm gap-1 transition-colors"
            >
              <Settings className="size-4" />
              <span className="hidden sm:inline py-2 tooltip tooltip-bottom" data-tip="settings">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm gap-1">
                  <User className="size-5" />
                  <span className="hidden sm:inline py-2 tooltip tooltip-bottom" data-tip="profile">Profile</span>
                </Link>

                <button className="flex gap-1 items-center btn btn-sm" onClick={modalDisplay}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline py-2 tooltip tooltip-bottom" data-tip="logout">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      </header>
      <LogoutModal />
    </>
  );
}

export default Navbar;
