import { useLocation, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserFile from "./File";
import FileUpLoader from "./FileUpLoader.jsx";
import { useSelector } from "react-redux"
import ProgressBar from "../../SmallComp/Progress_bar/ProgressBar.jsx";
import LoadingComp from "../../pages/LoadingPage.jsx";
import HttpError from "../../SmallComp/Errors/BaseError.jsx";

export default function Files() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState();
  const location = useLocation();
  const pathname = location.pathname;
  const params = useParams()
  const items = useSelector((state) => state.user_list);
  const [isLoading, setIsLoading] = useState(false);
  let urlGetfiles;
  if (location.state | params.id) {
    urlGetfiles = import.meta.env.VITE_APP_SERVER_URL + `file/${params.id ? params.id : location.state.path}/memberfiles/`;
  } else {
    urlGetfiles = import.meta.env.VITE_APP_SERVER_URL + `file/`;
  }

  useEffect(() => {
    if (!items.token) return;
    (async () => {
      try {
      setError(null)
      setIsLoading(true)
      let res = await fetch(urlGetfiles, {
        method: "GET",
        headers: {
          Authorization: `Token ${items.token}`,
        },
      });
      let res1 = await res.json();
      if (!res.ok) {
        throw new Error(res.status);
      }
      setFiles(res1);
      setIsLoading(false)} 
      catch (e) {
        if (e instanceof Error) {
          setError(e)
        };
      }
    })();
  }, [urlGetfiles, ]);
  const fileList = files.map((file) => (
          <div key={file.id}>
            <UserFile id={file.id} file={file.File} fileDescription={file.FileDescription} dateUpload={file.DateUpload}
                dateLastDownLoad={file.DateLastDownLoad} name={file.Name} loadcode={file.loadcode} size={file.size} files={files} setFiles={setFiles}/>
          </div>
        ))
  if (!items.token) return <Navigate to="/login" state={{ from: pathname }} />;
  if (error) return <HttpError code={error.message}/>
  if (isLoading) return <LoadingComp/>
  
  return (
    <div className="container-fluid" style={{ width: "100%", height: '40px'}}>
      <FileUpLoader files={files} setFiles={setFiles}/>
      <ProgressBar current_size={items.size_storage}/>
    <div className="container-fluid" style={{ display: "flex", maxWidth: '75rem' }}>
        {fileList}
      </div>
    </div>
  );
}
