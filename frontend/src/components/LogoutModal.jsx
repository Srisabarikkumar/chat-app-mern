import { useAuthStore } from "../zustand/useAuthStore";

function LogoutModal() {
  const { logout } = useAuthStore();

  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Logout</h3>
          <p className="py-4">
            Do you want to logout?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="flex justify-center gap-2">
                <button className="btn btn-sm btn-primary" onClick={logout}>Logout</button>
                <button className="btn btn-sm bg-base-300">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default LogoutModal;
