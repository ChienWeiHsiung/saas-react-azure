import Logo from "../../../components/Logo"
import Background from "../../../components/Background"

import TitleLogin from "../../../components/TitleLogin.jsx"
import InputWhite from "../../../components/InputWhite.jsx"
import Submit from "../../../components/Submit.jsx"

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../../../css/login.css';
import API_URL from "../../../config";


const SetProfile = () => {
    let main_title = "基本資料";
    let sub_title = "您尚未註冊，請填入真實姓名與手機";
    let placeholder_1 = "手機";
    let placeholder_2 = "姓名";
    let link = "/Captcha";
    let submit_text = "下一步";

    const navigate = useNavigate();
    const [inputPhone, setInputPhone] = useState("");
    const [inputName, setInputName] = useState("");

    const handleClick = (event) => {
        // 預防頁面跳轉
        event.preventDefault();
        // 輸入確認
        if (inputPhone === "" || inputName === "") {
            // 判斷空值
            alert('有空');
            return;
        }
        fetch( API_URL + "setProfile", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone: inputPhone,
                name: inputName,
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
                // 單純將相關資料暫存到Server
                if (data.result === true) {
                    console.log("True");
                    navigate("/captcha");
                } else {
                    console.log("False");
                }
            })
            .catch((error) => {
                console.error("API Request Error:", error);
            });
    };

    return (
        <>
            <Logo />
            <main className="login_main">
                <Background />
                <div className="login_input_group">
                    <TitleLogin main_title={main_title} sub_title={sub_title} />
                    <InputWhite placeholder={placeholder_1} value={inputPhone} onChange={(event) => setInputPhone(event.target.value)} />
                    <InputWhite placeholder={placeholder_2} value={inputName} onChange={(event) => setInputName(event.target.value)} />
                    <Submit link={link} defaultValue={submit_text} onClick={(event) => handleClick(event)} />
                </div>
            </main>
        </>
    );
};

export default SetProfile;
