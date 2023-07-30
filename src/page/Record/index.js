import React, {  useContext } from "react";

import '../../css/saas.css'

import Sidebar from "../../components/Sidebar";
import Title from '../../components/Title';

import { UserContext } from "../../container/UserContextProvider";

const Record = () => {

    const {  factoryData } = useContext(UserContext);

    let title_text = "傳輸資訊";
    let title_path_array = ["設備監控儀表板", "傳輸資訊"];
    let buttonCount = title_path_array.length;
    let link_array = ["/Home", "/Record"];

    const equipmentRender = () => {
        let renderData = []
        let count = 1;

        let data = factoryData;
        for (let i = 0; i < data.length; i++) {
            let factory = data[i];
            // console.log( factory );
            let edge = factory.edge;
            for (let j = 0; j < edge.length; j++) {
                let upload = edge[j].CN_UPLOADINFO;
                for (let k = 0; k < upload.length; k++) {
                    // console.log(upload[k]);
                    let tmp = [
                        String(count).padStart(3, '0'),
                        factory.factory.CN_FACNAME,
                        edge[j].CN_EQPMODELNO,
                        upload[k].SIZE.toFixed(2) + " KB",
                        upload[k].DATALENGTH,
                        edge[j].CN_EDGNAME,
                        upload[k].DATETIME
                    ];
                    renderData.push(tmp);
                    count += 1;
                }
            }
        }
        console.log(renderData);

        return renderData.map((data, index) => (
            <tr key={index}>
                <td>{data[0]}</td>
                <td>{data[1]}</td>
                <td>{data[2]}</td>
                <td>{data[3]}</td>
                <td>{data[4]}</td>
                <td>{data[5]}</td>
                <td>{data[6]}</td>
            </tr>
        ));
    };

    return <>
        <Sidebar />
        <main className="main">
            <Title title_text={title_text} buttonCount={buttonCount} title_path_array={title_path_array} link_array={link_array} />

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
                    
                </div>

            </div> */}

            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>
                            <div className="thead_text">
                                工廠名稱
                            </div>
                        </th>
                        <th>
                            <div className="thead_text">
                                設備型號
                            </div>
                        </th>
                        {/* <th>
                            <div className="thead_text">
                                生產項目
                            </div>
                        </th> */}
                        <th>
                            <div className="thead_text">
                                檔案大小
                            </div>
                        </th>
                        <th>
                            <div className="thead_text">
                                數據量
                            </div>
                        </th>
                        <th>
                            <div className="thead_text">
                                訊號源
                            </div>
                        </th>
                        <th>
                            <div className="thead_text">
                                上傳時間
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { equipmentRender() }
                    {/* <tr>
                        <td>001</td>
                        <td>台北三重廠</td>
                        <td>YOTO - 130T</td>
                        <td>Aritcle 001</td>
                        <td>20KB</td>
                        <td>0.02MB</td>
                        <td>EDGE-001</td>
                        <td>2023-02-10 14:00:20</td>
                    </tr>

                    <tr>
                        <td>002</td>
                        <td>台北三重廠</td>
                        <td>YOTO - 130T</td>
                        <td>Aritcle 001</td>
                        <td>20KB</td>
                        <td>0.02MB</td>
                        <td>EDGE-001</td>
                        <td>2023-02-10 14:00:20</td>
                    </tr>

                    <tr>
                        <td>003</td>
                        <td>台北三重廠</td>
                        <td>YOTO - 130T</td>
                        <td>Aritcle 001</td>
                        <td>20KB</td>
                        <td>0.02MB</td>
                        <td>EDGE-001</td>
                        <td>2023-02-10 14:00:20</td>
                    </tr> */}
                </tbody>
            </table>
        </main>
    </>
}

export default Record