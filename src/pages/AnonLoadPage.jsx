import UserFile from "../BigComp/Files/File";
import { serverBackendUrl } from "../../settings";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

export const AnonDownLoad = () => {
  const urlGetfiles = serverBackendUrl + "file/download_anon/";
  let params = useParams();
  const [file, setFiles] = useState({});
  const loadJson = {
    loadcode: params.loadcode,
    info: true,
  };
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    (async () => {
      let res = await fetch(urlGetfiles, {
        method: "POST",
        body: JSON.stringify(loadJson),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      let res1 = await res.json();
      setFiles(res1);
    })();
    return;
  }, []);
  if (file.detail) {
    return <Navigate to="*" state={{ from: pathname }} />;
  }
  if (
    !/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/.test(
      params.loadcode,
    )
  ) {
    return <Navigate to="*" state={{ from: pathname }} />;
  }
  return (
    <div>
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
  );
};
