import React, { useRef, useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
// import { LinkContext } from "../../../container/LinkProvider";

import "../../../css/saas.css";
import "../../../css/dialog.css";

import Sidebar from "../../../components/Sidebar";
import Calendar from "./components/Calendar";
import Scatters from "./components/Scatters";
import Doughnuts from "./components/Doughnuts";
// import Bars from "./components/Bars";

import { UserContext } from "../../../container/UserContextProvider";

import API_URL from "../../../config";

const Report = () => {
    // let title_text = "設備監控儀表板";
    // let title_text_1 = "工廠儀表板";
    // let title_text_2 = "設備儀表板";
    // let title_text_3 = "邊緣設備儀表板";
    // const { addPathData } = useContext(LinkContext);
    //加入"工廠儀表板"路徑
    const handleVisitPage_C = () => {
        // const path = { title: title_text, link: "/Home" };
        // addPathData(path);
        // const path_2 = { title: title_text_1, link: "/CompanyDevice" };
        // addPathData(path_2);
    };
    //加入"設備儀表板"路徑
    const handleVisitPage_Equ = () => {
        // const path = { title: title_text, link: "/Home" };
        // addPathData(path);
        // const path_2 = { title: title_text_2, link: "/EquipmentDevice" };
        // addPathData(path_2);
    };
    //加入"邊緣設備儀表板"路徑
    const handleVisitPage_Edg = () => {
        // const path = { title: title_text, link: "/Home" };
        // addPathData(path);
        // const path_2 = { title: title_text_3, link: "/EdgeDevice" };
        // addPathData(path_2);
    };

    /*--------------Context Provider--------------*/
    const { factoryData, setFactoryData } = useContext(UserContext);
    // console.log( factoryData );
    /*--------------取得工廠資料--------------*/
    const [isLoading, setIsLoading] = useState(true);
    console.log(isLoading);
    const [amountInfo, setAmountInfo] = useState([0, 0, 0, 0, 0, 0]);
    useEffect(() => {
        fetch(API_URL + "getFactory", {
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
                console.log('test');
                console.log(data.data);
                setFactoryData(data.data);
                setIsLoading(false); // Set loading state to false once the data is loaded
                const factoryLen = data.data.length;
                let equiqsLen = 0;
                let edgeLen = 0;
                let dataLen = 0;
                for (let i = 0; i < data.data.length; i++) {
                    let factory = data.data[i];
                    equiqsLen += factory.equipment.length;
                    edgeLen += factory.edge.length;
                    let edge = factory.edge;
                    for (let j = 0; j < edge.length; j++) {
                        let upload = edge[j].CN_UPLOADINFO;
                        for (let k = 0; k < upload.length; k++) {
                            dataLen += upload[k].DATALENGTH;
                        }
                    }
                    // 缺待處理、已處理設備
                }
                setAmountInfo([factoryLen, equiqsLen, edgeLen, 0, 0, dataLen]);
                // console.log([factoryLen, equiqsLen, edgeLen, 0, 0, dataLen]);
            })
            .catch((error) => {
                //處理錯誤
                console.error("API Request Error:", error);
            });
    }, [setAmountInfo, setFactoryData]);

    /*--------------subscription--------------*/
    const subscription = useRef(); //訂閱畫面
    const subscription2 = useRef(); //訂閱畫面
    const uploaddata = useRef();
    const newfolder = useRef();
    const newdata = useRef();

    /*在一般畫面中點選某區塊可開啟dialog畫面 */
    // function opendialog(dialogscreen) {
    //     dialogscreen.current.showModal();
    //     fadeIn(dialogscreen);
    // }

    /*在dialog畫面中點選 X 可關閉dialog畫面 */
    function closedialog(dialogscreen) {
        dialogscreen.current.style.opacity = 0;
        dialogscreen.current.close();
    }

    /*在dialog畫面中點選某區塊可進行換頁 */
    function changedialog(previous, next) {
        if (!next.open) {
            previous.current.close();
            previous.current.style.opacity = 0;
            next.current.showModal();
            fadeIn(next);
        }
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
    const dropdown1 = useRef(null);
    // const dropdown2 = useRef(null);
    // const dropdown3 = useRef(null);
    const dropdown4 = useRef(null);
    const rentalperiod = useRef(null);

    function open_dropdown(dropdown) {
        dropdown.current.classList.toggle("open");
        for (const wrapper of document.querySelectorAll(".select-wrapper")) {
            wrapper.addEventListener("click", function () {
                this.querySelector(".select").classList.toggle("open");
                this.querySelector(".select__trigger").classList.toggle("rotate");
            });
        }

        for (const option of document.querySelectorAll(".custom-option")) {
            option.addEventListener("click", function () {
                if (!this.classList.contains("selected")) {
                    this.parentNode.querySelector(".custom-option.selected").classList.remove("selected");
                    this.classList.add("selected");
                    this.closest(".select").querySelector(".select__trigger span").textContent = this.textContent;
                }
            });
        }
    }

    /*上傳檔案功能 */
    const uploadnewfolder = useRef();
    const uploadnewdata = useRef();
    //點擊"選擇檔案"按鈕時觸發input開啟檔案功能
    function clickinput(input) {
        input.current.click();
    }

    //當檔案選取完成時會自動將檔名輸入到div中顯示，並且點選取消時會清空已選取上傳的檔案
    const changefilename = (event) => {
        // console.log(event.target.files[0]);
        document.getElementById("foldernamedisplay").innerHTML = event.target.files[0].name;
    };

    const emptyinput = () => {
        document.getElementById("foldernamedisplay").innerHTML = "尚未選擇檔案"; // 清空顯示的檔案名稱
    };

    const changefilename2 = (event) => {
        document.getElementById("filenamedisplay").innerHTML = event.target.files[0].name;
    };

    const emptyinput2 = () => {
        document.getElementById("filenamedisplay").innerHTML = "尚未選擇檔案"; // 清空顯示的檔案名稱
    };

    /*當我選定訂閱月數時會變動總計的價格*/
    const [totalPrice, setTotalPrice] = useState(0);
    function handleRentalPeriodChange(event) {
        const selectedValue = parseInt(event.target.dataset.value);
        // 根据选择的租期计算新的总价
        let newTotalPrice = 0;
        switch (selectedValue) {
            case 1:
                newTotalPrice = 125000;
                break;
            case 2:
                newTotalPrice = 200000;
                break;
            case 3:
                newTotalPrice = 360000;
                break;
            default:
                newTotalPrice = 0;
        }
        setTotalPrice(newTotalPrice);
    }

    // 甜甜圈
    const countDonuts = () => {
        // let count = [ 1, 1, 1, 1, 1 ];
        let count = [0, 0, 0, 0, 0];
        console.log("123");
        for (let i = 0; i < factoryData.length; i++) {
            let edges = factoryData[i].edge;
            console.log(edges);
            for (let j = 0; j < edges.length; j++) {
                let index = Math.floor(edges[j].CN_HEALTH / 20);
                count[index] += 1;
            }
        }
        // console.log(count);
        return count;
    };
    let donutsData = countDonuts();

    return (
        <>
            <Sidebar />

            <main className="main">
                <div className="title_container">
                    <h1 className="maintitle">設備監控儀表板</h1>
                </div>
                <div className="row">
                    {/* 日歷 + 地圖 */}
                    <Calendar />

                    <div className="col">
                        <NavLink to={"/CompanyDevice"} onClick={handleVisitPage_C}>
                            <div className="box boxHover">
                                <h3 className="h3subtitle">工廠家數</h3>
                                <span className="count">
                                    {amountInfo[0]} <small className="unit">家</small>{" "}
                                </span>
                                {/* <div className="startTime">自2023年2月10日起</div> */}
                            </div>
                        </NavLink>
                        <NavLink to={"/EquipmentDevice"} onClick={handleVisitPage_Equ}>
                            <div className="box boxHover">
                                <h3 className="h3subtitle">設備數量</h3>
                                <span className="count">
                                    {amountInfo[1]} <small className="unit">台</small>{" "}
                                </span>
                                {/* <div className="startTime">自2023年2月10日起</div> */}
                            </div>
                        </NavLink>
                        <NavLink to={"/EdgeDevice"} onClick={handleVisitPage_Edg}>
                            <div className="box boxHover">
                                <h3 className="h3subtitle">邊緣設備數量</h3>
                                <span className="count">
                                    {amountInfo[2]} <small className="unit">台</small>{" "}
                                </span>
                                {/* <div className="startTime">自2023年2月10日起</div> */}
                            </div>
                        </NavLink>
                        <NavLink to={"/Record"}>
                            <div className="box boxHover">
                                <h3 className="h3subtitle">累計數據量</h3>
                                <span className="count">
                                    {amountInfo[5]} <small className="unit">筆</small>{" "}
                                </span>
                                {/* <div className="startTime">自2023年2月10日起</div> */}
                            </div>
                        </NavLink>
                    </div>
                    {/* <div className="col">
                    <NavLink to={"/EquipmentDevice"}>
                        <div className="box boxHover">
                            <h3 className="h3subtitle">待處理設備</h3>
                            <span className="count">{amountInfo[3]} <small className="unit">台</small> </span>
                            <div className="startTime">自2023年2月10日起</div>
                        </div>
                    </NavLink>
                    <NavLink to={"/EquipmentDevice"}>
                        <div className="box boxHover">
                            <h3 className="h3subtitle">已處裡設備</h3>
                            <span className="count">{amountInfo[4]} <small className="unit">台</small> </span>
                            <div className="startTime">自2023年2月10日起</div>
                        </div>
                    </NavLink>
                    <NavLink to={"/Record"}>
                        <div className="box boxHover">
                            <h3 className="h3subtitle">累計數據量</h3>
                            <span className="count">{amountInfo[5]} <small className="unit">筆</small> </span>
                            <div className="startTime">自2023年2月10日起</div>
                        </div>
                    </NavLink>
                </div> */}

                    <div className="row_col">
                        <Scatters />
                        <Doughnuts data={donutsData}/>
                    </div>
                </div>
            </main>

            {/* <!-- 訂閱 --> */}
            <dialog ref={subscription}>
                <div className="small_dia_container">
                    <div className="dia_header">
                        <div className="dia_title">Professional Business</div>
                        <img src={require("../../../img/dialog_img/close.png")} alt="X" className="dia_close" id="sub_close" onClick={() => closedialog(subscription)} />
                        <div className="dia_subtitle">您可以免費使用本系統，只需依照您的需求選購適當的邊緣設備，開始您的設備健康度演算！</div>
                    </div>
                    <div className="dia_main2">
                        <div className="sub_activebox">
                            <div className="content">
                                <div className="plan_title">Free</div>
                                <div className="plan_subtitle">試用版，可新增設備進行預覽功能。</div>
                                <div className="plan_price">NT $0</div>
                                <div className="plan_list">
                                    <div className="list">
                                        <img src={require("../../../img/dialog_img/Check.png")} alt="√" />
                                        <div>提供的功能1</div>
                                    </div>
                                    <div className="list">
                                        <img src={require("../../../img/dialog_img/Check.png")} alt="√" />
                                        <div>提供的功能2</div>
                                    </div>
                                    <div className="list">
                                        <img src={require("../../../img/dialog_img/Check.png")} alt="√" />
                                        <div>提供的功能3</div>
                                    </div>
                                </div>
                            </div>
                            <div className="resent">目前方案</div>
                        </div>
                        <div className="sub_box">
                            <div className="content">
                                <div className="plan_title">Premium Plan</div>
                                <div className="plan_subtitle">升級本方案點選更新方案進行試算，適用於各設備。</div>
                                <div className="plan_price">NT $790以上 /月</div>
                                <div className="plan_list">
                                    <div className="list">
                                        <img src={require("../../../img/dialog_img/Check.png")} alt="√" />
                                        <div>提供的功能1</div>
                                    </div>
                                    <div className="list">
                                        <img src={require("../../../img/dialog_img/Check.png")} alt="√" />
                                        <div>提供的功能2</div>
                                    </div>
                                    <div className="list">
                                        <img src={require("../../../img/dialog_img/Check.png")} alt="√" />
                                        <div>提供的功能3</div>
                                    </div>
                                </div>
                            </div>
                            <div className="resent" onClick={() => changedialog(subscription, subscription2)}>
                                更新方案
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>

            {/* <!-- 訂閱-p2 --> */}
            <dialog ref={subscription2}>
                <div className="dia_container">
                    <div className="dia_header">
                        <div className="dia_title">
                            <img src={require("../../../img/dialog_img/prepage.png")} alt="＜" className="dia_prepage" onClick={() => changedialog(subscription2, subscription)} />
                            <div>付款方式</div>
                        </div>
                        <img src={require("../../../img/dialog_img/close.png")} alt="X" className="dia_close" onClick={() => closedialog(subscription2)} />
                    </div>
                    <div className="dia_main2">
                        <div>
                            <div className="choosenbox">
                                <div className="plan_title">Premium Plan</div>
                                <div className="plan_subtitle">升級此方案可免費使用本系統，請選擇邊緣設備需求數量試算費用（至少選購4台）。</div>
                                <div className="plan_list">
                                    <div className="list">
                                        <img src={require("../../../img/dialog_img/Check.png")} alt="√" />
                                        <div>提供的功能1</div>
                                    </div>
                                    <div className="list">
                                        <img src={require("../../../img/dialog_img/Check.png")} alt="√" />
                                        <div>提供的功能2</div>
                                    </div>
                                    <div className="list">
                                        <img src={require("../../../img/dialog_img/Check.png")} alt="√" />
                                        <div>提供的功能3</div>
                                    </div>
                                    <div className="list">
                                        <img src={require("../../../img/dialog_img/Check.png")} alt="√" />
                                        <div>提供的功能4</div>
                                    </div>
                                </div>
                            </div>
                            <div className="totalprice">總計： {totalPrice} / 月</div>
                        </div>
                        <div className="overflow">
                            <div className="question">
                                <label htmlFor="true">選擇租期長度</label>
                                <div className="select-wrapper">
                                    <div className="select" ref={rentalperiod}>
                                        <div className="select__trigger" onClick={() => open_dropdown(rentalperiod)}>
                                            <span>選擇租期長度</span>
                                        </div>
                                        <div className="custom-options">
                                            <span className="custom-option selected" data-value={0} onClick={handleRentalPeriodChange}>
                                                選擇租期長度
                                            </span>
                                            <span className="custom-option" data-value={1} onClick={handleRentalPeriodChange}>
                                                3 個月
                                            </span>
                                            <span className="custom-option" data-value={2} onClick={handleRentalPeriodChange}>
                                                6 個月
                                            </span>
                                            <span className="custom-option" data-value={3} onClick={handleRentalPeriodChange}>
                                                12 個月
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="question">
                                <label htmlFor="true">邊緣設備需求數量</label>
                                <div className="select-wrapper">
                                    <div className="select" ref={dropdown1}>
                                        <div className="select__trigger" onClick={() => open_dropdown(dropdown1)}>
                                            <span>選擇需求台數</span>
                                        </div>
                                        <div className="custom-options">
                                            <span className="custom-option selected" data-value={0}>
                                                選擇需求台數
                                            </span>
                                            <span className="custom-option" data-value={1}>
                                                1 台
                                            </span>
                                            <span className="custom-option" data-value={2}>
                                                2 台
                                            </span>
                                            <span className="custom-option" data-value={3}>
                                                3 台
                                            </span>
                                            <span className="custom-option" data-value={4}>
                                                4 台
                                            </span>
                                            <span className="custom-option" data-value={5}>
                                                5 台
                                            </span>
                                            <span className="custom-option" data-value={6}>
                                                6 台
                                            </span>
                                            <span className="custom-option" data-value={7}>
                                                7 台
                                            </span>
                                            <span className="custom-option" data-value={8}>
                                                8 台
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="question">
                                <label htmlFor="true">負責人姓名</label>
                                <div className="input_group">
                                    <input type="text" placeholder="姓氏" />
                                    <input type="text" placeholder="名字" />
                                </div>
                            </div>
                            <div className="question">
                                <label htmlFor="true">聯絡電話</label>
                                <input type="text" placeholder="手機或市話" />
                            </div>
                        </div>
                    </div>
                    <div className="dia_footer">
                        <div className="dia_btn btn_blue">提出申請</div>
                    </div>
                </div>
            </dialog>

            {/* <!-- 新增與上傳資料--> */}
            <dialog ref={uploaddata}>
                <div className="dia_container">
                    <div className="dia_header">
                        <div className="dia_title">
                            <div>選擇上傳資料類型</div>
                        </div>
                        <img src={require("../../../img/dialog_img/close.png")} alt="X" className="dia_close" onClick={() => closedialog(uploaddata)} />
                    </div>
                    <div className="dia_main2">
                        <div className="pickone" onClick={() => changedialog(uploaddata, newfolder)}>
                            創建資料庫與上傳檔案
                        </div>
                        <div className="pickone" onClick={() => changedialog(uploaddata, newdata)}>
                            新增數據
                        </div>
                    </div>
                </div>
            </dialog>

            {/* <!-- 創建資料庫與上傳檔案--> */}
            <dialog ref={newfolder}>
                <div className="dia_container">
                    <div className="dia_header">
                        <div className="dia_title">
                            <img src={require("../../../img/dialog_img/prepage.png")} alt="＜" className="dia_prepage" onClick={() => changedialog(newfolder, uploaddata)} />
                            <div>創建資料庫與上傳檔案</div>
                        </div>
                        <img src={require("../../../img/dialog_img/close.png")} alt="X" className="dia_close" onClick={() => closedialog(newfolder)} />
                    </div>
                    <div className="dia_main2">
                        <div>
                            <div className="question">
                                <label htmlFor="true">Step1.請命名此資料庫名稱</label>
                                <input type="text" placeholder="3N_cut" />
                            </div>
                            <div className="question">
                                <label htmlFor="true">Step2.上傳檔案</label>
                                <div className="input_group2">
                                    <input type="file" ref={uploadnewfolder} onChange={changefilename} />
                                    <div className="input" id="foldernamedisplay">
                                        尚未選擇檔案
                                    </div>
                                    <div className="flex_group">
                                        <div className="dia_btn btn_green" onClick={() => clickinput(uploadnewfolder)}>
                                            選擇檔案
                                        </div>
                                        <div className="dia_btn btn_gray" onClick={emptyinput}>
                                            清空
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dia_footer">
                        <div className="dia_btn btn_blue">完成</div>
                    </div>
                </div>
            </dialog>

            {/* <!-- 新增數據--> */}
            <dialog ref={newdata}>
                <div className="dia_container">
                    <div className="dia_header">
                        <div className="dia_title">
                            <img src={require("../../../img/dialog_img/prepage.png")} alt="＜" className="dia_prepage" onClick={() => changedialog(newdata, uploaddata)} />
                            <div>新增數據</div>
                        </div>
                        <img src={require("../../../img/dialog_img/close.png")} alt="X" className="dia_close" onClick={() => closedialog(newdata)} />
                    </div>
                    <div className="dia_main2">
                        <div>
                            <div className="question">
                                <label htmlFor="true">選擇資料庫</label>
                                <div className="select-wrapper">
                                    <div className="select" ref={dropdown4}>
                                        <div className="select__trigger" onClick={() => open_dropdown(dropdown4)}>
                                            <span>選擇資料庫名稱</span>
                                        </div>
                                        <div className="custom-options">
                                            <span className="custom-option selected" data-value={0}>
                                                選擇資料庫名稱
                                            </span>
                                            <span className="custom-option" data-value={1}>
                                                XXXX
                                            </span>
                                            <span className="custom-option" data-value={2}>
                                                OOOO
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="question">
                                <label htmlFor="true">Step2.上傳檔案</label>
                                <div className="input_group2">
                                    <input type="file" ref={uploadnewdata} onChange={changefilename2} />
                                    <div className="input" id="filenamedisplay">
                                        尚未選擇檔案
                                    </div>
                                    <div className="flex_group">
                                        <div className="dia_btn btn_green" onClick={() => clickinput(uploadnewdata)}>
                                            選擇檔案
                                        </div>
                                        <div className="dia_btn btn_gray" onClick={emptyinput2}>
                                            清空
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dia_footer">
                        <div className="dia_btn btn_blue">上傳</div>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Report;
