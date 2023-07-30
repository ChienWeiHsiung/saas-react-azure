import '../../../css/saas.css'
import { NavLink } from 'react-router-dom';

import Sidebar from "../../../components/Sidebar";
import LinkTitle from '../components/LinkTitle';


const EquipmentDetail = () =>{
    let title_text = "設備1";
    return <>
        <Sidebar/>
        <main className="main">
            <LinkTitle title_text={title_text} />
            
            <div className='row_row_col'>
                <div className="box detail_content col_l">
                    <div className="detail_text">
                        <ul className="equipmen_info">
                            <li>
                                <h3 className="h3subtitle">設備編號</h3>
                                <p>CH100-01</p>
                            </li>
                            <li>
                                <h3 className="h3subtitle">設備類型</h3>
                                <p>射出成型機</p>
                            </li>
                            <li>
                                <h3 className="h3subtitle">設備型號</h3>
                                <p>YOTO-130T</p>
                            </li>
                            <li>
                                <h3 className="h3subtitle">設備位置</h3>
                                <p>臺北三重廠</p>
                            </li>
                        </ul>
                        <ul className="equipmen_info">
                            <li>
                                <h3 className="h3subtitle">啟用日期</h3>
                                <p>2023-02-01</p>
                            </li>
                            <li>
                                <h3 className="h3subtitle">到期日期</h3>
                                <p>2019-08-26</p>
                            </li>
                        </ul>
                    </div>
                    <div className="equipment">
                        <img className='equipment_img' src={require("../../../img/equipment_pic/S__70017027.jpg")} alt=""></img>
                    </div>
                </div>
                
                <div className="box">
                    <h3 className="h3subtitle">故障度</h3>
                    <div className="degree_failure_container">
                        <div className="degree_failure_I degree_selected">I級 <span id="degree_caption">無故障</span> </div>
                        <div className="degree_failure_II">II級</div>
                        <div className="degree_failure_III">III級</div>
                        <div className="degree_failure_IV">IV級</div>
                        <div className="degree_failure_V">V級</div>
                    </div>
                </div>
                <div className="box">
                    <h3 className="h3subtitle">健康度</h3>
                    <div className="health"></div>
                </div>
            </div>

            <h2 className="subtitle">最新傳輸數據</h2>
            <table>
                <thead>
                    <tr>
                        <th>
                            <div className="thead_text">故障度</div>
                        </th>
                        <th>
                            <div className="thead_text">故障度分數</div>
                        </th>
                        <th>
                            <div className="thead_text">健康度分數</div>
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>IV</td>
                        <td>85.6%</td>
                        <td>30%</td>
                        <td>2023-02-09</td>
                        <td>尚未保修</td>
                        <td>料管受損</td>
                        <td>尚未保修</td>
                    </tr>
                </tbody>
            </table>

            <div className='dividing_line'></div>

            <h2 className="subtitle">使用邊緣設備</h2>
                <div className='row_row_col'>
                    <div className="box detail_content col_l">
                        <div className="detail_text">
                            <ul className="equipmen_info">
                                <li>
                                    <h3 className="h3subtitle">設備編號</h3>
                                    <p>EG350-01</p>
                                </li>
                                <li>
                                    <h3 className="h3subtitle">設備型號</h3>
                                    <p>Eg-350v</p>
                                </li>
                                <li>
                                    <h3 className="h3subtitle">剩餘空間</h3>
                                    <p>206.5GB</p>
                                </li>
                                <li>
                                    <h3 className="h3subtitle">設備位置</h3>
                                    <p>台北三重廠</p>
                                </li>
                            </ul>
                            <ul className="equipmen_info">
                                <li>
                                    <h3 className="h3subtitle">啟用日期</h3>
                                    <p>2023-02-01</p>
                                </li>
                                <li>
                                    <h3 className="h3subtitle">到期日期</h3>
                                    <p>2019-08-26</p>
                                </li>
                            </ul>
                        </div>
                        <div className="equipment">
                            <img className='equipment_img' src={require("../../../img/equipment_pic/EG350-01.jpg")} alt=""></img>
                        </div>
                    </div>
                    
                    <NavLink to={"/Record"}>
                        <div className="box">
                            <h3 className="h3subtitle">累計數據量</h3>
                            <span className="count">21,135 <small className="unit">筆</small> </span>
                        </div>
                    </NavLink>
                </div>


            <h2 className="subtitle">最新傳輸數據</h2>
            <table>
                <thead>
                    <tr>
                        <th>
                            <div className="thead_text">連線埠</div>
                        </th>
                        <th>
                            <div className="thead_text">工廠名稱</div>
                        </th>
                        <th>
                            <div className="thead_text">設備編號</div>
                        </th>
                        <th>
                            <div className="thead_text">生產項目</div>
                        </th>
                        <th>
                            <div className="thead_text">檔案大小</div>
                        </th>
                        <th>
                            <div className="thead_text">累積數據量</div>
                        </th>
                        <th>
                            <div className="thead_text">更新時間</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>接點1</td>
                        <td>台北三重廠</td>
                        <td>Eqpt-001</td>
                        <td>良好</td>
                        <td>85.8%</td>
                        <td>24.8%</td>
                        <td>2023-02-14  09:26:12</td>
                    </tr>
                </tbody>
            </table>
        </main>


    </>
}

export default EquipmentDetail