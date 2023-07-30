import Logo from "../../../components/Logo"
import Background from "../../../components/Background"

import TitleLogin from "../../../components/TitleLogin.jsx"

import '../../../css/login.css';

const Apply = () =>{
    let main_title = "申請中...請通知企業管理人開通權限。"

    return <>
        <Logo/>
        <main className='login_main'>
            <Background/>
            <div className="login_input_group">
                <TitleLogin main_title = {main_title}/>
            </div>
        </main>
    </>
}

export default Apply