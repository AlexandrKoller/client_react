import { TokenContext } from "../../contexts/TokenContext";
import { useContext, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setALL } from "../../contexts/redux/actions";

export default function Exit() {
  const location = useLocation();
  const pathname = location.pathname;
  const items = useSelector((state) => state.user_list);
  const dispatch = useDispatch();

  localStorage.removeItem("userToken");
  localStorage.removeItem("user");
  sessionStorage.removeItem("userToken");
  sessionStorage.removeItem("user");
  useEffect(() => {
    dispatch(
      setALL(
        {
          token: "",
          username: "",
          last_name: "",
          fist_name: "",
          email: "",
          is_staff: false,
        },
        {},
      ),
    );
  }, []);

  return <Navigate to="/" state={{ from: pathname }} />;
}
