import React, {  useContext,  useState } from "react";
// import {  useNavigate } from "react-router-dom";
// import { LinkContext } from '../../../container/LinkProvider';

import '../../../css/saas.css'

import Sidebar from "../../../components/Sidebar";
import LinkTitle from '../components/LinkTitle';

import { UserContext } from "../../../container/UserContextProvider";

const Equipment = () => {
    let title_text = "設備儀表板";

    //加入下一頁路徑
    // const { addPathData } = useContext(LinkContext);
    const handleVisitPage = () => {
        // const path = { title: '設備儀表板', link: '/EquipmentDetail' };

        // addPathData(path);
    };

    /*--------------Context Provider--------------*/
    const {  factoryData } = useContext(UserContext);
    const factoryList = [...new Set(factoryData.map((item) => item.factory.CN_FACNAME))];
    const modelList = [...new Set(factoryData.flatMap((item) => item.equipment.map((eqp) => eqp.CN_EQPMODELNO)))];

    const [factoryFilter, setFactoryFilter] = useState("----");
    const [modelFilter, setModelFilter] = useState("----");

    const renderEquipment = () => {
        let equipments = factoryData.flatMap((item) => {
            if (factoryFilter === "----") {
                return item.equipment;
            } else if (item.factory.CN_FACNAME === factoryFilter) {
                return item.equipment;
            } else {
                return [];
            }
        });
        equipments = equipments.filter((item) => {
            if (modelFilter === "----") {
                return item;
            } else if (item.CN_EQPMODELNO === modelFilter) {
                return item;
            } else {
                return false;
            }
        });
        return equipments;
    };
    let resultEquipments = renderEquipment();

    /*--------------Render的Info--------------*/
    // const navigate = useNavigate();
    const equipmentRender = () => {
        const equipOnClick = () => {
            //navigate("/EquipmentDetail");
            handleVisitPage();
        };
        const stringcheckfault = (equipment) => {
            if (equipment.hasOwnProperty('EDGE')) {
                if (equipment.EDGE.CN_FAILURE) {
                    return equipment.EDGE.CN_FAILURE + '%';
                } else {
                    return 'N/A';
                }
            } else {
                return 'N/A';
            }
        };
        const stringcheckhealth = (equipment) => {
            if (equipment.hasOwnProperty('EDGE')) {
                if (equipment.EDGE.CN_HEALTH) {
                    return equipment.EDGE.CN_HEALTH + '%';
                } else {
                    return 'N/A';
                }
            } else {
                return 'N/A';
            }
        };
        return resultEquipments.map((equipment, index) => (
            <div className="box boxHover" key={"equipment" + index} onClick={() => equipOnClick()}>
                <h2 className="company_name">
                    {equipment.CN_EQPNAME}
                    <small>{equipment.CN_EQPMODELNO}</small>
                </h2>
                <div className="equipmen_ul_content">
                    <ul className="equipmen_ul">
                        <li>
                            設備類型 : <span>{equipment.CL_EQPTYPE}</span>
                        </li>
                        <li>
                            設備型號 : <span>{equipment.CN_EQPMODELNO}</span>
                        </li>
                        <li>
                            故障度 : <span> {stringcheckfault(equipment)} </span>
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
    return (
        <>
            <Sidebar />
            <main className="main">
                <LinkTitle title_text={title_text} />

                <div className="dropdowns">
                    <div className="dropdown">
                        工廠
                        <button className="dropbtn">
                            {factoryFilter}
                            <i className="arrow-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <span onClick={() => setFactoryFilter("----")}>----</span>
                            {factoryList.map((factory, index) => (
                                <span key={"factory" + index} onClick={() => setFactoryFilter(factory)}>
                                    {factory}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="dropdown">
                        型號
                        <button className="dropbtn">
                            {modelFilter}
                            <i className="arrow-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <span onClick={() => setModelFilter("----")}>----</span>
                            {modelList.map((model, index) => (
                                <span key={"model" + index} onClick={() => setModelFilter(model)}>
                                    {model}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* <div className="dropdown">
                    狀態
                    <button className="dropbtn">
                        ----<i className="arrow-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <span>----</span>
                        <span>狀態1</span>
                        <span>狀態2</span>
                    </div>
                </div> */}
                </div>

                <div className="equipment_row_col">{equipmentRender()}</div>
            </main>
        </>
    )
}

export default Equipment