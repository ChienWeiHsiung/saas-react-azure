import Logo from "../../../components/Logo"
import Background from "../../../components/Background"

import TitleLogin from "../../../components/TitleLogin.jsx"
import InputWhite from "../../../components/InputWhite.jsx"
import Submit from "../../../components/Submit.jsx"

import Reciprocal from "./components/Reciprocal"

import { useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";

import '../../../css/login.css';


const MailCaptcha = () =>{
    let main_title = "驗證碼"
    let sub_title = "驗證碼已寄送至您的電子信箱 t**t@test.com，請輸入5位數驗證碼"
    let link = "/RevisePwd"
    let submit_text = "驗證"

    const location = useLocation();
    const captcha = location.state.captcha;

    const navigate = useNavigate();
    const [inputCaptcha, setInputCaptcha] = useState("");

    const handleClick = (event) => {
        // 預防頁面跳轉
        event.preventDefault();
        // 輸入確認
        if (inputCaptcha === "" ) {
            alert('有空');
            return;
        }
        if ( inputCaptcha === captcha ){
            navigate('/ResetPwd');
        }else{
            alert("請輸入 : 0000")
        }
    };

    return <>
        <Logo/>
        <main className='login_main'>
            <Background/>
            <div className="login_input_group">
                <TitleLogin main_title={main_title} sub_title={sub_title}/>
                <InputWhite value={inputCaptcha} onChange={(event) => setInputCaptcha(event.target.value)}/>
                <Submit link={link} defaultValue = {submit_text} onClick={(event) => handleClick(event)}/>
                <Reciprocal/>
            </div>
        </main>
    </>
}

export default MailCaptcha