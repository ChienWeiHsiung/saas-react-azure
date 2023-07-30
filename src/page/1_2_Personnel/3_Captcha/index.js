import Logo from "../../../components/Logo"
import Background from "../../../components/Background"

import TitleLogin from "../../../components/TitleLogin.jsx"
import InputWhite from "../../../components/InputWhite.jsx"
import Submit from "../../../components/Submit.jsx"

import Reciprocal from "./components/Reciprocal"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import '../../../css/login.css';
import API_URL from '../../../config';


const Captcha = () => {
    let main_title = "驗證碼"
    let sub_title = "驗證碼已寄送至您的電子信箱，請輸入5位數驗證碼"
    let link = "/SetPwd"
    let submit_text = "驗證"

    const navigate = useNavigate();
    const [captcha, setCaptcha] = useState("");
    const [inputCaptcha, setInputCaptcha] = useState("");

    // 先從Server取得對應的驗證碼
    useEffect(() => {
        fetch(API_URL + "captcha", {
            method: "GET",
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
                    setCaptcha(data.captcha);
                } 
            })
            .catch((error) => {
                console.error("API Request Error:", error);
            });
    }, []);
    // 驗證碼比對
    const handleClick = (event) => {
        // 預防頁面跳轉
        event.preventDefault();
        // 輸入確認
        if (inputCaptcha === "") {
            alert('有空');
            return;
        }
        if ( inputCaptcha === captcha ) {
            console.log("True");
            navigate('/SetPwd');
        } else {
            console.log("False");
            alert("請輸入 : 0000")
        }
    };

    return <>
        <Logo />
        <main className='login_main'>
            <Background />
            <div className="login_input_group">
                <TitleLogin main_title={main_title} sub_title={sub_title} />
                <InputWhite value={inputCaptcha} onChange={(event) => setInputCaptcha(event.target.value)} />
                <Submit link={link} defaultValue={submit_text} onClick={(event) => handleClick(event)} />
                <Reciprocal />
            </div>
        </main>
    </>
}

export default Captcha