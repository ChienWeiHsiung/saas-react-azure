import {NavLink} from 'react-router-dom';
import React from "react";
// import { LinkContext } from '../../../container/LinkProvider';

import '../../../css/saas.css'

import Sidebar from "../../../components/Sidebar";
import LinkTitle from '../components/LinkTitle';
const EdgeDevice = () =>{
    let title_text = "邊緣設備儀表板";

    //加入下一頁路徑
    // const { addPathData } = useContext(LinkContext);
    // const handleVisitPage = () => {
    //     // const path = {title:'邊緣設備儀表板', link: '/EdgeDetail'};
    //     // addPathData(path);
    // };
    
    return <>
        <Sidebar/>
        <main className="main">
            <LinkTitle title_text={title_text}/>
            {/* <div className="dropdowns">
                <div className="dropdown">
                    <button className="dropbtn">全部設備<i className="arrow-down"></i></button>
                    <div className="dropdown-content">
                        <span>全部設備</span>
                        <span>已處理設備</span>
                        <span>待處理設備</span>
                    </div>
                </div>

                <div className="dropdown">
                    <button className="dropbtn">全部工廠<i className="arrow-down"></i></button>
                    <div className="dropdown-content">
                        <span>Link 1</span>
                        <span>Link 2</span>
                        <span>Link 3</span>
                    </div>
                </div>
            </div> */}

            <div className="equipment_row_col">
                <NavLink to={null}>
                {/* <NavLink to={"/EdgeDetail"} onClick={handleVisitPage}> */}
                    <div className="box boxHover">
                        <h2 className="company_name">邊緣設備1號機
                            <small>已使用</small>
                        </h2>
                        <div className="equipmen_ul_content">
                            <ul className="equipmen_ul">
                                <li>設備編號 : <span>EG350-01</span></li>
                                <li>設備型號 : <span>Eg-350v</span></li>
                                <li>使用設備代號 : <span>CH100-01</span></li>
                                <li>使用年代 : <span>至2027年1月20日</span></li>
                            </ul>
                            <div className="equipment_small">
                                <img className='equipment_img' src={require("../../../img/equipment_pic/EG350-01.jpg")} alt=""></img>
                            </div>
                        </div>
                    </div>
                </NavLink>
            </div>
        </main>
    </>
}

export default EdgeDevice