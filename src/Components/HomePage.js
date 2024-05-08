import React, { useEffect, useState } from "react";
import "../CSS/HomePage.css";
import { connect } from "react-redux";
import Store from "../Store/Store";
import {
  AddfileStorage,
  DeletefileStorage,
  SetfileStorage,
} from "../Action/Action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { v4 as uuidv4 } from "uuid";

const HomePage = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);

  const [file_state, Set_file_state] = useState([]);

  const [current_f, Set_current_f] = useState(null);

  function selectFiles() {
    // Dosya girişini tetikle
    document.getElementById("fileInput").click();
  }

  const addF_F = (_type) => {
    //add file or folder to redux
    try {
      if (_type !== null) {
        if (_type === "file") {
          Set_file_state((prevState) => [...prevState, current_f]);
          Store.dispatch(AddfileStorage(current_f));
        } else {
          Set_file_state((prevState) => [...prevState, current_f]);
          Store.dispatch(AddfileStorage(current_f));
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      Set_current_f(null);
      document.querySelector("section.section").classList.remove("dark");
      setSelectedDate(null);
      setSelectedDate2(null);
    }
  };

  const copyText = async (e) => {
    let text =
      e.target.parentElement.parentElement.firstElementChild.textContent;
    console.log(text);
    await navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    console.log(props.file_folder);
    Set_file_state(props.file_folder);
  }, [props.file_folder]);

  const selectFolder = async () => {
    try {
      if (selectedDate !== null && selectedDate2 !== null) {
        const folderHandle = await window.showDirectoryPicker();
        const folderName = folderHandle.name;

        let obj = {
          name: folderName,
          id: uuidv4(),
          type: "folder",
          date1: selectedDate,
          date2: selectedDate2,
        };

        Set_current_f(obj);
        document.querySelector("section.section").classList.toggle("dark");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeFile = () => {
    let file_value = document.getElementById("fileInput").value;
    if (file_value !== "" && selectedDate !== null && selectedDate2 !== null) {
      var ilkSlashIndex = file_value.indexOf("h");
      var ilknokta = file_value.indexOf(".");

      file_value = file_value.substring(ilkSlashIndex + 2, ilknokta + 4);
      console.log(file_value);

      let obj = {
        name: file_value,
        id: uuidv4(),
        type: "file",
        date1: selectedDate,
        date2: selectedDate2,
      };

      Set_current_f(obj);
      document.querySelector("section.section").classList.toggle("dark");
    }
  };

  const delete_item = (e) => {
    let id_ = e.target.parentElement.parentElement.id;
    Store.dispatch(DeletefileStorage(id_));
  };

  const close_confirmpopup = () => {
    document.querySelector("section.section").classList.remove("dark");
    Set_current_f(null);
    setSelectedDate(null);
    setSelectedDate2(null);
  };

  return (
    <main>
      {current_f !== null && (
        <div className="onay confirm_pop_up">
          <div className="top">
            <div>Upload {current_f.type}</div>
            <div>
              <i
                onClick={close_confirmpopup}
                style={{
                  scale: "1.25",
                  color: "brown",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                className="fa fa-times"
              ></i>
            </div>
          </div>
          <div className="bottom">
            <div className="left">
              <i className={`fa-solid fa-${current_f.type}`}></i>
            </div>
            <div className="right">
              <p>
                <span
                  onClick={() => {
                    addF_F(current_f.type);
                  }}
                  style={{
                    textDecoration: "underline",
                    fontWeight: "600",
                    color: "rgb(10,10,10)",
                  }}
                >
                  Click the upload a{" "}
                </span>
                {current_f.type}
              </p>
              <p className="max_size_info">Max size is 25GB</p>
            </div>
          </div>
        </div>
      )}
      <section className="section">
        <div className="card">
          <div className="card-header">
            <div className="left">
              <span>Files</span>
              <p>Upload,pin by CID and manage your files</p>
            </div>
            <div className="right">
              <input
                onChange={onChangeFile}
                type="file"
                className="fileInputt"
                id={"fileInput"}
                style={{
                  opacity: "0",
                  position: "absolute",
                  left: "100%",
                  bottom: "100%",
                }}
                multiple
              />

              <button>
                <i class="fa-solid fa-thumbtack"></i> <p>Pin by CID</p>
              </button>
              <button
                onClick={selectFolder}
                className="upload_folder_btn"
                style={{
                  fontSize: "13px",
                  borderColor: "rgb(237,188,69)",
                  left: "-126px",
                }}
              >
                <i id="folder_upload_i" class="fa-solid fa-upload"></i>{" "}
                <p
                  id="folder_upload_text"
                  style={{
                    position: "relative",
                    right: "12px",
                    fontWeight: "600",
                    minWidth: "100px",
                    display: "block",
                  }}
                >
                  Upload Folder
                </p>
              </button>
              <button
                style={{ marginLeft: "8px", fontSize: "13px" }}
                onClick={selectFiles}
              >
                <i
                  style={{ marginRight: "8px" }}
                  class="fa-solid fa-upload"
                ></i>{" "}
                <p
                  style={{
                    position: "relative",
                    fontWeight: "600",
                    right: "8px",
                  }}
                >
                  Upload File
                </p>
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="input-group">
              <input
                type="text"
                className="search-bar search-cid"
                placeholder="search by name or CID"
              />
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd.MM.yyyy"
                placeholderText="Start Date"
              />
              <DatePicker
                selected={selectedDate2}
                onChange={(date) => setSelectedDate2(date)}
                dateFormat="dd.MM.yyyy"
                placeholderText="End Date"
              />

              <button>
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="card-footer">
            <ul>
              {file_state.map((item, index) => {
                console.log(item);
                return (
                  <li id={item.id} className="list_items">
                    <div className="left">
                      <div className="left_1_1">
                        <i class={`fa-solid fa-${item.type}`}></i>
                      </div>
                      <div className="left1_2">
                        <h5>{item.name}</h5>
                        <div className="bottom">
                          <p>1.51 MB -</p>
                          <p> 5/4/2024</p>
                        </div>
                      </div>
                    </div>
                    <div className="middle">
                      <div className="text">Hnıdw...PucYRs</div>
                      <div onClick={copyText} className="copy">
                        <i
                          style={{ scale: "1.4", color: "rgb(60,0,60)" }}
                          class="fa-solid fa-copy"
                        ></i>
                      </div>
                    </div>
                    <div className="right">
                      <i class="fa-solid fa-edit"></i>
                      <i onClick={delete_item} class="fa-solid fa-trash"></i>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};
//<i class="fa-solid fa-file"></i>

const MapStateToProps = (state) => {
  return {
    file_folder: state.project_reducer.file_folder,
  };
};
export default connect(MapStateToProps)(HomePage);
