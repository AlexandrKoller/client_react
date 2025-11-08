import { useState, useEffect, useContext } from "react";
import CopyButtonWithFeedback from "../../SmallComp/CopyButton.jsx";
import CallAreaOfChange from "../../SmallComp/callChangeArea.jsx";
import { serverFrontendUrl, serverBackendUrl } from "../../../settings.js";
import { TokenContext } from "../../../contexts/TokenContext.js";
import { response } from "express";

export default function UserFile({
  member = false,
  id,
  loadcode = null,
  fileDescription,
  dateUpload,
  dateLastDownLoad,
  name,
}) {
  const urlByGetFile = "заглушка"; //file.slice(serverBackendUrl.length)
  const [error, setError] = useState();
  const token = useContext(TokenContext);
  const url = serverBackendUrl + `file/${id}/`;
  const [texts, setTexts] = useState({
    Name: name,
    FileDescription: fileDescription,
  });

  const deleteFile = async () => {
    try {
      bn;
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token.token.token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (e) {
      if (e instanceof Error) setError(e);
    }
  };
  const changeFile = async (value) => {
    try {
      let response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token.token.token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(value),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (e) {
      if (e instanceof Error) setError(e);
    }
  };

  const downloadFile = async () => {
    let loadURL;
    let loadData;
    if (loadcode) {
      loadURL = serverBackendUrl + "file/download_anon/";
      loadData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          loadcode: params.loadcode,
          info: false,
        }),
      };
    } else {
      loadURL = url;
      loadData = { method: "GET" };
    }
    try {
      let response = await fetch(loadURL, loadData);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (e) {
      if (e instanceof Error) setError(e);
    }
    const blob = await response.blob();
    let urlLoad = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.download = name;
    a.href = urlLoad;
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 500);
    window.open(url + "download/", "_blank");
  };
  if (!token) {
    return (
      <div className="card" style={{ width: "18rem;" }}>
        {/* <img src="..." className="card-img-top" alt="..."/> */}
        <div className="card-body">
          <h5 className="card-title">{texts["Name"]}</h5>
          <p className="card-text">Описание:{texts["FileDescription"]}</p>
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
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        {/* <img src="..." className="card-img-top" alt="..."/> */}
        <div className="card-body">
          <h5 className="card-title">{texts["Name"]}</h5>
          <CallAreaOfChange
            keyT={"Name"}
            saveResponseFunction={changeFile}
            tx={texts}
            tfc={setTexts}
          />
          <p className="card-text">Описание:{texts["FileDescription"]}</p>
          <CallAreaOfChange
            keyT={"FileDescription"}
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
            <footer className="blockquote-footer">Ссылка для скачивание</footer>
            <CopyButtonWithFeedback textToCopy={"hn"} />
          </blockquote>
          <button
            type="button"
            className="btn btn-primary"
            onClick={deleteFile}
          >
            Удалить файл
          </button>
        </div>
      </div>
    </>
  );
}
