import '../../css/saas.css'

// import Sidebar from "../../components/Sidebar";
// import Title from "../../components/Title";
// import SubSidebar from '../../components/SubSidebar';

const ChangePwd = () =>{
    // let title_text = "帳戶資訊";
    // let title_path_array = ["帳戶資訊", "變更密碼"];
    // let buttonCount = title_path_array.length;
    // let link_array = ["/Profile","/ChangePwd"];
    return <>
        
        <div className="profile_box">
            <h2 className="subtitle subtitle_line">變更密碼</h2>
            <div className="profile_data">
                <label htmlFor="previousPwd">輸入舊密碼</label>
                <input type="text" id="previousPwd" />
            </div>
            <div className="profile_data">
                <label htmlFor="newPwd">輸入新密碼</label>
                <input type="text" id="newPwd" />
            </div>
            <div className="profile_data">
                <label htmlFor="doublePwd">再輸入一次新密碼</label>
                <input type="text" id="doublePwd" />
            </div>
            <input type="button" className="white_btn" defaultValue="修改" />
        </div>

    </>
}

export default ChangePwd