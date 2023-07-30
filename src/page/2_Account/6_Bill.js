import '../../css/saas.css'

// import Sidebar from "../../components/Sidebar";
// import Title from "../../components/Title";
// import SubSidebar from '../../components/SubSidebar';

const Bill = () =>{
    // let title_text = "帳戶資訊";
    // let title_path_array = ["帳戶資訊", "帳單紀錄"];
    // let buttonCount = title_path_array.length;
    // let link_array = ["/Profile","/Payment"];
    return <>
        <div className="profile_box">
            <h2 className="subtitle subtitle_line">帳單紀錄</h2>
            <table className='account_information_table'>
                <thead >
                    <tr>
                        <th>日期</th>
                        <th>定單編號</th>
                        <th>邊緣設備數量</th>
                        <th>價格</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2023/03/25</td>
                        <td>4878643131546786</td>
                        <td>6台</td>
                        <td>NT $1,290</td>
                        <td>
                            <input type="button" className="grey_btn" defaultValue="詳細資訊" />
                        </td>
                    </tr>
                    <tr>
                        <td>2023/02/25</td>
                        <td>7687614867643456</td>
                        <td>6台</td>
                        <td>NT $1,290</td>
                        <td>
                            <input type="button" className="grey_btn" defaultValue="詳細資訊" />
                        </td>
                    </tr>
                    <tr>
                        <td>2023/02/25</td>
                        <td>7130480407875535</td>
                        <td>6台</td>
                        <td>NT $1,290</td>
                        <td>
                            <input type="button" className="grey_btn" defaultValue="詳細資訊" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
}

export default Bill