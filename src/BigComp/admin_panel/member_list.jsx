import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import Member from "./member_card";
import LoadingComp from "../../pages/LoadingPage";
import HttpError from "../../SmallComp/Errors/BaseError";

export default function Members() {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const items = useSelector((state) => state.user_list);
  const urlGetUsers = import.meta.env.VITE_APP_SERVER_URL + "user/";
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!items.is_staff) return;
    (async () => {
      try {
        setError(null)
        setIsLoading(true)
        let res = await fetch(urlGetUsers, {
        method: "GET",
        headers: {
          Authorization: `Token ${items.token}`,
        },
      });
      let res1 = await res.json();
      if (!res.ok) {
        throw new Error(res.status);
      }
      setUsers(res1);
      setIsLoading(false)
      } catch (e) {
        if (e instanceof Error) {
          setError(e)
        };
      }
    })();
  }, []);

  if (!items.is_staff) {
    return <Navigate to="/" state={{ from: pathname }} />;
  }
  if (error) return <HttpError code={error.message}/>
  if (isLoading) return <LoadingComp/>
  return (
    <>
      <div className="container-fluid">
        <div className="container-fluid">
          {users.map((user) => (
            <div key={user.id}>
              <Member {...user} users={users} setUsers={setUsers}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
