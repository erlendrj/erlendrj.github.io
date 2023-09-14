import { Outlet, Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const PrivateRoutes = () => {
  /**This should be changed a little to make it more secure */
  let token = false;

  /**Stores the user in local storage hashed such that XSS is at least a huge computational effort*/
  const user = secureLocalStorage.getItem("user");
  if (user === "Erlend") {
    token = true;
  }
  /**This component either routes to admin if token is true, else it routes back to the login page. This is to avoid
   * that anyone can enter /admin in the url of the browser, and access the admin page.
   * The code below can be read as if token: <Outlet />, else <Navigate />
   * */
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
