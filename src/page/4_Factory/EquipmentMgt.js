import React, {  useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import "../../css/saas.css";

import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";
import DoughnutSmall from "./components/DoughnutSmall";

// import { NavLink } from "react-router-dom";

import { UserContext } from "../../container/UserContextProvider";

import API_URL from "../../config";

const Details = () => {
    /*--------------Context Provider--------------*/

    const { equipmentClicked } = useContext(UserContext);
    const equipment = equipmentClicked;
    // console.log("Test");
    // console.log(equipment);
    const health = equipment.EDGE ? equipment.EDGE.CN_HEALTH : -1;
    const failure = equipment.EDGE ? equipment.EDGE.CN_FAILURE : -1;

    const bar = () => {
        let index_array = [0, 0, 0, 0, 0];
        let index = Math.floor(failure / 20);
        index_array[index] += 1;
        let css_array = [
            "degree_failure_I" + (index_array[0] === 1 ? " degree_selected" : ""), 
            "degree_failure_II" + (index_array[1] === 1 ? " degree_selected" : ""),
            "degree_failure_III" + (index_array[2] === 1 ? " degree_selected" : ""),
            "degree_failure_IV" + (index_array[3] === 1 ? " degree_selected" : ""),
            "degree_failure_V" + (index_array[4] === 1 ? " degree_selected" : ""),
        ];
        console.log(failure);
        return (
            <div className="degree_failure_container">
                <div className={css_array[0]}>I級</div>
                <div className={css_array[1]}>II級</div>
                <div className={css_array[2]}>III級</div>
                <div className={css_array[3]}>IV級</div>
                <div className={css_array[4]}>V級</div>
            </div>
        );
    };


    const [repairInfo, setRepairInfo] = useState([]);
    useEffect(() => {
        fetch(API_URL + "getRepairOfEquip", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                CN_FACINFO_UID: equipment.CN_UID,
            }),
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
                    console.log('Test');
                    console.log(data.data);
                    setRepairInfo(data.data);
                } else {
                    console.log("False");
                    alert("False");
                }
            })
            .catch((error) => {
                console.error("API Request Error:", error);
            });
    }, [equipment]);

    const render = () => {
        let data = [];
        // console.log(repairInfo);
        for (let i = 0; i < repairInfo.length; i++) {
            let log = repairInfo[i];
            let tmp = [
                log.CN_FAILURE + "%",
                log.CN_HEALTH + "%",
                log.CN_HS === false ? "立即保修" : "無須保修",
                log.CN_FALDT,
                log.CN_FIX === undefined ? "尚未保修" : log.CN_FIX,
                log.CN_REASON === undefined ? "-" : log.CN_REASON,
                log.CN_METHOD === undefined ? "-" : log.CN_METHOD,
                log.CN_HS,
            ];
            data.push(tmp);
        }
        // console.log(data);
        return data;
    };
    let repairData = render();

    const equipmentRender = () => {
        let renderData = [];
        let count = 1;
        // console.log(equipment);
        if (equipment.EDGE === undefined) {
            return [];
        }
        let uploadedData = equipment.EDGE.CN_UPLOADINFO;
        if (uploadedData.length === 0) {
            return [];
        }
        // console.log(uploadedData);
        for (let i = 0; i < uploadedData.length; i++) {
            let uploadData = uploadedData[i];
            let tmp = [
                String(count).padStart(3, "0"),
                equipment.EDGE.CN_FACINFO_NAME,
                equipment.EDGE.CN_EQPMODELNO,
                uploadData.SIZE.toFixed(2) + " KB",
                uploadData.DATALENGTH,
                equipment.EDGE.CN_EDGNAME,
                uploadData.DATETIME,
            ];
            renderData.push(tmp);
            count += 1;
        }
        // console.log(renderData);
        return renderData;
    };
    let uploadData = equipmentRender();

    const countAmount = () => {
        let count = 0;
        if (equipment.EDGE === undefined) {
            return 0;
        }
        let uploadedData = equipment.EDGE.CN_UPLOADINFO;
        if (uploadedData.length === 0) {
            return 0;
        }
        // console.log(uploadedData);
        for (let i = 0; i < uploadedData.length; i++) {
            let uploadData = uploadedData[i];
            count += uploadData.DATALENGTH;
        }
        return count;
    };
    let amount = countAmount();

    let title_text = equipment.CN_EQPNAME;
    let title_path_array = ["資產清單管理", "設備儀錶板", "設備資訊"];
    let buttonCount = title_path_array.length;
    let link_array = ["/Report", "/Equipment", "/Details"];
    return (
        <>
            <Sidebar />
            <main className="main">
                <Title title_text={title_text} buttonCount={buttonCount} title_path_array={title_path_array} link_array={link_array} />

                <div className="row_row_col">
                    <div className="box detail_content col_l">
                        <div className="detail_text">
                            <ul className="equipmen_info">
                                <li>
                                    <h3 className="h3subtitle">設備編號</h3>
                                    <p>{equipment.CN_EQPNO}</p>
                                </li>
                                <li>
                                    <h3 className="h3subtitle">設備類型</h3>
                                    <p>{equipment.CL_EQPTYPE}</p>
                                </li>
                                <li>
                                    <h3 className="h3subtitle">設備型號</h3>
                                    <p>{equipment.CN_EQPMODELNO}</p>
                                </li>
                                <li>
                                    <h3 className="h3subtitle">設備位置</h3>
                                    <p>{equipment.CN_EQPAREA}</p>
                                </li>
                            </ul>
                            <ul className="equipmen_info">
                                <li>
                                    <h3 className="h3subtitle">啟動日期</h3>
                                    <p>{equipment.CN_EQPAD}</p>
                                </li>
                                <li>
                                    <h3 className="h3subtitle">使用邊緣設備</h3>
                                    <p>{equipment.hasOwnProperty("EDGE") ? equipment.EDGE.CN_EDGNAME : "N/A"}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="equipment">
                            <img className="equipment_img" src={`data:image/jpeg;base64,${equipment.CN_EQPPHOTO}`} alt="TOYO-TM100"></img>
                        </div>
                    </div>

                    <div className="box failure_container">
                        <h3 className="h3subtitle">故障度</h3>
                        { bar() }
                        {/* <div className="degree_failure_container">
                            <div className="degree_failure_I">I級</div>
                            <div className="degree_failure_II">II級</div>
                            <div className="degree_failure_III">III級</div>
                            <div className="degree_failure_IV">IV級</div>
                            <div className="degree_failure_V degree_selected">V級</div>
                        </div> */}
                        <div className="state_caption">
                            <p className="state_p_V">{ failure === -1 ? 'N/A' : '立即保修'}</p>
                            <span className="score">{ failure === -1 ? 'N/A' : failure + '%'}</span>
                        </div>
                    </div>
                    <div className="box">
                        <h3 className="h3subtitle">健康度</h3>
                        <div className="health_container">
                            <div className="health_caption">
                                <p className="state_p_V">{ health === -1 ? 'N/A' : '立即保養'}</p>
                                <span className="score">{ health === -1 ? 'N/A' : health + '%'}</span>
                            </div>
                            <DoughnutSmall array={[health, 100-health]}/>
                        </div>
                    </div>
                </div>

                <h2 className="subtitle">處理資訊清單</h2>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <div className="thead_text">故障度分數</div>
                            </th>
                            <th>
                                <div className="thead_text">健康度分數</div>
                            </th>
                            <th>
                                <div className="thead_text">保修狀態</div>
                            </th>
                            <th>
                                <div className="thead_text">故障日期</div>
                            </th>
                            <th>
                                <div className="thead_text">保修日期</div>
                            </th>
                            <th>
                                <div className="thead_text">故障原因</div>
                            </th>
                            <th>
                                <div className="thead_text">處理方式</div>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {repairData.map((item, index) => (
                            <tr key={index}>
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                                <td>{item[2]}</td>
                                <td>{item[3]}</td>
                                <td>{item[4]}</td>
                                <td>{item[5]}</td>
                                <td>{item[6]}</td>
                                <td>{item[7] === false ? <input type="button" className="red_btn" value={"待保修"}></input> : <input type="button" className="grey_btn" value={"已保修"}></input>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="dividing_line"></div>

                <h2 className="subtitle">使用邊緣設備</h2>
                <div className="row_row_col">
                    {equipment.EDGE && (
                        <div className="box detail_content col_l">
                            <div className="detail_text">
                                <ul className="equipmen_info">
                                    <li>
                                        <h3 className="h3subtitle">設備編號</h3>
                                        <p>{equipment.EDGE.CN_EDGNO}</p>
                                    </li>
                                    <li>
                                        <h3 className="h3subtitle">設備型號</h3>
                                        <p>{equipment.EDGE.CN_EDGMODELNO}</p>
                                    </li>
                                    <li>
                                        <h3 className="h3subtitle">設備位置</h3>
                                        <p>{equipment.EDGE.CN_FACINFO_NAME}</p>
                                    </li>
                                </ul>
                                <ul className="equipmen_info">
                                    <li>
                                        <h3 className="h3subtitle">啟用日期</h3>
                                        <p>{equipment.EDGE.CN_EDGAD}</p>
                                    </li>
                                    <li>
                                        <h3 className="h3subtitle">到期日期</h3>
                                        <p>--</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="equipment">
                                <img className="equipment_img" src={require("../../img/equipment_pic/EG350-01.jpg")} alt="" />
                            </div>
                        </div>
                    )}

                    {/* <NavLink to={"/Record"}> */}
                    {equipment.EDGE && (
                        <div className="box">
                            <h3 className="h3subtitle">累計數據量</h3>
                            <span className="count">
                                {amount.toLocaleString()} <small className="unit">筆</small>{" "}
                            </span>
                        </div>
                    )}
                    {/* </NavLink> */}
                </div>

                <h2 className="subtitle">傳輸資訊</h2>
                <table>
                    <thead>
                        <tr>
                            <td>No</td>
                            <th>
                                <div className="thead_text">工廠名稱</div>
                            </th>
                            <th>
                                <div className="thead_text">設備型號</div>
                            </th>
                            <th>
                                <div className="thead_text">檔案大小</div>
                            </th>
                            <th>
                                <div className="thead_text">累積數據量</div>
                            </th>
                            <th>
                                <div className="thead_text">訊號源</div>
                            </th>
                            <th>
                                <div className="thead_text">上傳時間</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {uploadData.map((item, index) => (
                            <tr key={index}>
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
                    </tbody>
                </table>
            </main>
        </>
    );
};

export default Details;
