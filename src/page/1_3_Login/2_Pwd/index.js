import {NavLink} from 'react-router-dom';

import Logo from "../../../components/Logo"
import Background from "../../../components/Background"

import TitleLogin from "../../../components/TitleLogin.jsx"
import InputWhite from "../../../components/InputWhite.jsx"
import Submit from "../../../components/Submit.jsx"

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import '../../../css/login.css';
import API_URL from '../../../config';

import { UserContext } from '../../../container/UserContextProvider';

import { useLocation } from 'react-router-dom';


const Pwd = () =>{
    let main_title = "請輸入密碼"
    let sub_title = "此帳號已註冊，請輸入6~12位數密碼"
    let placeholder = "密碼"
    let link = "/ForgetPwd"
    let submit_text = "登入"

    const location = useLocation();
    const valueFromState = location.state?.value;
    console.log(valueFromState);

    const navigate = useNavigate();
    const [inputPwd, setInputPwd] = useState("");

    const { setUserName } = useContext(UserContext);

    const handleClick = (event) => {
        // 預防頁面跳轉
        event.preventDefault();
        // 輸入確認
        if (inputPwd === "") {
            alert('有空');
            return;
        }
        // 呼叫API
        fetch( API_URL + "checkPwd", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password : inputPwd }),
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
                    setUserName(data.Name);
                    navigate("/Home");
                } else {
                    alert('密碼錯誤');
                }
            })
            .catch((error) => {
                console.error("API Request Error:", error);
            });
    };

    return <>
    {/* ForgetPwd */}
        <Logo/>
        <main className='login_main'>
            <Background/>
            <div className="login_input_group">
                <TitleLogin main_title={main_title} sub_title={sub_title}/>
                <InputWhite placeholder={placeholder} value={inputPwd} onChange={(event) => setInputPwd(event.target.value)} />
                <Submit link={link} defaultValue={submit_text} onClick={(event) => handleClick(event)}/>
                <NavLink to={"/forgetPwd"}>
                    <input className="pwd_link" type="button" defaultValue="忘記密碼" />
                </NavLink>
            </div>
        </main>
    </>
}

export default Pwd