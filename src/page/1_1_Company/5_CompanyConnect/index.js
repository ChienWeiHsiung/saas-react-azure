import Logo from "../../../components/Logo"
import Background from "../../../components/Background.jsx";

import TitleLogin from "../../../components/TitleLogin.jsx";
import InputWhite from "../../../components/InputWhite.jsx";
import Submit from "../../../components/Submit.jsx";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../../../css/login.css';
import API_URL from "../../../config";


// ********************** 企業聯繫資訊 ************************* //
const CompanyConnect = () =>{
    let main_title = "企業聯繫窗口"
    let sub_title = "請輸入管理人連絡方式"
    let placeholder_1 = "姓名"
    let placeholder_2 = "手機"
    let placeholder_3 = "Email"
    let link = "/Home"
    let submit_text = "確認並登入"

    const [inputChargeName, setInputChargeName] = useState("");
    const [inputChargeMob, setInputChargeMob] = useState("");
    const [inputChargeEmail, setInputChargeEmail] = useState("");

    const navigate = useNavigate();

    const handleClick = (event) => {
        // 預防頁面跳轉
        event.preventDefault();
        // 輸入確認
        if (inputChargeName === "" || inputChargeMob === "" || inputChargeEmail === ""  ) {
            alert('有空');
            return;
        }
        // 呼叫API
        fetch( API_URL + "companyInCharge", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                CN_CHARGENAME: inputChargeName,
                CN_CHARGEMOB : inputChargeMob,
                CN_CHARGEEMAIL : inputChargeEmail
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
                    navigate('/');
                }
            })
            .catch((error) => {
                console.error("API Request Error:", error);
            });
    };

    return <>
        <Logo/>
        <main className='login_main'>
            <Background/>
            <div className="login_input_group">
                <TitleLogin main_title = {main_title} sub_title={sub_title}/>
                <InputWhite placeholder = {placeholder_1} value={inputChargeName} onChange={(event) => setInputChargeName(event.target.value)} />
                <InputWhite placeholder = {placeholder_2} value={inputChargeMob} onChange={(event) => setInputChargeMob(event.target.value)} />
                <InputWhite placeholder = {placeholder_3} value={inputChargeEmail} onChange={(event) => setInputChargeEmail(event.target.value)} />
                <Submit link={link} defaultValue = {submit_text} onClick={(event) => handleClick(event)}/>
            </div>
        </main>
    </>
}

export default CompanyConnect