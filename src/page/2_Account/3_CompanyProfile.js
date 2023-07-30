import React, { useRef } from "react";
import '../../css/saas.css';
import '../../css/dialog.css';

// import Sidebar from "../../components/Sidebar";
// import Title from "../../components/Title";
// import SubSidebar from '../../components/SubSidebar';

import person from '../../img/icon/person.svg'

const CompanyProfile = () =>{
    // let title_text = "帳戶資訊";
    // let title_path_array = ["帳戶資訊", "編輯企業檔案"];
    // let buttonCount = title_path_array.length;
    // let link_array = ["/Profile","/CompanyProfile"];
    /*--------------下拉選單--------------*/
    const dropdown1 = useRef();
    const dropdown2 = useRef();
    const dropdown3 = useRef();
    function open_dropdown(dropdown) {
        dropdown.current.classList.toggle('open');
        for (const dropdown of document.querySelectorAll(".select-wrapper")) {
            dropdown.addEventListener('click', function() {
                this.querySelector('.select').classList.toggle('open');
                this.querySelector('.select__trigger').classList.toggle('rotate');
            });
        };

        for (const option of document.querySelectorAll(".custom-option")) {
            option.addEventListener('click', function() {
                if (!this.classList.contains('selected')) {
                    this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                    this.classList.add('selected');
                    this.closest('.select').querySelector('.select__trigger span').textContent = this.textContent;
                };
            });
        };
    }
    // 兩個下拉選單不會同時開啟
    window.addEventListener('click', (e)=> {
        for (const select of document.querySelectorAll('.select')) {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
            };
        };
    });

    // 點選另一個下拉選單時，原本選單箭頭會改成向下
    window.addEventListener('click', (e)=> {
        for (const select__trigger of document.querySelectorAll('.select__trigger')) {
            if (!select__trigger.contains(e.target)) {
                select__trigger.classList.remove('rotate');
            };
        };
    });
    return <>
            <div className="profile_box">
                <h2 className="subtitle subtitle_line">編輯企業檔案</h2>
                <div className="profile_data">
                    <label htmlFor="ID">企業唯一碼</label>
                    <label id="ID" className="ID">uid_0100001021</label>
                </div>
                <div className="profile_data_w100">
                    <label htmlFor="name">企業名稱</label>
                    <input type="text" id="name" defaultValue="測試企業名稱股份有限公司" />
                </div>
                <div className="profile_data_dropdown">
                    <label htmlFor="gamil">企業所在地址</label>
                    <div className="input_group">
                        <div className="select-wrapper" >
                            <div className="select" ref={dropdown1}>
                                <div className="select__trigger" onClick={() => open_dropdown(dropdown1)}><span>選擇縣市</span></div>
                                <div className="custom-options">
                                    <span className="custom-option selected" data-value={0}>選擇縣市</span>
                                    <span className="custom-option" data-value={1}>台北市</span>
                                    <span className="custom-option" data-value={2}>新北市</span>
                                    <span className="custom-option" data-value={3}>基隆市</span>
                                    <span className="custom-option" data-value={4}>桃園市</span>
                                </div>
                            </div>
                        </div>
                        <div className="select-wrapper">
                            <div className="select" ref={dropdown2}>
                                <div className="select__trigger" onClick={() => open_dropdown(dropdown2)}><span>選擇地區</span></div>
                                <div className="custom-options">
                                    <span className="custom-option selected" data-value={0}>選擇縣市</span>
                                    <span className="custom-option" data-value={1}>信義區</span>
                                    <span className="custom-option" data-value={2}>中山區</span>
                                    <span className="custom-option" data-value={3}>中正區</span>
                                    <span className="custom-option" data-value={4}>大安區</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="text" id="name" placeholder="輸入詳細地址" />
                </div>
                <div className="profile_data">
                    <label htmlFor="number">統一編號</label>
                    <input type="text" id="number" defaultValue="48168486" />
                </div>
                <div className="profile_data">
                    <label htmlFor="number">公司市話</label>
                    <input type="text" id="number" defaultValue="(**)****-****" />
                </div>
                <div className="profile_data_w50">
                    <label htmlFor="number">系統聯絡人（最高管理權限人員）</label>
                    <div className="select-wrapper " >
                        <div className="select" ref={dropdown3}>
                            <div className="select__trigger" onClick={() => open_dropdown(dropdown3)}><span>陳某某</span></div>
                            <div className="custom-options">
                                <span className="custom-option selected" data-value={0}>陳某某</span>
                                <span className="custom-option" data-value={1}>黃OO</span>
                                <span className="custom-option" data-value={2}>吳OO</span>
                                <span className="custom-option" data-value={3}>鄭OO</span>
                            </div>
                        </div>
                    </div>
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

export default CompanyProfile