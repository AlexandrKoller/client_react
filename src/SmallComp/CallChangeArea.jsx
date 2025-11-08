import { useState } from "react";

export default function CallAreaOfChange({ keyT, saveResponseFunction, tx }) {
  const [changed, setChange] = useState(false);
  const [someText, setSomeText] = useState({});

  const saveHendler = () => {
    let i = {};
    if (keyT == "Name") {
      if (someText["Name"].lastIndexOf(".") == -1) {
        i = {
          ...tx,
          ...someText,
          Name:
            someText["Name"] + tx["Name"].slice(tx["Name"].lastIndexOf(".")),
        };
      } else {
        i = { ...tx, ...someText };
      }
    } else {
      i = { ...tx, ...someText };
    }
    saveResponseFunction(i);
    setSomeText({});
  };
  return (
    <>
      <p>
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#" + keyT}
          aria-expanded="false"
          aria-controls={keyT}
          onClick={() => {
            changed ? setChange(false) : setChange(true);
          }}
        >
          {changed ? "Свернуть" : "Изменить"}
        </button>
      </p>
      <div className="collapse" id={keyT}>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="form-label"
          ></label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) => {
              someText[keyT] = e.target.value;
              setSomeText(someText);
              setChange(false);
            }}
          >
            {someText[keyT]}
          </textarea>
        </div>
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#" + keyT}
          aria-expanded="false"
          aria-controls={keyT}
          onClick={saveHendler}
        >
          Сохранить
        </button>
      </div>
    </>
  );
}
