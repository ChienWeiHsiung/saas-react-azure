import Logo from "../../../components/Logo"
import Background from "../../../components/Background"

import TitleLogin from "../../../components/TitleLogin.jsx"
import InputWhite from "../../../components/InputWhite.jsx"
import Submit from "../../../components/Submit.jsx"

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../../../css/login.css';
import API_URL from "../../../config"


const ResetPwd = () =>{
    let main_title = "重設密碼"
    let sub_title = "請重新設定6-12字元數字與英文字母密碼"
    let placeholder = "設定密碼"
    let placeholder2 = "確認密碼"
    let link = "/Home"
    let submit_text = "更新密碼登入"

    const navigate = useNavigate();
    const [inputSetPwd, setInputSetPwd] = useState("");
    const [inputConfirm, setInputConfirm] = useState("");

    const handleClick = (event) => {
        // 預防頁面跳轉
        event.preventDefault();
        // 輸入確認
        if (inputSetPwd === "" || inputConfirm === "" || inputSetPwd !== inputConfirm ) {
            alert('有空or上下不同');
            return;
        }
        // 呼叫API
        fetch( API_URL + "resetPwd", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: inputSetPwd
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
                } else {
                    console.log("False");
                    alert("False")
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
                <TitleLogin main_title={main_title} sub_title={sub_title}/>
                <InputWhite placeholder={placeholder} value={inputSetPwd} onChange={(event) => setInputSetPwd(event.target.value)}/>
                <InputWhite placeholder={placeholder2} value={inputConfirm} onChange={(event) => setInputConfirm(event.target.value)}/>
                <Submit link={link} defaultValue={submit_text} onClick={(event) => handleClick(event)}/>
            </div>
        </main>
    </>
}

export default ResetPwd