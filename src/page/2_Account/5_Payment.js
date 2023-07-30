import React, { useRef } from "react";
import '../../css/saas.css'

// import Sidebar from "../../components/Sidebar";
// import Title from "../../components/Title";
// import SubSidebar from '../../components/SubSidebar';

const Payment = () =>{
    // let title_text = "帳戶資訊";
    // let title_path_array = ["帳戶資訊", "付款方式"];
    // let buttonCount = title_path_array.length;
    // let link_array = ["/Profile","/Payment"];
    /*--------------下拉選單--------------*/
    const dropdown1 = useRef();
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
            <h2 className="subtitle subtitle_line">付款方式</h2>
            <div className="profile_data_w100">
                <label htmlFor="number">日期</label>
                <div className="select-wrapper " >
                    <div className="select" ref={dropdown1}>
                        <div className="select__trigger" onClick={() => open_dropdown(dropdown1)}>
                            <span>
                                <img src={require("../../img/dialog_img/crid1.png")} alt="visa" className="icon" />
                                **** **** **** 1234  |  12/27
                            </span>
                        </div>
                        <div className="custom-options">
                            <span className="custom-option selected" data-value={0}>陳某某</span>
                            <span className="custom-option" data-value={2}>吳OO</span>
                            <span className="custom-option" data-value={3}>鄭OO</span>
                        </div>
                    </div>
                </div>
            </div>
            <input type="button" className="grey_btn" defaultValue="新增" />
            <input type="button" className="white_btn" defaultValue="刪除" />
        </div>
    </>
}

export default Payment