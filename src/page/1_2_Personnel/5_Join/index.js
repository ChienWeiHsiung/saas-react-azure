import Logo from "../../../components/Logo.jsx"
import Background from "../../../components/Background.jsx"

import TitleLogin from "../../../components/TitleLogin.jsx"
import InputWhite from "../../../components/InputWhite.jsx"
import Submit from "../../../components/Submit.jsx"

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../../../css/login.css';
import API_URL from "../../../config.js"

const Join = () =>{
    let main_title = "輸入代碼加入"
    let sub_title = ["請向負責人詢問企業代碼", <i className="circle-info" key='info'>i</i>]
    let placeholder = "組織代碼為9位元"
    let link = "/Wait"
    let submit_text = "申請加入"

    const navigate = useNavigate();
    const [inputCode, setInputCode] = useState("");

    const handleClick = (event) => {
        // 預防頁面跳轉
        event.preventDefault();
        // 輸入確認
        if (inputCode === "") {
            alert('有空');
            return;
        }
        // 呼叫API
        fetch( API_URL + "code", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ CN_TAXID : inputCode }),
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
                    navigate("/Wait");
                } else {
                    alert("代碼錯誤");
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
                <TitleLogin main_title = {main_title} sub_title = {sub_title}/>
                <InputWhite placeholder = {placeholder} value={inputCode} onChange={(event) => setInputCode(event.target.value)} />
                <Submit link={link} defaultValue = {submit_text} onClick={(event) => handleClick(event)}/>
            </div>
        </main>
    </>
}

export default Join