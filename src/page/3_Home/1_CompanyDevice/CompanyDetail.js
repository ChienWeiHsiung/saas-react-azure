import React, {  useContext,  } from "react";
import { NavLink } from "react-router-dom";
import '../../../css/saas.css'

// import Img from '../../../img/Img.svg';

import Lines from './components/Lines';
import Doughnuts from './components/Doughnuts';
import Scatters from './components/Scatters';

import Sidebar from "../../../components/Sidebar";
import LinkTitle from '../components/LinkTitle';

import { UserContext } from "../../../container/UserContextProvider";

const CompanyDetail = () =>{
    let title_text = "臺北三重廠";

    /*--------------Context Provider--------------*/

    const { factoryClickedIndex, factoryData } = useContext(UserContext);
    const selectedFactory = factoryData[factoryClickedIndex].factory;
    const selectedEquipment = factoryData[factoryClickedIndex].equipment;
    const selectedEdge = factoryData[factoryClickedIndex].edge;
    console.log("In FactoryMgt : ");
    console.log(factoryData);
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
            const prevDate = new Date(prev.CN_EQPAD);
            const currentDate = new Date(current.CN_EQPAD);
            return prevDate > currentDate ? prev : current;
        });
        const date = new Date(latestObject);
        edgeDate = `自${date.getFullYear()}年${date.getMonth() + 1}月${date.getMonth() + 1}日起`;
    }
    
    return <>
        <Sidebar/>
        <main className="main">
            <LinkTitle title_text={title_text}/>

            <div className="row_">
                <div className='row_row_col'>
                    <div className="box factory_content col_l">
                        <div className="detail_text_col">
                            <div className="detail_text">
                                <ul className="equipmen_text">
                                    <li>
                                        <h3 className="h3subtitle">工廠編號</h3>
                                        {selectedFactory.CN_FACNO}
                                    </li>
                                    <li>
                                        <h3 className="h3subtitle">工廠類型</h3>
                                        {selectedFactory.CL_FACTYPE}
                                    </li>
                                </ul>
                                <ul className="equipmen_text">
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
                                <h3 className="h3subtitle">地址</h3>
                                {selectedFactory.CL_FACCOUNTY + selectedFactory.CL_FACDISTRICT + selectedFactory.CN_FACADDRESS}
                            </div>
                        </div>
                        <div className="equipment">
                            <img className="equipment_img" src={`data:image/jpeg;base64,${selectedFactory.CN_FACPHOTO}`} alt="尚無圖片"></img>
                        </div>
                    </div>

                    <NavLink to={null}>
                    {/* <NavLink to={"/EdgeDevice"}> */}
                        <div className="box boxHover">
                            <h3 className="h3subtitle">邊緣設備數量</h3>
                            <span className="count">
                                {selectedEdge.length + " "} <small className="unit">台</small>{" "}
                            </span>
                            <div className="startTime">{edgeDate}</div>
                        </div>
                    </NavLink>
                    {/* <NavLink to={"/EquipmentDevice"}> */}
                    <NavLink to={null}>
                        <div className="box boxHover">
                            <h3 className="h3subtitle">設備數量</h3>
                            <span className="count">
                                {selectedEquipment.length + " "} <small className="unit">台</small>{" "}
                            </span>
                            <div className="startTime">{equipmentDate}</div>
                        </div>
                    </NavLink>
                </div>
                <div className='row_row_col'>
                    <Lines/>
                    <NavLink to={null}>
                    {/* <NavLink to={"/EquipmentDevice"}> */}
                        <div className="box boxHover">
                            <h3 className="h3subtitle">待處理設備</h3>
                            <span className="count">
                                1 <small className="unit">台</small>{" "}
                            </span>
                            <div className="startTime">自2023年2月10日起</div>
                        </div>
                    </NavLink>
                    <NavLink to={null}>
                    {/* <NavLink to={"/EquipmentDevice"}> */}
                        <div className="box boxHover">
                            <h3 className="h3subtitle">已處裡設備</h3>
                            <span className="count">
                                4 <small className="unit">台</small>{" "}
                            </span>
                            <div className="startTime">自2023年2月10日起</div>
                        </div>
                    </NavLink>
                </div>

                <div className="row_col">
                    <Scatters/>
                    <Doughnuts/>
                </div>
            </div>
        </main>
    </>
}

export default CompanyDetail