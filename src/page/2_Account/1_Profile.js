import '../../css/saas.css'

// import Sidebar from "../../components/Sidebar";
// import Title from "../../components/Title";
// import SubSidebar from '../../components/SubSidebar';
import person from '../../img/icon/person.svg'


const Profile = () =>{
    // let title_text = "帳戶資訊";
    // let title_path_array = ["帳戶資訊", "編輯個人檔案"];
    // let buttonCount = title_path_array.length;
    // let link_array = ["/Profile","/Profile"]
    return <>
            <div className="profile_box">
                <h2 className="subtitle subtitle_line">編輯個人檔案</h2>
                <div className="profile_data">
                    <label htmlFor="ID">使用者唯一碼</label>
                    <label id="ID" className="ID">uid_0100001021</label>
                </div>
                <div className="profile_data">
                    <label htmlFor="name">姓名</label>
                    <input type="text" id="name" defaultValue="陳某某" />
                </div>
                <div className="profile_data">
                    <label htmlFor="gamil">Email</label>
                    <input type="text" id="gamil" defaultValue="t*****t@t*****t.com" />
                </div>
                <div className="profile_data">
                    <label htmlFor="number">手機號碼</label>
                    <input type="text" id="number" defaultValue="0985****19" />
                </div>
                <div className="question">
                    <label htmlFor>性別</label>
                    <div className="radio_group">
                        <input type="radio" name="gender" id="male" />
                        <label htmlFor="male" className="radio_circle">男性</label>
                        <input type="radio" name="gender" id="female" />
                        <label htmlFor="female" className="radio_circle">女性</label>
                        <input type="radio" name="gender" id="others" />
                        <label htmlFor="others" className="radio_circle">其他</label>
                        <input type="radio" name="gender" id="none" />
                        <label htmlFor="none" className="radio_circle">不透漏</label>
                    </div>
                </div>
                <div className="profile_date">
                    <label>生日</label>
                    <label className="profile_data_date" htmlFor="birth">
                        <input type="text" id="birth" placeholder="- - - - / - - / - -" onfocus="(this.type='date')" onblur="(this.type='text')" />
                        <i className="gg-calendar" />
                    </label>
                </div>
                <input type="button" className="white_btn" defaultValue="修改" />
            </div>
            <div className="profile_box">
                <div className="photo_container">
                <img className="photo" src={person} alt="照片" />
                <input type="button" className="white_btn" defaultValue="上傳圖片" />
                </div>
            </div>
    </>
}

export default Profile