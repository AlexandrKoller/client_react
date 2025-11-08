import { useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserFile from "./File";
import { serverBackendUrl } from "../../../settings";
import FileUpLoader from "./FileUpLoader.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setFILE_COUNT } from "../../../contexts/redux/actions.js";

export default function Files() {
  const [files, setFiles] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const items = useSelector((state) => state.user_list);
  const dispatch = useDispatch();
  let urlGetfiles;
  if (!location.state) {
    urlGetfiles = serverBackendUrl + `file/`;
  } else {
    urlGetfiles = serverBackendUrl + `${location.state.path}`;
  }

  useEffect(() => {
    if (!items.token) return;
    (async () => {
      let res = await fetch(urlGetfiles, {
        method: "GET",
        headers: {
          Authorization: `Token ${items.token}`,
        },
      });
      let res1 = await res.json();
      setFiles(res1);
      dispatch(setFILE_COUNT(res1.lenth));
    })();
  }, []);

  if (!items.token) {
    return <Navigate to="/login" state={{ from: pathname }} />;
  }
  return (
    <div className="container-fluid">
      <FileUpLoader files={files} setfiles={setFiles} />
      <div className="container-fluid">
        {files.map((file) => (
          <div key={file.id}>
            <UserFile
              id={file.id}
              file={file.File}
              fileDescription={file.FileDescription}
              dateUpload={file.DateUpload}
              dateLastDownLoad={file.DateLastDownLoad}
              name={file.Name}
              loadcode={file.loadcode}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
