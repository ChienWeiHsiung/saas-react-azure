import Logo from "../../../components/Logo"
import Background from "../../../components/Background.jsx";

import TitleLogin from "../../../components/TitleLogin.jsx";
import InputWhite from "../../../components/InputWhite.jsx";
import Submit from "../../../components/Submit.jsx";

import Select from "./components/Select"

import { useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";

import '../../../css/login.css';
import API_URL from "../../../config";


// ********************** 企業申請 ************************* //
const Apply = () =>{
    /*--------------傳入的公司名稱--------------*/
    const location = useLocation();
    const name = location.state.name;

    let main_title = "請填寫企業資訊"
    let sub_title = "請依序填入下方申請欄位內容"
    let placeholder_1 = "公司名稱"
    let placeholder_2 = "公司統編"
    let placeholder_3 = "公司電話"
    let placeholder_4 = "公司所在詳細地址"
    let link = "/CompanyConnect"
    let submit_text = "下一步"

    const [inputCorpName, setInputCorpName] = useState(name);
    const [inputCorpTaxID, setInputCorpTaxID] = useState("");
    const [inputCorpTel, setInputCorpTel] = useState("");
    const [inputCorpAddr, setInputCorpAddr] = useState("");

    const [inputCorpIndustry, setInputCorpIndustry] = useState("");
    const [inputCorpCounty, setInputCorpCounty] = useState("");

    const navigate = useNavigate();

    const handleClick = (event) => {
        // 預防頁面跳轉
        event.preventDefault();
        // 輸入確認
        if (inputCorpName === "" || inputCorpTaxID === "" || inputCorpTel === "" || inputCorpAddr === "" || inputCorpIndustry === "" || inputCorpCounty === ""  ) {
            alert('有空');
            return;
        }
        // 呼叫API
        fetch( API_URL + "companyInfo", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                CN_COPNAME: inputCorpName,
                CN_TAXID : inputCorpTaxID,
                CN_COPTEL : inputCorpTel,
                CN_COPADDRESS : inputCorpAddr,
                CN_INDUSTRY : inputCorpIndustry,
                CL_COPCOUNTY : inputCorpCounty
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
                    navigate('/CompanyConnect');
                } else {
                    alert("此統編已存在");
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
                <InputWhite placeholder = {placeholder_1} value={inputCorpName} onChange={(event) => setInputCorpName(event.target.value)} />
                <InputWhite placeholder = {placeholder_2} value={inputCorpTaxID} onChange={(event) => setInputCorpTaxID(event.target.value)} />
                <InputWhite placeholder = {placeholder_3} value={inputCorpTel} onChange={(event) => setInputCorpTel(event.target.value)} />
                <Select onChangeType={setInputCorpIndustry} onChangeCity={setInputCorpCounty} /> 
                { /* <Select/> */ }
                <InputWhite placeholder = {placeholder_4} value={inputCorpAddr} onChange={(event) => setInputCorpAddr(event.target.value)}/>
                <Submit link={link} defaultValue = {submit_text} onClick={(event) => handleClick(event)}/>
                { /* <Submit link={link} defaultValue = {submit_text}/> */ }
            </div>
        </main>
    </>
}

export default Apply