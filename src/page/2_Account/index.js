import '../../css/saas.css'

import { useState } from "react";

import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";
// import SubSidebar from '../../components/SubSidebar';
import SwitchSection from "./components/SwitchSection";
import Profile from "./1_Profile";
import ChangePwd from "./2_ChangePwd";
import CompanyProfile from "./3_CompanyProfile";
import PremiumPlan from "./4_PremiumPlan";
import Payment from "./5_Payment";
import Bill from "./6_Bill";

const Acoount = () =>{
    let title_text = "帳戶資訊";
    let title_path_array = ["帳戶資訊", "編輯個人檔案"];
    let buttonCount = title_path_array.length;
    let link_array = ["/Profile","/Profile"];

    /*--------------部分跳轉--------------*/
    //-----第一層
    //預設開啟的畫面
    const [isSelected, setIsSelected] = useState("1");
    const handleClick = (option) => {
        setIsSelected(option);
    };
    //區塊
    const selection =[
        {
            title: "個人",
            content:[
                {id: "1", option: "編輯個人檔案"},
                {id: "2", option: "變更密碼"},
            ]
        },
        {
            title: "企業",
            content:[
                {id: "3", option: "編輯企業檔案"},
                {id: "4", option: "訂閱方案"},
                {id: "5", option: "付款方式"},
                {id: "6", option: "帳單紀錄"}
            ]
        }
    ];
    return <>
        <Sidebar/>
        <main className="main">
            <Title title_text={title_text} buttonCount={buttonCount} title_path_array={title_path_array} link_array={link_array}/>

            <div className="profile_col">
                <SwitchSection handleClick={handleClick} isSelected={isSelected} selection={selection}/>
                {isSelected === "1" && <Profile/>}
                {isSelected === "2" && <ChangePwd/>}
                {isSelected === "3" && <CompanyProfile/>}
                {isSelected === "4" && <PremiumPlan/>}
                {isSelected === "5" && <Payment/>}
                {isSelected === "6" && <Bill/>}
            </div>

        </main>
    </>
}

export default Acoount