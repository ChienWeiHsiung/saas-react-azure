import "../../css/login.css";

import Logo from "../../components/Logo.jsx";
import Background from "../../components/Background.jsx";

import TitleLogin from "../../components/TitleLogin.jsx";
import InputWhite from "../../components/InputWhite.jsx";
import Submit from "../../components/Submit.jsx";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API_URL from "../../config";

// **********************企業註冊、人員註冊、一般登入**************************** //
const Saas = () => {
    let main_title = "歡迎使用SAAS管理系統";
    let sub_title = "企業請輸入帳號，人員請輸入電子信箱，確認登入資訊或註冊";
    let placeholder = "帳號/電子信箱";
    let link = "/pwd";
    let submit_text = "登入或註冊";

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");

    const handleClick = (event) => {
        // 預防頁面跳轉
        event.preventDefault();
        // 輸入確認
        if (inputValue === "") {
            // 判斷空值
            alert('有空');
            return;
        }
        if (inputValue.includes("@")) {
            // 電子信箱
            fetch(API_URL + "emailLogin", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputString: inputValue }),
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
                        if (data.verified === true ) {
                            //信箱存在 且 已驗證 且 被允許
                            if ( data.authstatus === true ){
                                navigate("/pwd");
                            }else{
                                alert("權限已被管理者關閉");
                            }
                        } else {
                            //信箱存在 但 未驗證
                            navigate("/Wait");
                        }
                    } else {
                        //信箱不存在
                        navigate("/setProfile");
                    }
                })
                .catch((error) => {
                    console.error("API Request Error:", error);
                });
        } else {
            // 帳號
            fetch(API_URL + "accountLogin", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputString: inputValue }),
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
                    console.log(data);
                    if (data.result === true) {
                        if (data.verified === true) {
                            navigate("/pwd");
                        } else {
                            navigate("/PresetPwd");
                        }
                    } else {
                        alert("帳號不存在");
                    }
                })
                .catch((error) => {
                    console.error("API Request Error:", error);
                });
        }
    };

    return (
        <>
            <Logo />
            <main className="login_main">
                <Background />
                <div className="login_input_group">
                    <TitleLogin main_title={main_title} sub_title={sub_title} />
                    <InputWhite placeholder={placeholder} value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                    <Submit link={link} defaultValue={submit_text} onClick={(event) => handleClick(event)} />
                </div>
            </main>
        </>
    );
};

export default Saas;
