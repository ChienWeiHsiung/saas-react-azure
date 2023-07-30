import Logo from "../../../components/Logo"
import Background from "../../../components/Background"

import TitleLogin from "../../../components/TitleLogin.jsx"
import InputWhite from "../../../components/InputWhite.jsx"
import Submit from "../../../components/Submit.jsx"

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../../../css/login.css';
import API_URL from "../../../config"


const ForgetPwd = () =>{
    let main_title = "忘記密碼"
    let sub_title = "請輸入您的手機號碼以核對身分"
    let placeholder = "手機號碼"
    let link = "/MailCaptcha"
    let submit_text = "下一步"

    const navigate = useNavigate();
    const [inputPhone, setInputPhone] = useState("");

    
    const handleClick = (event) => {
        // 預防頁面跳轉
        event.preventDefault();
        // 輸入確認
        if (inputPhone === "") {
            alert('有空');
            return;
        }else{
            fetch(API_URL + "loginCaptcha", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone: inputPhone
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
                        console.log(data.captcha);
                        navigate("/MailCaptcha", { state: { captcha: data.captcha } });
                    } 
                })
                .catch((error) => {
                    console.error("API Request Error:", error);
                });
        }
    };

    return <>
        <Logo/>
        <main className='login_main'>
            <Background/>
            <div className="login_input_group">
                <TitleLogin main_title={main_title} sub_title={sub_title}/>
                <InputWhite placeholder={placeholder} value={inputPhone} onChange={(event) => setInputPhone(event.target.value)}/>
                <Submit link={link} defaultValue = {submit_text} onClick={(event) => handleClick(event)}/>
            </div>
        </main>
    </>
}

export default ForgetPwd