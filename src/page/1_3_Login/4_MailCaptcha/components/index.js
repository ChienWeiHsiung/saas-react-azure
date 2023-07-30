import '../../css/login.css'

import Logo from "../../components/Logo.jsx"
import Background from "../../components/Background"

import Title from "../../components/Title.jsx"
import InputWhite from "../../components/InputWhite.jsx"
import Submit from "../../components/Submit.jsx"

import Reciprocal from "./components/Reciprocal"

const Captcha = () =>{
    let main_title = "驗證碼"
    let sub_title = "請輸入您的手機號碼以核對身分"
    let placeholder = "手機號碼"
    let link = "/"
    let submit_text = "下一步"
    return <>
        <Logo/>
        <main className='login_main'>
            <Background/>
            <div className="login_input_group">
                <Title main_title={main_title} sub_title={sub_title}/>
                <InputWhite placeholder={placeholder}/>
                <Submit link={link} defaultValue = {submit_text}/>
                <Reciprocal/>
            </div>
        </main>
    </>
}

export default Captcha