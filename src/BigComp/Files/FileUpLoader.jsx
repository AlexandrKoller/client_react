import { useState, useRef } from "react";
import { serverBackendUrl } from "../../../settings.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function FileUpLoader(files, setfiles) {
  const [form, setForm] = useState({
    fileName: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState();
  const url = serverBackendUrl + "file/";
  const ref = useRef(null);
  const items = useSelector((state) => state.user_list);
  const dispatch = useDispatch();

  const onFileUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    if (form.fileName) {
      if (form.fileName.lastIndexOf(".") == -1) {
        formData.append(
          "Name",
          form.fileName +
            selectedFile.name.slice(selectedFile.name.lastIndexOf(".")),
        );
      } else {
        formData.append("Name", form.fileName);
      }
    } else {
      formData.append("Name", selectedFile.name);
    }
    formData.append("FileDescription", form.description);
    formData.append("File", selectedFile, selectedFile.name);
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Token ${items.token}`,
        },
        body: formData,
      });
      let newfile = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      selectedFile(null);
      dispatch(items.file_count + 1);
    } catch (e) {
      if (e instanceof Error) setError(e);
    }
  };
  return (
    <>
      {/* <!-- Кнопка-триггер модального окна --> */}
      <button
        type="button"
        className="btn btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Загрузить файл
      </button>
      {/* <!-- Модальное окно --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Загрузите файл
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Закрыть"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <span className="input-group-text">Имя файла</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={selectedFile ? selectedFile.name : ""}
                    aria-label="Имя файла"
                    onChange={(e) => {
                      const fileData = { ...form, fileName: e.target.value };
                      setForm(fileData);
                    }}
                  />
                </div>
                <div className="input-group">
                  <span className="input-group-text">Описание</span>
                  <textarea
                    className="form-control"
                    aria-label="С текстовым полем"
                    onChange={(e) => {
                      const fileData = { ...form, description: e.target.value };
                      setForm(fileData);
                    }}
                  ></textarea>
                </div>
                <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Загрузка"
                    ref={ref}
                    onChange={(e) => {
                      setSelectedFile(e.target.files[0]);
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  ref.current.value = "";
                  setForm({ fileName: "", description: "" });
                  setSelectedFile(null);
                }}
              >
                Закрыть
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={onFileUpload}
              >
                Загрузить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
