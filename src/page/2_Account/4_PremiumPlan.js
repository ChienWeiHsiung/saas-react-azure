import '../../css/saas.css'

// import Sidebar from "../../components/Sidebar";
// import Title from "../../components/Title";
// import SubSidebar from '../../components/SubSidebar';

const PremiumPlan = () =>{
    // let title_text = "帳戶資訊";
    // let title_path_array = ["帳戶資訊", "訂閱方案"];
    // let buttonCount = title_path_array.length;
    // let link_array = ["/Profile","/PremiumPlan"];
    return <>
        <div className="profile_box">
            <h2 className="subtitle subtitle_line">訂閱方案</h2>
            <div className='premium_plan_title'>Premium Plan</div>
            <div className='premium_data'>
                <div className='premium_data_content'>
                    <div className='premium_data_content_title'>
                        <span>邊緣設備台數</span>
                        <span>總計價格</span>
                    </div>
                    <div className='premium_data_content_data'>
                        <p>6台</p>
                        <p>NT $1,290</p>
                    </div>
                    
                </div>
                <div className='premium_data_btn'>
                    <input type="button" className="white_btn" defaultValue="變更方案" />
                </div>
            </div>
            <table className='account_information_table'>
                <thead >
                    <tr>
                        <th>No</th>
                        <th>邊緣代號</th>
                        <th>設備名稱</th>
                        <th>型號</th>
                        <th>使用年限</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01</td>
                        <td>CH100-0</td>
                        <td>邊緣設備1號機</td>
                        <td>Eg-350v</td>
                        <td>27/01/20</td>
                        <td>
                            <input type="button" className="grey_btn" defaultValue="詳細資訊" />
                        </td>
                    </tr>
                    <tr>
                        <td>02</td>
                        <td>CH100-0</td>
                        <td>邊緣設備1號機</td>
                        <td>Eg-350v</td>
                        <td>27/01/20</td>
                        <td>
                            <input type="button" className="grey_btn" defaultValue="詳細資訊" />
                        </td>
                    </tr>
                    <tr>
                        <td>03</td>
                        <td>CH100-0</td>
                        <td>邊緣設備1號機</td>
                        <td>Eg-350v</td>
                        <td>27/01/20</td>
                        <td>
                            <input type="button" className="grey_btn" defaultValue="詳細資訊" />
                        </td>
                    </tr>
                    <tr>
                        <td>04</td>
                        <td>CH100-0</td>
                        <td>邊緣設備1號機</td>
                        <td>Eg-350v</td>
                        <td>27/01/20</td>
                        <td>
                            <input type="button" className="grey_btn" defaultValue="詳細資訊" />
                        </td>
                    </tr>
                    <tr>
                        <td>05</td>
                        <td>CH100-0</td>
                        <td>邊緣設備1號機</td>
                        <td>Eg-350v</td>
                        <td>27/01/20</td>
                        <td>
                            <input type="button" className="grey_btn" defaultValue="詳細資訊" />
                        </td>
                    </tr>
                    <tr>
                        <td>06</td>
                        <td>CH100-0</td>
                        <td>邊緣設備1號機</td>
                        <td>Eg-350v</td>
                        <td>27/01/20</td>
                        <td>
                            <input type="button" className="grey_btn" defaultValue="詳細資訊" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
}

export default PremiumPlan