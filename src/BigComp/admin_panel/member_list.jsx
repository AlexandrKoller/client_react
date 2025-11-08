import { useEffect, useState } from "react";
import { serverBackendUrl } from "../../../settings";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import Member from "./member_card";

export default function Members() {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const items = useSelector((state) => state.user_list);
  const dispatch = useDispatch();
  const urlGetUsers = serverBackendUrl + "/user";

  useEffect(() => {
    if (!items.is_staff) return;
    (async () => {
      let res = await fetch(urlGetUsers, {
        method: "GET",
        headers: {
          Authorization: `Token ${items.token}`,
        },
      });
      let res1 = await res.json();
      setUsers(res1);
    })();
  }, []);

  if (!items.is_staff) {
    return <Navigate to="/" state={{ from: pathname }} />;
  }
  return (
    <>
      <div className="container-fluid">
        <div className="container-fluid">
          {users.map((user) => (
            <div key={user.id}>
              <Member {...user} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
