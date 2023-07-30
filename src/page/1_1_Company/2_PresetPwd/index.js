import {NavLink} from 'react-router-dom';

import '../../../css/login.css';

import Logo from "../../../components/Logo"
import Background from "../../../components/Background.jsx";

import TitleLogin from "../../../components/TitleLogin.jsx";
// import InputWhite from "../../../components/InputWhite.jsx";
import Submit from "../../../components/Submit.jsx";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import API_URL from '../../../config';


// ********************* 企業預設密碼登入 **************************** //
const PresetPwd = () =>{
    let main_title = "請輸入密碼"
    let sub_title = "此帳號已註冊，請輸入6~12位數密碼"
    let link = "/RevisePwd"
    let submit_text = "登入"

    const navigate = useNavigate();

    const [presetPwd, setPresetPwd] = useState("");

    useEffect(() => {
        fetch(API_URL + "getPresetPwd", {
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
                    setPresetPwd(data.password);
                } 
            })
            .catch((error) => {
                console.error("API Request Error:", error);
            });
    }, []);

    const handleClick = (event) => {
        // 預防頁面跳轉
        event.preventDefault();
        // 輸入確認
        navigate("/RevisePwd");
    };

    return <>
    {/* ForgetPwd */}
        <Logo/>
        <main className='login_main'>
            <Background/>
            <div className="login_input_group">
                <TitleLogin main_title={main_title} sub_title={sub_title}/>
                <input className="input_white" type="text" placeholder={presetPwd} value={presetPwd}  disabled={true} />
                <Submit link={link} defaultValue={submit_text} onClick={(event) => handleClick(event)}/>
                <NavLink to={"/forgetPwd"}>
                    <input className="pwd_link" type="button" defaultValue="忘記密碼" />
                </NavLink>
            </div>
        </main>
    </>
}

export default PresetPwd