import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LinkProvider } from './container/LinkProvider';



// 登入
import Saas from "./page/0_Saas";

// 企業註冊
import PresetPwd from "./page/1_1_Company/2_PresetPwd";
import RevisePwd from "./page/1_1_Company/3_RevisePwd";
import Apply from "./page/1_1_Company/4_Apply";
import CompanyConnect from "./page/1_1_Company/5_CompanyConnect";

// 人員註冊
import SetProfile from "./page/1_2_Personnel/2_SetProfile";
import Captcha from "./page/1_2_Personnel/3_Captcha";
import SetPwd from "./page/1_2_Personnel/4_SetPwd";
import Join from "./page/1_2_Personnel/5_Join";
import Wait from "./page/1_2_Personnel/6_Wait";

// 一般登入
import Pwd from "./page/1_3_Login/2_Pwd";
import ForgetPwd from "./page/1_3_Login/3_ForgetPwd";
import MailCaptcha from "./page/1_3_Login/4_MailCaptcha";
import ResetPwd from "./page/1_3_Login/5_ResetPwd";

// 帳戶資訊
import Account from "./page/2_Account/index";

// 報表檢視
import Home from "./page/3_Home/0_Report/index";
import CompanyDevice from "./page/3_Home/1_CompanyDevice/CompanyDevice";
import CompanyDetail from "./page/3_Home/1_CompanyDevice/CompanyDetail";
import EquipmentDevice from "./page/3_Home/2_EquipmentDevice/EquipmentDevice";
import EquipmentDetail from "./page/3_Home/2_EquipmentDevice/EquipmentDetail";
import EdgeDevice from "./page/3_Home/3_EdgeDevice/EdgeDevice";
import EdgeDetail from "./page/3_Home/3_EdgeDevice/EdgeDetail";

//傳輸資訊
import Record from "./page/Record"

//工廠管理
import FactoryAndDevice from "./page/4_Factory/FactoryAndDevice";
import FactoryMgt from "./page/4_Factory/FactoryMgt/index";
import EquipmentMgt from "./page/4_Factory/EquipmentMgt";

//權限管理
import Permission from "./page/5_Permission";

//報表管理
import ReportMgt from "./page/6_ReportMgt";

import UserContextProvider from "./container/UserContextProvider";
function App() {
    return (
        <>
            <Router>
                <Routes>
                {/*------------------------ 初始登入 ------------------------*/}
                    <Route path="/" exact element={<Saas />} />
                {/*------------------------ Company ------------------------*/}
                    <Route path="/PresetPwd" element={<PresetPwd />} />
                    <Route path="/RevisePwd" element={<RevisePwd />} />
                    <Route path="/Apply" element={<Apply />} />
                    <Route path="/CompanyConnect" element={<CompanyConnect />} />
                {/*------------------------ Personnel ------------------------*/}
                    <Route path="/SetProfile" element={<SetProfile />} />
                    <Route path="/Captcha" element={<Captcha />} />
                    <Route path="/SetPwd" element={<SetPwd />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/Wait" element={<Wait />} />
                {/*------------------------ Login ------------------------*/}
                    <Route path="/Pwd" element={
                        <UserContextProvider>
                            <Pwd />
                        </UserContextProvider>
                    } />
                    <Route path="/ForgetPwd" element={<ForgetPwd />} />
                    <Route path="/MailCaptcha" element={<MailCaptcha />} />
                    <Route path="/ResetPwd" element={<ResetPwd />} />
                {/*------------------------ 帳號資訊 ------------------------*/}
                    <Route path="/Account" element={<UserContextProvider><Account /></UserContextProvider>} />
                {/*------------------------- 主畫面 -------------------------*/}
                <Route path="/Home" element={<UserContextProvider><LinkProvider><Home /></LinkProvider></UserContextProvider>} />
                    <Route path="/CompanyDevice" element={<UserContextProvider><LinkProvider><CompanyDevice /></LinkProvider></UserContextProvider>} />
                    <Route path="/CompanyDetail" element={<UserContextProvider><LinkProvider><CompanyDetail /></LinkProvider></UserContextProvider>} />
                    <Route path="/EquipmentDevice" element={<UserContextProvider><LinkProvider><EquipmentDevice /></LinkProvider></UserContextProvider>} />
                    <Route path="/EquipmentDetail" element={<UserContextProvider><LinkProvider><EquipmentDetail /></LinkProvider></UserContextProvider>} />
                    <Route path="/EdgeDevice" element={<UserContextProvider><LinkProvider><EdgeDevice /></LinkProvider></UserContextProvider>} />
                    <Route path="/EdgeDetail" element={<UserContextProvider><LinkProvider><EdgeDetail /></LinkProvider></UserContextProvider>} />
                {/*------------------------ 工廠管理 ------------------------*/}
                    <Route path="/FactoryAndDevice" element={<UserContextProvider><FactoryAndDevice /></UserContextProvider>} />
                    <Route path="/FactoryMgt" element={<UserContextProvider><FactoryMgt /></UserContextProvider>} />
                    <Route path="/EquipmentMgt" element={<UserContextProvider><EquipmentMgt /></UserContextProvider>} />
                {/*------------------------ 權限管理 ------------------------*/}    
                    <Route path="/Permission" element={<UserContextProvider><Permission /></UserContextProvider>} />
                {/*------------------------ 傳輸資訊 ------------------------*/}
                    <Route path="/Record" element={<UserContextProvider><Record /></UserContextProvider>} />
                {/*------------------------ 報表管理 ------------------------*/}
                    <Route path="/ReportMgt" element={<UserContextProvider><ReportMgt /></UserContextProvider>} />
                </Routes>
            </Router>
        </>
    )
}

export default App










