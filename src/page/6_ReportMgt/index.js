import React, { useRef, useEffect, useState } from "react";

import "../../css/saas.css";

import Sidebar from "../../components/Sidebar";

// import { UserContext } from "../../container/UserContextProvider";

import API_URL from "../../config";

const ReportMgt = () => {
    /*--------------Context Provider--------------*/

    // const { factoryClickedIndex, factoryData, setFactoryData, setEquipmentClicked } = useContext(UserContext);
    // console.log(factoryData);

    const [repairLogging, setRepairLogging] = useState([]);

    /*--------------add reportform--------------*/
    const addreportform = useRef();

    /*在一般畫面中點選某區塊可開啟dialog畫面 */
    // function opendialog(dialogscreen) {
    //     dialogscreen.current.showModal();
    //     fadeIn(dialogscreen);
    // }

    /*在dialog畫面中點選 X 可關閉dialog畫面 */
    function closedialog(dialogscreen) {
        // var inputElement = document.querySelector('input');
        // inputElement.value = '';
        dialogscreen.current.style.opacity = 0;
        dialogscreen.current.close();
    }

    /*開啟dialog視窗時會有動畫浮現的效果*/
    // const intervalTime = 20; // 每隔10毫秒增加不透明度
    // const maxOpacity = 1; // 最大不透明度
    // function fadeIn(dialog) {
    //     let opacity = 0;
    //     let intervalId = setInterval(() => {
    //         opacity += 0.25;
    //         dialog.current.style.opacity = opacity;
    //         if (opacity >= maxOpacity) {
    //             clearInterval(intervalId);
    //         }
    //     }, intervalTime);
    // }

    const render = () => {
        const stringcheckfault = (equipment) => {
            if (equipment.CN_FAILURE) {
                return equipment.CN_FAILURE + "%";
            } else {
                return "N/A";
            }
        };
        const stringcheckhealth = (equipment) => {
            if (equipment.CN_HEALTH) {
                return equipment.CN_HEALTH + "%";
            } else {
                return "N/A";
            }
        };
        const stringStatus = (equipment) => {
            if (!equipment.CN_HS) {
                return "立即保修";
            } else {
                return "無須保修";
            }
        };
        const stringDate = (equipment) => {
            if (equipment.CN_FALDT) {
                return equipment.CN_FALDT;
            } else {
                return "N/A";
            }
        };
        let data = [];
        console.log(repairLogging);
        for (let i = 0; i < repairLogging.length; i++) {
            let log = repairLogging[i];
            let tmp = [log.CN_FACNAME, log.CL_EQPTYPE, log.CN_EQPMODELNO, log.CN_EQPAREA, stringcheckfault(log), stringcheckhealth(log), stringStatus(log), stringDate(log)];
            data.push(tmp);
        }
        return data;
    };
    let data = render();
    useEffect(() => {
        fetch(API_URL + "getRepairLogging", {
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
                setRepairLogging(data.data);
            })
            .catch((error) => {
                //處理錯誤
                console.error("API Request Error:", error);
            });
    }, []);

    return (
        <>
            <Sidebar />

            <main className="main">
                <div className="title_container">
                    <h1 className="maintitle">報表管理</h1>
                </div>

                <div className="topbar">
                    <div className="topbar_link_selected">
                        <input type="button" className="topbar_link_btn topbar_link_btn_selected" value="設備診斷報表"></input>
                    </div>
                    {/* <div className="topbar_link">
                    <input type="button" className="topbar_link_btn" value="其他"></input>
                </div> */}
                </div>

                {/* <div className="toolbar">
                <div className="toolbar_content">
                    <div className="dropdown">
                        <button className="dropbtn" value="">
                            選擇工廠<i className="arrow-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <span>Link 1</span>
                            <span>Link 2</span>
                            <span>Link 3</span>
                        </div>
                    </div>
        
                    <div className="dropdown">
                        <button className="dropbtn">
                            選擇設備
                            <i className="arrow-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <span>全部設備</span>
                            <span>已處理設備</span>
                            <span>待處理設備</span>
                        </div>
                    </div>
                    
                    <label className="date" for="start_date">
                        <input type="text"id="start_date" placeholder="Start Date" 
                            min="2023-01-01"
                            onfocus="(this.type='date')" onblur="(this.type='text')" ></input>
                        <i className="gg-calendar" ></i>
                    </label>
                    <i className="to_icon" ></i>
                    <label className="date" for="end_date">
                        <input type="text" id="end_date" placeholder="End Date" 
                            onfocus="(this.type='date')" onblur="(this.type='text')" ></input>
                        <i className="gg-calendar" ></i>
                    </label>

                    <label for="generate_report_btn" className="generate_report">
                        <input type="button" id="generate_report_btn" value="生成報表"></input>
                    </label>
                </div>
            </div> */}

                <table>
                    <thead>
                        <tr>
                            {/* <th></th> */}
                            <th>
                                <div className="thead_text">工廠名稱</div>
                            </th>
                            <th>
                                <div className="thead_text">設備類型</div>
                            </th>
                            <th>
                                <div className="thead_text">設備型號</div>
                            </th>
                            <th>
                                <div className="thead_text">設備位置</div>
                            </th>
                            <th>
                                <div className="thead_text">故障度</div>
                            </th>
                            <th>
                                <div className="thead_text">健康度</div>
                            </th>
                            <th>
                                <div className="thead_text">狀態</div>
                            </th>
                            <th>
                                <div className="thead_text">紀錄日期</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                {/* <th>
                                <input type="checkbox"></input>
                            </th> */}
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                                <td>{item[2]}</td>
                                <td>{item[3]}</td>
                                <td>{item[4]}</td>
                                <td>{item[5]}</td>
                                <td>{item[6]}</td>
                                <td>{item[7]}</td>
                            </tr>
                        ))}
                        {/* <tr>
                        <th>
                            <input type="checkbox"></input>
                        </th>
                        <td>臺北三重廠</td>
                        <td>射出成形機</td>
                        <td>RC-180 Tons</td>
                        <td>A區</td>
                        <td>IV</td>
                        <td>72%</td>
                        <td>立即保修</td>
                        <td>2023-02-10 by Janet</td>
                    </tr>
                    <tr>
                        <th>
                            <input type="checkbox"></input>
                        </th>
                        <td>臺北三重廠</td>
                        <td>射出成形機</td>
                        <td>RC-180 Tons</td>
                        <td>A區</td>
                        <td>IV</td>
                        <td>72%</td>
                        <td>立即保修</td>
                        <td>2023-02-10 by Janet</td>
                    </tr>
                    <tr>
                        <th>
                            <input type="checkbox"></input>
                        </th>
                        <td>臺北三重廠</td>
                        <td>射出成形機</td>
                        <td>RC-180 Tons</td>
                        <td>A區</td>
                        <td>IV</td>
                        <td>72%</td>
                        <td>立即保修</td>
                        <td>2023-02-10 by Janet</td>
                    </tr>
                    <tr>
                        <th>
                            <input type="checkbox"></input>
                        </th>
                        <td>臺北三重廠</td>
                        <td>射出成形機</td>
                        <td>RC-180 Tons</td>
                        <td>A區</td>
                        <td>IV</td>
                        <td>72%</td>
                        <td>立即保修</td>
                        <td>2023-02-10 by Janet</td>
                    </tr>
                    <tr>
                        <th>
                            <input type="checkbox"></input>
                        </th>
                        <td>臺北三重廠</td>
                        <td>射出成形機</td>
                        <td>RC-180 Tons</td>
                        <td>A區</td>
                        <td>IV</td>
                        <td>72%</td>
                        <td>立即保修</td>
                        <td>2023-02-10 by Janet</td>
                    </tr>
                    <tr>
                        <th>
                            <input type="checkbox"></input>
                        </th>
                        <td>臺北三重廠</td>
                        <td>射出成形機</td>
                        <td>RC-180 Tons</td>
                        <td>A區</td>
                        <td>IV</td>
                        <td>72%</td>
                        <td>立即保修</td>
                        <td>2023-02-10 by Janet</td>
                    </tr>
                    <tr>
                        <th>
                            <input type="checkbox"></input>
                        </th>
                        <td>臺北三重廠</td>
                        <td>射出成形機</td>
                        <td>RC-180 Tons</td>
                        <td>A區</td>
                        <td>IV</td>
                        <td>72%</td>
                        <td>立即保修</td>
                        <td>2023-02-10 by Janet</td>
                    </tr>
                    <tr>
                        <th>
                            <input type="checkbox"></input>
                        </th>
                        <td>臺北三重廠</td>
                        <td>射出成形機</td>
                        <td>RC-180 Tons</td>
                        <td>A區</td>
                        <td>IV</td>
                        <td>72%</td>
                        <td>立即保修</td>
                        <td>2023-02-10 by Janet</td>
                    </tr> */}
                    </tbody>
                </table>
            </main>

            {/* <!-- 新增報表--> */}
            <dialog ref={addreportform}>
                <div className="dia_container">
                    <div className="dia_header">
                        <div className="dia_title">
                            <div>新增報表</div>
                        </div>
                        <img src={require("../../img/dialog_img/close.png")} alt="X" className="dia_close" id="rpf_close" onClick={() => closedialog(addreportform)} />
                    </div>
                    <div className="dia_main2 f5_bg">
                        <div>
                            <div className="question">
                                <label htmlFor="true">報表名稱</label>
                                <input type="text" placeholder="新報表名稱" />
                            </div>
                            <div className="question">
                                <label htmlFor>說明</label>
                                <textarea name id cols={20} rows={6} className="textarea" placeholder="關於此報表的一些說明" defaultValue={""} />
                            </div>
                        </div>
                        <div className="rpf_checkbox">
                            <div className="question">
                                <label htmlFor="true">顯示欄位</label>
                                <div className="question_group">
                                    <div>
                                        <div className="checkbox_title">工廠</div>
                                        <div className="checkbox_group">
                                            <input type="checkbox" name id="fc_1" />
                                            <label htmlFor="fc_1" className="checkbox">
                                                工廠名稱
                                            </label>
                                            <input type="checkbox" name id="fc_2" />
                                            <label htmlFor="fc_2" className="checkbox">
                                                工廠代號
                                            </label>
                                            <input type="checkbox" name id="fc_3" />
                                            <label htmlFor="fc_3" className="checkbox">
                                                負責人
                                            </label>
                                            <input type="checkbox" name id="fc_4" />
                                            <label htmlFor="fc_4" className="checkbox">
                                                地址
                                            </label>
                                            <input type="checkbox" name id="fc_5" />
                                            <label htmlFor="fc_5" className="checkbox">
                                                電話
                                            </label>
                                            <input type="checkbox" name id="fc_6" />
                                            <label htmlFor="fc_6" className="checkbox">
                                                設備數量
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="checkbox_title">傳輸資訊</div>
                                        <div className="checkbox_group">
                                            <input type="checkbox" name id="ts_1" />
                                            <label htmlFor="ts_1" className="checkbox">
                                                傳輸編號
                                            </label>
                                            <input type="checkbox" name id="ts_2" />
                                            <label htmlFor="ts_2" className="checkbox">
                                                生產項目
                                            </label>
                                            <input type="checkbox" name id="ts_3" />
                                            <label htmlFor="ts_3" className="checkbox">
                                                檔案大小
                                            </label>
                                            <input type="checkbox" name id="ts_4" />
                                            <label htmlFor="ts_4" className="checkbox">
                                                累績數據量
                                            </label>
                                            <input type="checkbox" name id="ts_5" />
                                            <label htmlFor="ts_5" className="checkbox">
                                                訊號源
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="checkbox_title">日期時間</div>
                                        <div className="checkbox_group">
                                            <input type="checkbox" name id="dt_1" />
                                            <label htmlFor="dt_1" className="checkbox">
                                                設備保修日期
                                            </label>
                                            <input type="checkbox" name id="dt_2" />
                                            <label htmlFor="dt_2" className="checkbox">
                                                上次修改日期
                                            </label>
                                            <input type="checkbox" name id="dt_3" />
                                            <label htmlFor="dt_3" className="checkbox">
                                                傳輸日期
                                            </label>
                                            <input type="checkbox" name id="dt_4" />
                                            <label htmlFor="dt_4" className="checkbox">
                                                工廠設立日期
                                            </label>
                                            <input type="checkbox" name id="dt_5" />
                                            <label htmlFor="dt_5" className="checkbox">
                                                設備啟用日期
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="checkbox_title">使用者</div>
                                        <div className="checkbox_group">
                                            <input type="checkbox" name id="user_1" />
                                            <label htmlFor="user_1" className="checkbox">
                                                員工編號
                                            </label>
                                            <input type="checkbox" name id="user_2" />
                                            <label htmlFor="user_2" className="checkbox">
                                                姓名
                                            </label>
                                            <input type="checkbox" name id="user_3" />
                                            <label htmlFor="user_3" className="checkbox">
                                                部門與職稱
                                            </label>
                                            <input type="checkbox" name id="user_4" />
                                            <label htmlFor="user_4" className="checkbox">
                                                手機號碼
                                            </label>
                                            <input type="checkbox" name id="user_5" />
                                            <label htmlFor="user_5" className="checkbox">
                                                電子郵件
                                            </label>
                                            <input type="checkbox" name id="user_6" />
                                            <label htmlFor="user_6" className="checkbox">
                                                任職狀態
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="checkbox_title">設備</div>
                                        <div className="checkbox_group">
                                            <input type="checkbox" name id="eq_1" />
                                            <label htmlFor="eq_1" className="checkbox">
                                                設備名稱
                                            </label>
                                            <input type="checkbox" name id="eq_2" />
                                            <label htmlFor="eq_2" className="checkbox">
                                                設備代號
                                            </label>
                                            <input type="checkbox" name id="eq_3" />
                                            <label htmlFor="eq_3" className="checkbox">
                                                設備類型
                                            </label>
                                            <input type="checkbox" name id="eq_4" />
                                            <label htmlFor="eq_4" className="checkbox">
                                                設備型號
                                            </label>
                                            <input type="checkbox" name id="eq_5" />
                                            <label htmlFor="eq_5" className="checkbox">
                                                設備位置
                                            </label>
                                            <input type="checkbox" name id="eq_6" />
                                            <label htmlFor="eq_6" className="checkbox">
                                                啟用日期
                                            </label>
                                            <input type="checkbox" name id="eq_7" />
                                            <label htmlFor="eq_7" className="checkbox">
                                                設備狀態
                                            </label>
                                            <input type="checkbox" name id="eq_8" />
                                            <label htmlFor="eq_8" className="checkbox">
                                                故障度
                                            </label>
                                            <input type="checkbox" name id="eq_9" />
                                            <label htmlFor="eq_9" className="checkbox">
                                                健康度
                                            </label>
                                            <input type="checkbox" name id="eq_10" />
                                            <label htmlFor="eq_10" className="checkbox">
                                                評估原因
                                            </label>
                                            <input type="checkbox" name id="eq_11" />
                                            <label htmlFor="eq_11" className="checkbox">
                                                保修狀態
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dia_footer f5_bg">
                        <div className="dia_btn btn_blue">新增</div>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ReportMgt;
