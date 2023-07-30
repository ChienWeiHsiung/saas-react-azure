// import { useNavigate} from 'react-router-dom';
import React, {  useEffect, useState, useContext } from "react";
// import { LinkContext } from '../../../container/LinkProvider';

import '../../../css/saas.css'
// import Img from '../../../img/Img.svg'

import Sidebar from "../../../components/Sidebar";
import LinkTitle from '../components/LinkTitle';

import { UserContext } from "../../../container/UserContextProvider";

const Company = () =>{
    let title_text = "企業儀表板";

    //加入下一頁路徑
    // const { addPathData } = useContext(LinkContext);
    const handleVisitPage = () => {
        // const path = {title:'企業儀表板', link:'/EdgeDetail'};
        // addPathData(path);
    };

    /*--------------Context Provider--------------*/
    const { setFactoryClickedIndex, factoryData } = useContext(UserContext);
    /*--------------Render的Info--------------*/
    // const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false);
    }, [factoryData]);

    const factoryClicked = (factoryIndex) => {
        setFactoryClickedIndex(factoryIndex);
        //navigate("/CompanyDetail");
        handleVisitPage();
    };

    const renderTable = () => {
        if (isLoading) {
            //加載數據時添加加載動畫 isLoading = true
            return (
                <div className="loading-animation">
                    {/* Loading... */}
                    <div className="loader"></div>
                </div>
            );
        }
        if (factoryData.length !== 0) {
            const factoriesCode = factoryData.map((item, index) => {
                let factory = item.factory;
                let equipment = item.equipment;

                return (
                    <div className="box boxHover" key={index} onClick={() => factoryClicked(index)}>
                        <h2 className="company_name">
                            {factory.CN_FACNAME}
                            <small>
                                設備數量
                                <span>{" " + equipment.length}</span>
                            </small>
                        </h2>
                        <div className="company">
                            <img className="company_img" src={`data:image/jpeg;base64,${factory.CN_FACPHOTO}`} alt={factory.CN_FACNAME + "-img"}></img>
                        </div>
                    </div>
                );
            });
            return factoriesCode;
        } else {
            return;
        }
    };
    return <>
        <Sidebar/>
        <main className="main">
            <LinkTitle title_text={title_text}/>
            <div className="company_row_col">
                {renderTable()}
            </div>
        </main>
    </>
}

export default Company