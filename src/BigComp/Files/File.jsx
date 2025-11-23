import { useState } from "react";
import CopyButtonWithFeedback from "../../SmallComp/Buttons/CopyButton.jsx";
import CallAreaOfChange from "../../SmallComp/Buttons/CallChangeArea.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setFILE_COUNT } from "../../../contexts/redux/actions.js";
import DestroyButton from "../../SmallComp/Buttons/DestroyButton.jsx";
import HttpError from "../../SmallComp/Errors/BaseError.jsx";

export default function UserFile({
  id,
  loadcode = false,
  fileDescription,
  dateUpload,
  dateLastDownLoad,
  name,
  size,
  files, 
  setFiles
}) {
  const [error, setError] = useState(null);
  const url = import.meta.env.VITE_APP_SERVER_URL + `file/${id}/`;
  const urlByGetFile = import.meta.env.VITE_CLIENT_URL+ `file/download_anon/${loadcode}/`;
  const [texts, setTexts] = useState({
    Name: name,
    FileDescription: fileDescription,
  });
  const items = useSelector((state) => state.user_list);
  const dispatch = useDispatch();
  
  const deleteFile = async () => {
    try {
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${items.token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      dispatch(setFILE_COUNT(items.file_count - 1, items.size_storage - size));
      setFiles(files.filter(item => item.id != id))
    } catch (e) {
      if (e instanceof Error) setError(e);
    }
  };
  const changeFile = async (value) => {
    try {
      let response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${items.token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(value),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log(value)
      setTexts(value);
    } catch (e) {
      if (e instanceof Error) setError(e);
    }
  };
  const downloadFile = async () => {
    let loadURL;
    let loadData;
    let blob;
    if (!items.token) {
      loadURL = import.meta.env.VITE_APP_SERVER_URL + `file/download_anon/`;
      loadData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          loadcode: loadcode,
          info: false,
        }),
      };
    } else {
      loadURL = url + "download/";
      loadData = {
        method: "GET",
        headers: {
          Authorization: `Token ${items.token}`,
        },
      };
    }
    try {
      let response = await fetch(loadURL, loadData);
      if (!response.ok) {
        throw new Error(response.status);
      }
      blob = await response.blob();
    } catch (e) {
      setError(e)
    }
    let urlLoad = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.download = name;
    a.href = urlLoad;
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(urlLoad);
    }, 500);
  };
  if (error) return <HttpError code={error.message}/>
  if (items.token) {
    return (
      <>
        <div className="card" style={{ width: "24rem", margin: '1rem' }}>
          {/* <img src="..." className="card-img-top" alt="..."/> */}
          <div className="card-body">
            <h5 className="card-title">{texts["Name"]}</h5>
            <CallAreaOfChange
              keyT={`Name`}
              saveResponseFunction={changeFile}
              tx={texts}
            />
            <p className="card-text">Описание:{texts["FileDescription"]}</p>
            <CallAreaOfChange
              keyT={`FileDescription`}
              saveResponseFunction={changeFile}
              tx={texts}
              tfc={setTexts}
            />
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Загружен: {dateUpload}</li>
              <li className="list-group-item">
                Последнее скачивание {dateLastDownLoad}
              </li>
            </ul>
            <button
              type="button"
              className="btn btn-primary"
              onClick={downloadFile}
            >
              Скачать
            </button>
            <blockquote className="blockquote mb-0">
              <p>{urlByGetFile}</p>
              <footer className="blockquote-footer">
                Ссылка для скачивание
              </footer>
              <CopyButtonWithFeedback textToCopy={urlByGetFile} />
            </blockquote>
            <DestroyButton name={texts.Name} id={id} handler={deleteFile}/>
          </div>
        </div>
      </>
    );
  } else
    return (
      <div className="card" style={{ width: "18rem" }}>
        {/* <img src="..." className="card-img-top" alt="..."/> */}
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Описание:{fileDescription}</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Загружен: {dateUpload}</li>
          </ul>
          <button
            type="button"
            className="btn btn-primary"
            onClick={downloadFile}
          >
            Скачать
          </button>
        </div>
      </div>
    );
}
