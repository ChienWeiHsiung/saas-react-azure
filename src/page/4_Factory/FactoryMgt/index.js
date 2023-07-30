import React, { useRef, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../../css/saas.css";
// import Img from "../../../img/Img.svg";

import Sidebar from "../../../components/Sidebar";
import Title from "../../../components/Title";
import SwitchSection from "./components/SwitchSection";

// import { NavLink } from "react-router-dom";

import { UserContext } from "../../../container/UserContextProvider";

import API_URL from "../../../config";

const FactoryMgt = () => {
    /*--------------Context Provider--------------*/

    const { factoryClickedIndex, factoryData, setFactoryData, setEquipmentClicked } = useContext(UserContext);
    const selectedFactory = factoryData[factoryClickedIndex].factory;
    const selectedEquipment = factoryData[factoryClickedIndex].equipment;
    const selectedEdge = factoryData[factoryClickedIndex].edge;
    console.log("In FactoryMgt : ");
    console.log(selectedEdge);
    let equipmentDate = "N/A";
    if (selectedEquipment.length !== 0) {
        let latestObject = selectedEquipment.reduce((prev, current) => {
            const prevDate = new Date(prev.CN_EQPAD);
            const currentDate = new Date(current.CN_EQPAD);
            return prevDate > currentDate ? prev : current;
        });
        const date = new Date(latestObject.CN_EQPAD);
        equipmentDate = `自${date.getFullYear()}年${date.getMonth() + 1}月${date.getMonth() + 1}日起`;
    }
    let edgeDate = "N/A";
    if (selectedEdge.length !== 0) {
        let latestObject = selectedEdge.reduce((prev, current) => {
            const prevDate = new Date(prev.CN_EDGAD);
            const currentDate = new Date(current.CN_EDGAD);
            return prevDate > currentDate ? prev : current;
        });
        const date = new Date(latestObject.CN_EDGAD);
        edgeDate = `自${date.getFullYear()}年${date.getMonth() + 1}月${date.getMonth() + 1}日起`;
    }
    /* --------------------------------------------------  */

    let title_text = selectedFactory.CN_FACNAME;
    let title_path_array = ["工廠與設備管理", "工廠管理"];
    let buttonCount = title_path_array.length;
    let link_array = ["/FactoryAndDevice", "/FactoryMgt"];
    /*--------------add equipment--------------*/
    const addequipment = useRef();

    /*在一般畫面中點選某區塊可開啟dialog畫面 */
    function opendialog() {
        addequipment.current.showModal();
        fadeIn(addequipment);
    }

    /*在dialog畫面中點選 X 可關閉dialog畫面 */
    function closedialog() {
        // var inputElement = document.querySelector('input');
        // inputElement.value = '';
        addequipment.current.style.opacity = 0;
        addequipment.current.close();
        // 重置Dialog中的Input
        equipmentNameInputRef.current.value = "";
        equipmentNumberInputRef.current.value = "";
        let options = equipmentTypeSelectRef.current.querySelectorAll(".custom-option");
        options[0].click();
        options = equipmentModelSelectRef.current.querySelectorAll(".custom-option");
        options[0].click();
        equipmentSerialNumberInputRef.current.value = "";
        options = equipmentAreaSelectRef.current.querySelectorAll(".custom-option");
        options[0].click();
        equipmentStartDateInputRef.current.value = "";
        setSelectedImage(null);
    }

    /*在dialog畫面中點選某區塊可進行換頁 */
    // function changedialog(previous, next) {
    //     if (!next.open) {
    //         previous.current.close();
    //         previous.current.style.opacity = 0;
    //         next.current.showModal();
    //         fadeIn(next);
    //     }
    // }

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

    /*--------------部分跳轉--------------*/
    //-----第一層
    //預設開啟的畫面
    const [isSelected, setIsSelected] = useState("A");
    const handleClick = (option) => {
        setIsSelected(option);
    };
    //區塊
    const selection = [
        { id: "A", option: "設備清單" },
        { id: "B", option: "邊緣設備清單" },
    ];

    /*--------------下拉選單--------------*/
    function open_dropdown(dropdown) {
        dropdown.current.classList.toggle("open");
    }
    useEffect(() => {
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
        // 兩個下拉選單不會同時開啟
        window.addEventListener("click", (e) => {
            for (const select of document.querySelectorAll(".select")) {
                if (!select.contains(e.target)) {
                    select.classList.remove("open");
                }
            }
        });
        // 點選另一個下拉選單時，原本選單箭頭會改成向下
        window.addEventListener("click", (e) => {
            for (const select__trigger of document.querySelectorAll(".select__trigger")) {
                if (!select__trigger.contains(e.target)) {
                    select__trigger.classList.remove("rotate");
                }
            }
        });
    }, []);

    /*--------------新增設備Dialog中的Inputs--------------*/

    const equipmentNameInputRef = useRef();
    const equipmentNumberInputRef = useRef();
    const equipmentTypeSelectRef = useRef();
    const equipmentModelSelectRef = useRef();
    const equipmentSerialNumberInputRef = useRef();
    const equipmentAreaSelectRef = useRef();
    const equipmentStartDateInputRef = useRef();
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = () => {
        const equipmentName = equipmentNameInputRef.current.value;
        const equipmentNumber = equipmentNumberInputRef.current.value;

        const selectedEquipmentTypeOption = equipmentTypeSelectRef.current.querySelector(".custom-option.selected");
        const equipmentType = selectedEquipmentTypeOption.textContent;

        const selectedEquipmentModelOption = equipmentModelSelectRef.current.querySelector(".custom-option.selected");
        const equipmentModel = selectedEquipmentModelOption.textContent;

        const equipmentSerialNumber = equipmentSerialNumberInputRef.current.value;

        const selectedEquipmentAreaOption = equipmentAreaSelectRef.current.querySelector(".custom-option.selected");
        const equipmentArea = selectedEquipmentAreaOption.textContent;

        const equipmentStartDate = equipmentStartDateInputRef.current.value;

        if (
            equipmentName === "" ||
            equipmentNumber === "" ||
            selectedEquipmentTypeOption.getAttribute("data-value") === "0" ||
            selectedEquipmentModelOption.getAttribute("data-value") === "0" ||
            equipmentSerialNumber === "" ||
            selectedEquipmentAreaOption.getAttribute("data-value") === "0" ||
            equipmentStartDate === "" ||
            selectedImage === null
        ) {
            alert("有空值");
            return;
        }

        const uploaded_data = {
            CN_FACINFO_UID: selectedFactory.CN_UID,
            CN_EQPNO: equipmentNumber,
            CN_EQPNAME: equipmentName,
            CL_EQPTYPE: equipmentType,
            CN_EQPMODELNO: equipmentModel,
            CN_EQPSERIALNO: equipmentSerialNumber,
            CN_EQPAREA: equipmentArea,
            CN_EQPAD: equipmentStartDate,
            CN_EQPPHOTO: selectedImage.split(",")[1],
        };

        fetch(API_URL + "addEquipment", {
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
                    setFactoryData(data.data);
                    // window.location.reload();
                }
            })
            .catch((error) => {
                console.error("API Request Error:", error);
            });
        closedialog();
    };

    /*--------------Render的Info--------------*/
    const navigate = useNavigate();
    const equipmentRender = () => {
        const equipOnClick = (equipment) => {
            setEquipmentClicked(equipment);
            navigate("/EquipmentMgt");
        };
        const stringcheckfault = (equipment) => {
            if (equipment.hasOwnProperty("EDGE")) {
                if (equipment.EDGE.CN_FAILURE) {
                    return equipment.EDGE.CN_FAILURE + "%";
                } else {
                    return "N/A";
                }
            } else {
                return "N/A";
            }
        };
        const stringcheckhealth = (equipment) => {
            if (equipment.hasOwnProperty("EDGE")) {
                if (equipment.EDGE.CN_HEALTH) {
                    return equipment.EDGE.CN_HEALTH + "%";
                } else {
                    return "N/A";
                }
            } else {
                return "N/A";
            }
        };
        return selectedEquipment.map((equipment, index) => (
            <div className="box boxHover" key={"equipment" + index} onClick={() => equipOnClick(equipment)}>
                <h2 className="company_name">
                    {equipment.CN_EQPNAME}
                    <small>{equipment.CN_EQPMODELNO}</small>
                </h2>
                <div className="equipmen_content">
                    <ul className="equipmen_info">
                        <li>
                            設備類型 : <span>{equipment.CL_EQPTYPE}</span>
                        </li>
                        <li>
                            設備型號 : <span>{equipment.CN_EQPMODELNO}</span>
                        </li>
                        <li>
                            故障度 : <span>{stringcheckfault(equipment)} </span>
                        </li>
                        <li>
                            健康度 : <span> {stringcheckhealth(equipment)} </span>
                        </li>
                    </ul>
                    <div className="equipment_small">
                        <img className="equipment_img" src={`data:image/jpeg;base64,${equipment.CN_EQPPHOTO}`} alt="TOYO-TM100"></img>
                    </div>
                </div>
            </div>
        ));
    };

    const edgeRender = () => {
        return selectedEdge.map((edge, index) => (
            <div className="box boxHover" key={"edge" + index}>
                <h2 className="company_name">
                    {edge.CN_EDGNAME}
                    <small>已使用</small>
                </h2>
                <div className="equipmen_content">
                    <ul className="equipmen_info">
                        <li>
                            設備編號 : <span>{edge.CN_EDGNO}</span>
                        </li>
                        <li>
                            設備型號 : <span>{edge.CN_EDGMODELNO}</span>
                        </li>
                        <li>
                            啟用日期 : <span>{edge.CN_EDGAD}</span>
                        </li>
                    </ul>
                    <div className="equipment_small">
                        <img className="equipment_img" src={require("../../../img/equipment_pic/EG350-01.jpg")} alt="" />
                    </div>
                </div>
            </div>
        ));
    };

    const onClickEdge = () => {
        if (selectedEdge.length === 0) {
            return;
        }
        navigate("/EdgeDevice");
    };
    const onClickEquipment = () => {
        if (selectedEquipment.length === 0) {
            return;
        }
        navigate("/EquipmentDevice");
    };
    console.log(selectedFactory);

    return (
        <>
            <Sidebar />

            <main className="main">
                <Title title_text={title_text} buttonCount={buttonCount} title_path_array={title_path_array} link_array={link_array} />

                <div className="row_row_col">
                    <div className="box factory_content col_l">
                        <div className="detail_text_col">
                            <div className="detail_text">
                                <ul className="equipmen_info">
                                    <li>
                                        <h3 className="h3subtitle">工廠編號</h3>
                                        {selectedFactory.CN_FACNO}
                                    </li>
                                    <li>
                                        <h3 className="h3subtitle">工廠類型</h3>
                                        {selectedFactory.CL_FACTYPE}
                                    </li>
                                </ul>
                                <ul className="equipmen_info">
                                    <li>
                                        <h3 className="h3subtitle">電話</h3>
                                        {selectedFactory.CN_FACTEL}
                                    </li>
                                    <li>
                                        <h3 className="h3subtitle">設立日期</h3>
                                        {selectedFactory.CN_FACDOE}
                                    </li>
                                </ul>
                            </div>
                            <div className="address_text">
                                <div>
                                    <h3 className="h3subtitle">地址</h3>
                                    {selectedFactory.CL_FACCOUNTY + selectedFactory.CL_FACDISTRICT + selectedFactory.CN_FACADDRESS}
                                </div>
                                <label htmlFor="set_btn" className="set">
                                    <i className="gg-pen"></i>
                                    <input type="button" id="set_btn" value="修改"></input>
                                </label>
                            </div>
                        </div>
                        <div className="equipment">
                            <img className="equipment_img" src={`data:image/jpeg;base64,${selectedFactory.CN_FACPHOTO}`} alt="尚無圖片"></img>
                        </div>
                    </div>
                    <div onClick={onClickEdge}>
                        <div className="box boxHover">
                            <h3 className="h3subtitle">邊緣設備數量</h3>
                            <span className="count">
                                {selectedEdge.length + " "} <small className="unit">台</small>{" "}
                            </span>
                            <div className="startTime">{edgeDate}</div>
                        </div>
                    </div>
                    <div onClick={onClickEquipment}>
                        <div className="box boxHover">
                            <h3 className="h3subtitle">設備數量</h3>
                            <span className="count">
                                {selectedEquipment.length + " "} <small className="unit">台</small>{" "}
                            </span>
                            <div className="startTime">{equipmentDate}</div>
                        </div>
                    </div>
                </div>

                <SwitchSection handleClick={handleClick} isSelected={isSelected} selection={selection} />
                {isSelected === "A" && (
                    <>
                        <div className="toolbar_content">
                            <label htmlFor="equipment_add_btn" className="equipment_add" onClick={() => opendialog()}>
                                <div type="button" id="equipment_add_btn">
                                    新增設備
                                </div>
                            </label>
                        </div>
                        <div className="equipment_row_col">{equipmentRender()}</div>
                    </>
                )}
                {isSelected === "B" && <div className="equipment_row_col">{edgeRender()}</div>}
            </main>

            {/* <!-- 新增設備--> */}
            <dialog ref={addequipment}>
                <div className="dia_container">
                    <div className="dia_header">
                        <div className="dia_title">
                            <div>新增工廠設備</div>
                        </div>
                        <img src={require("../../../img/dialog_img/close.png")} alt="X" className="dia_close" onClick={() => closedialog()} />
                    </div>
                    <div className="dia_main2 f5_bg">
                        <div>
                            <div className="question">
                                <label htmlFor="true">設備名稱</label>
                                <input type="text" placeholder="設備十三" ref={equipmentNameInputRef} />
                            </div>
                            <div className="question">
                                <label htmlFor="true">設備編號</label>
                                <input type="text" placeholder="IJM01001" ref={equipmentNumberInputRef} />
                            </div>
                            <div className="question">
                                <label htmlFor="true">設備類型</label>
                                <div className="select-wrapper">
                                    <div className="select" ref={equipmentTypeSelectRef}>
                                        <div className="select__trigger" onClick={() => open_dropdown(equipmentTypeSelectRef)}>
                                            <span>選擇設備類型</span>
                                        </div>
                                        <div className="custom-options">
                                            <span className="custom-option selected" data-value={0}>
                                                選擇設備類型
                                            </span>
                                            <span className="custom-option" data-value={1}>
                                                設備類型一
                                            </span>
                                            <span className="custom-option" data-value={2}>
                                                設備類型二
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="question">
                                <label htmlFor="true">設備型號</label>
                                <div className="select-wrapper">
                                    <div className="select" ref={equipmentModelSelectRef}>
                                        <div className="select__trigger" onClick={() => open_dropdown(equipmentModelSelectRef)}>
                                            <span>選擇設備型號</span>
                                        </div>
                                        <div className="custom-options">
                                            <span className="custom-option selected" data-value={0}>
                                                選擇設備型號
                                            </span>
                                            <span className="custom-option" data-value={1}>
                                                設備型號一
                                            </span>
                                            <span className="custom-option" data-value={2}>
                                                設備型號二
                                            </span>
                                            <span className="custom-option" data-value={3}>
                                                設備型號三
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="question">
                                <label htmlFor="true">設備序號</label>
                                <input type="text" placeholder="VDW128XJ866Y-Z" ref={equipmentSerialNumberInputRef} />
                            </div>
                        </div>
                        <div>
                            <div className="question">
                                <label htmlFor="true">設備區域</label>
                                <div className="select-wrapper">
                                    <div className="select" ref={equipmentAreaSelectRef}>
                                        <div className="select__trigger" onClick={() => open_dropdown(equipmentAreaSelectRef)}>
                                            <span>選擇設備區域</span>
                                        </div>
                                        <div className="custom-options">
                                            <span className="custom-option selected" data-value={0}>
                                                選擇設備區域
                                            </span>
                                            <span className="custom-option" data-value={1}>
                                                A區
                                            </span>
                                            <span className="custom-option" data-value={2}>
                                                B區
                                            </span>
                                            <span className="custom-option" data-value={3}>
                                                C區
                                            </span>
                                            <span className="custom-option" data-value={4}>
                                                D區
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="question">
                                <label htmlFor="true">啟用日期</label>
                                <input type="date" ref={equipmentStartDateInputRef} />
                            </div>
                            <div className="question">
                                <label htmlFor="factory-photo">設備照片</label>
                                <div className="factoryimg" onClick={handleImageClick}>
                                    {selectedImage ? (
                                        <img src={selectedImage} alt="工廠照片" className="uploaded-img" />
                                    ) : (
                                        <img src={require("../../../img/dialog_img/img.png")} alt="工廠照片" className="noneimg" />
                                    )}
                                </div>
                                <input type="file" id="factory-photo" accept="image/*" style={{ display: "none" }} ref={fileInputRef} onChange={handleImageUpload} />
                            </div>
                        </div>
                    </div>
                    <div className="dia_footer f5_bg">
                        <div className="dia_btn btn_blue" onClick={handleSubmit}>
                            新增
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default FactoryMgt;
