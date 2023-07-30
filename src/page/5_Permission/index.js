import React, { useRef, useState, useEffect } from "react";

import "../../css/saas.css";

import Sidebar from "../../components/Sidebar";

import API_URL from "../../config";

const Permission = () => {
    /*--------------add personnel--------------*/
    // const addpersonnel = document.getElementById("addpersonnel");  //訂閱畫面
    // const psn_open = document.getElementById("psn_open");  //開啟訂閱畫面的按鈕
    // const psn_close = document.getElementById("psn_close");  //關閉訂閱畫面的X
    const addpersonnel = useRef();

    /*在一般畫面中點選某區塊可開啟dialog畫面 */
    function opendialog(dialogscreen) {
        dialogscreen.current.showModal();
        fadeIn(dialogscreen);
    }

    /*在dialog畫面中點選 X 可關閉dialog畫面 */
    function closedialog(dialogscreen) {
        // var inputElement = document.querySelector('input');
        // inputElement.value = '';
        dialogscreen.current.style.opacity = 0;
        dialogscreen.current.close();
    }

    /*開啟dialog視窗時會有動畫浮現的效果*/
    const intervalTime = 20; // 每隔10毫秒增加不透明度
    const maxOpacity = 1; // 最大不透明度
    function fadeIn(dialog) {
        let opacity = 0;
        let intervalId = setInterval(() => {
            opacity += 0.25;
            dialog.current.style.opacity = opacity;
            if (opacity >= maxOpacity) {
                clearInterval(intervalId);
            }
        }, intervalTime);
    }

    /*--------------下拉選單--------------*/
    function open_dropdown(dropdown) {
        dropdown.current.classList.toggle("open");
    }
    const initSelect = () => {
        for (const dropdown of document.querySelectorAll(".select")) {
            const options = dropdown.querySelectorAll(".custom-option");
            for (const option of options) {
                option.addEventListener("click", function () {
                    dropdown.classList.remove("open");
                    if (!this.classList.contains("selected")) {
                        this.parentNode.querySelector(".custom-option.selected").classList.remove("selected");
                        this.classList.add("selected");
                        this.closest(".select").querySelector(".select__trigger span").textContent = this.textContent;
                    }
                });
            }
        }
        window.addEventListener("click", (e) => {
            for (const select of document.querySelectorAll(".select")) {
                if (!select.contains(e.target)) {
                    select.classList.remove("open");
                }
            }
        });
    };
    /*--------------set Permission--------------*/
    const addpersonnel2 = useRef();
    /*--------------初始化Table--------------*/
    const [permissions, setPermissions] = useState([]);
    const [factories, setFactories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // 取得人員列表
    useEffect(() => {
        fetch(API_URL + "getAuth_Fact", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("API Error:", response.status);
                    throw new Error("API Error");
                }
            })
            .then((data) => {
                // 在這裡處理獲取到的資料
                setPermissions(data.data);
                setFactories(data.factory);
                setIsLoading(false); // Set loading state to false once the data is loaded
            })
            .catch((error) => {
                //處理錯誤
                console.error("API Request Error:", error);
            });
    }, []);
    const [selectedAuth, setSelectedAuth] = useState({});
    const renderTable = () => {
        if (isLoading) {
            //加載數據時添加加載動畫 isLoading = true
            return (
                <tr>
                    <td colSpan="8" className="loading-animation">
                        {/* Loading... */}
                        <div className="loader"></div>
                    </td>
                </tr>
            );
        }
        const settingfunc = (auth, dialogRef) => {
            setSelectedAuth(auth);
            // 設定 任職地點
            let options = locationSelectRef.current.querySelectorAll(".custom-option");
            let selected_index = 0;
            let count = 0;
            for (const option of options) {
                if ( option.textContent === auth.location ){
                    selected_index = count;
                    break;
                }
                count += 1;
            }
            options[selected_index].click();
            // 設定 部門
            departmentInputRef.current.value = auth.department;
            // 設定 職稱
            titleInputRef.current.value = auth.title;
            // 設定 任職狀態
            options = employmentStatusSelectRef.current.querySelectorAll(".custom-option");
            selected_index = 0;
            count = 0;
            for (const option of options) {
                if ( option.textContent === auth.empStatus ){
                    selected_index = count;
                    break;
                }
                count += 1;
            }
            options[selected_index].click();
            // 設定 系統權限級別
            options = permissionLevelSelectRef.current.querySelectorAll(".custom-option");
            selected_index = 0;
            count = 0;
            for (const option of options) {
                if ( option.textContent === auth.userPrivilege ){
                    selected_index = count;
                    break;
                }
                count += 1;
            }
            options[selected_index].click();
            // 設定 立即開放權限
            if ( auth.approval === true ){
                immediateAccessRadioRef.current.defaultChecked = true;
                immediateAccessRadioFalseRef.current.defaultChecked = false;
            }else{
                immediateAccessRadioRef.current.defaultChecked = false;
                immediateAccessRadioFalseRef.current.defaultChecked = true;
            }
            // 開啟視窗
            opendialog(dialogRef);
        };
        return permissions.map((permission, index) => (
            <tr key={index}>
                <td>{(index + 1).toString().padStart(3, "0")}</td>
                <td>{permission.name}</td>
                <td>{permission.mail}</td>
                <td>{permission.department ? permission.department : "N/A"}</td>
                <td>{permission.userPrivilege ? permission.userPrivilege : "N/A"}</td>
                <td>{permission.lastUpdated ? permission.lastUpdated : "N/A"}</td>
                <td>{permission.approval ? <i className="approval"></i> : <i className="unapproval"></i>}</td>

                <td>
                    {permission.isApprove ? (
                        <input type="button" className="blue_btn" value="設定" onClick={() => settingfunc(permission, addpersonnel)}></input>
                    ) : (
                        <input type="button" className="red_btn" value="待批准" onClick={() => settingfunc(permission, addpersonnel2)}></input>
                    )}
                </td>
            </tr>
        ));
    };
    /*--------------Dialog中的Inputs--------------*/

    const locationSelectRef = useRef();
    const departmentInputRef = useRef();
    const titleInputRef = useRef();
    const employmentStatusSelectRef = useRef();
    const permissionLevelSelectRef = useRef();
    const immediateAccessRadioRef = useRef();
    const immediateAccessRadioFalseRef = useRef();

    const handleSubmit = () => {
        const selectedLocationOption = locationSelectRef.current.querySelector(".custom-option.selected");
        const location = selectedLocationOption.textContent;

        const department = departmentInputRef.current.value;
        const title = titleInputRef.current.value;

        const selectedEmploymentStatus = employmentStatusSelectRef.current.querySelector(".custom-option.selected");
        const employmentStatus = selectedEmploymentStatus.textContent;

        const selectedPermissionLevel = permissionLevelSelectRef.current.querySelector(".custom-option.selected");
        const permissionLevel = selectedPermissionLevel.textContent;

        const immediateAccess = immediateAccessRadioRef.current.checked;

        if (
            selectedLocationOption.getAttribute("data-value") === "0" ||
            department === "" ||
            title === "" ||
            selectedEmploymentStatus.getAttribute("data-value") === "0" ||
            selectedPermissionLevel.getAttribute("data-value") === "0"
        ) {
            alert("有空值");
            return;
        }
        const uploaded_data = {
            CN_UID: selectedAuth.CN_UID,
            CN_WL: location,
            CN_DEPT: department,
            CN_JOBTITLE: title,
            CN_EMPSTATUS: employmentStatus,
            CN_AUTH: permissionLevel,
            CN_AUTHSTATUS: immediateAccess,
        };

        fetch(API_URL + "setEMPREL", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(uploaded_data),
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("API Error:", response.status);
                    throw new Error("API Error");
                }
            })
            .then((data) => {
                if (data.result === true) {
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error("API Request Error:", error);
            });

        // Clear the input fields if needed
        departmentInputRef.current.value = "";
        titleInputRef.current.value = "";
        closedialog(addpersonnel);
    };

    /*--------------Dialog中的Inputs--------------*/

    const allowAuth = () => {
        console.log(selectedAuth);
        fetch(API_URL + "setVerify", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ CN_UID: selectedAuth.CN_UID }),
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("API Error:", response.status);
                    throw new Error("API Error");
                }
            })
            .then((data) => {
                if (data.result === true) {
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error("API Request Error:", error);
            });
        closedialog(addpersonnel2);
    };

    return (
        <>
            <Sidebar />

            <main className="main">
                <div className="title_container dividing_line">
                    <h1 className="maintitle">權限管理</h1>
                </div>

                {/* <input type="button" className="add_company_btn" value="新增人員" onClick={() => opendialog(addpersonnel)}></input> */}

                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>
                                <div className="thead_text">姓名</div>
                            </th>
                            <th>
                                <div className="thead_text">電子信箱</div>
                            </th>
                            <th>
                                <div className="thead_text">部門-職稱</div>
                            </th>
                            <th>
                                <div className="thead_text">系統權限級</div>
                            </th>
                            <th>
                                <div className="thead_text">修改日期</div>
                            </th>
                            <th>
                                <div className="thead_text">狀態</div>
                            </th>
                            <th>
                                <div className="thead_text">批准狀態</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
                </table>
            </main>

            {/* <!-- 新增人員--> */}
            <dialog ref={addpersonnel}>
                <div className="dia_container">
                    <div className="dia_header">
                        <div className="dia_title">
                            <div>新增人員</div>
                        </div>
                        <img src={require("../../img/dialog_img/close.png")} alt="X" className="dia_close" onClick={() => closedialog(addpersonnel)} />
                    </div>
                    <div className="dia_main2 f5_bg">
                        <div>
                            <div className="question">
                                <label htmlFor='true'>任職地點</label>
                                <div className="select-wrapper">
                                    <div className="select" ref={locationSelectRef}>
                                        <div className="select__trigger" onClick={() => open_dropdown(locationSelectRef)}>
                                            <span>選擇工廠</span>
                                        </div>
                                        <div className="custom-options">
                                            <span className="custom-option selected" data-value={0}>
                                                選擇工廠
                                            </span>
                                            {factories.map((item, index) => (
                                                <span className="custom-option" data-value={index+1} key={index}>
                                                    {item}
                                                </span>
                                            ))}
                                            { initSelect() }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="question">
                                <label htmlFor="true">部門</label>
                                <input type="text" placeholder="XXX部門" ref={departmentInputRef} />
                            </div>
                            <div className="question">
                                <label htmlFor="true">職稱</label>
                                <input type="text" placeholder="IT人員" ref={titleInputRef} />
                            </div>
                        </div>
                        <div>
                            <div className="question">
                                <label htmlFor="true">任職狀態</label>
                                <div className="select-wrapper">
                                    <div className="select" ref={employmentStatusSelectRef}>
                                        <div className="select__trigger" onClick={() => open_dropdown(employmentStatusSelectRef)}>
                                            <span>選擇任職狀態</span>
                                        </div>
                                        <div className="custom-options">
                                            <span className="custom-option selected" data-value={0}>
                                                選擇任職狀態
                                            </span>
                                            <span className="custom-option" data-value={1}>
                                                任職中
                                            </span>
                                            <span className="custom-option" data-value={2}>
                                                停職中
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="question">
                                <label htmlFor="true">系統權限級別</label>
                                <div className="select-wrapper">
                                    <div className="select" ref={permissionLevelSelectRef}>
                                        <div className="select__trigger" onClick={() => open_dropdown(permissionLevelSelectRef)}>
                                            <span>選擇權限級別</span>
                                        </div>
                                        <div className="custom-options">
                                            <span className="custom-option selected" data-value={0}>
                                                選擇權限級別
                                            </span>
                                            <span className="custom-option" data-value={1}>
                                                最高管理權限
                                            </span>
                                            <span className="custom-option" data-value={2}>
                                                設定權限
                                            </span>
                                            <span className="custom-option" data-value={3}>
                                                基礎權限
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="question">
                                <label htmlFor="true">是否立即開放權限</label>
                                <div className="radio_group">
                                    <input type="radio" name="access" id={1} ref={immediateAccessRadioRef} />
                                    <label htmlFor={1} className="radio_circle">
                                        是
                                    </label>
                                    <input type="radio" name="access" id={2} ref={immediateAccessRadioFalseRef}/>
                                    <label htmlFor={2} className="radio_circle">
                                        否
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dia_footer f5_bg">
                        <div className="dia_btn btn_blue" onClick={handleSubmit}>
                            完成
                        </div>
                    </div>
                </div>
            </dialog>

            {/* <!-- 確認批准 --> */}
            <dialog className="small_dialog" ref={addpersonnel2}>
                <div className="small_dia_container">
                    <div className="dia_header">
                        <div className="dia_title">
                            <div>確認批准</div>
                        </div>
                        <img src={require("../../img/dialog_img/close.png")} alt="X" className="dia_close" onClick={() => closedialog(addpersonnel2)} />
                    </div>
                    <div className="dia_main2 f5_bg">
                        <div>
                            <div className="question">
                                <input type="button" className="blue_btn" value="確定" onClick={() => allowAuth()}></input>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Permission;
