import React, {   useContext } from "react";
import {NavLink, useNavigate} from 'react-router-dom';

import logo from '../img/shengsenlogo.png'
import person from '../img/icon/person.svg'
import global from '../img/icon/global.svg'
// import star from '../img/icon/star.svg'
// import key from '../img/icon/key.svg'
// import alert from '../img/icon/alert.svg'
import form from '../img/icon/form.svg'

import { UserContext } from '../container/UserContextProvider';

import API_URL from "../config";

const Sidebar = () =>{
    const { userName } = useContext(UserContext);
    // 側邊選單收合
    const root = document.getElementById("root");
    root.setAttribute("class", "sidebar_root");
    
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    
    // let open = false;

    // if(window.screen.width < 1450){
    //     open = !open
    // }

    const sidebarState = () =>{
        const sidebar_root = document.querySelector(".sidebar_root");
        const close_btn = document.getElementById("close_btn");
        const system_text = document.querySelector(".system_text");
        const profile_name = document.querySelector(".name");
        const profile_more_btn = document.querySelector(".profile_more_btn");
        const sidebar_item = document.querySelectorAll(".sidebar_item");
        const bottom = document.querySelector(".bottom");
        if(!sidebarOpen){
            sidebar_root.style.gridTemplateColumns = "15% 85%";
            system_text.style.display = "block";
            profile_name.style.display= "block";
            profile_more_btn.style.display= "block";
            sidebar_item.forEach((i)=>{
                i.style.display= "block";
            })
            bottom.style.display = "flex";
            close_btn.innerHTML = "&lt;"
        }
    }

    
    const close_sidebar = () =>{
        const sidebar_root = document.querySelector(".sidebar_root");
        const close_btn = document.getElementById("close_btn");
        const system_text = document.querySelector(".system_text");
        const profile_name = document.querySelector(".name");
        const profile_more_btn = document.querySelector(".profile_more_btn");
        const sidebar_item = document.querySelectorAll(".sidebar_item");
        const bottom = document.querySelector(".bottom");
        
        if(sidebarOpen){
            sidebar_root.style.gridTemplateColumns = "60px auto";
            system_text.style.display = "none";
            profile_name.style.display= "none";
            profile_more_btn.style.display= "none";
            sidebar_item.forEach((i)=>{
                i.style.display= "none";
            })
            bottom.style.display = "none";
            close_btn.innerHTML = "&gt;"
            setSidebarOpen(!sidebarOpen);
        }
        else{
            sidebar_root.style.gridTemplateColumns = "15% 85%";
            system_text.style.display = "block";
            profile_name.style.display= "block";
            profile_more_btn.style.display= "block";
            sidebar_item.forEach((i)=>{
                i.style.display= "block";
            })
            bottom.style.display = "flex";
            close_btn.innerHTML = "&lt;"
            setSidebarOpen(!sidebarOpen);
        }
    }
    
    // 時間顯示
    // setInterval("linkweb.innerHTML=new Date().toLocaleString()+' 星期'+'日一二三四五六'.charAt(new Date().getDay());",1000);
    
    // const changeTime = event =>{
    //     setInterval(tt,1000);
    // }

    // 時間顯示
    // const date_now = useRef();
    // const changeTime = event =>{
    //     setInterval(date_now.current.innerHTML=new Date().toLocaleString(),1000);
    // }

    const selected=()=>{
        for (const sidebar_btn of document.querySelectorAll(".sidebar_btn")) {
            sidebar_btn.addEventListener('click', function() {
                this.setAttribute("class", "sidebar_btn selected");
                // debugger
            })
        };
    }
    const navigate = useNavigate();
    const logout = () => {
        fetch(API_URL + "logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
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
                // console.log(data);
            })
            .catch((error) => {
                //處理錯誤
                console.error("API Request Error:", error);
            });
        navigate('/');
    }
    
    return <>
        <div className="sidebar" onLoad={sidebarState}>
            <div className="top">
                <div className="logo_icon">
                    <NavLink to={"/Home"}>
                        <div className="system">
                            <img style={{height: 20}} src={logo} alt={"logo"} />
                            <p className="system_text">SAAS管理員系統</p>
                        </div>
                    </NavLink>
                    <i className="close_btn" id="close_btn" onClick={close_sidebar}>&lt;</i>
                </div>
                <div className="profile">
                    <NavLink to={null}>
                    {/* <NavLink to={"/Account"}> */}
                        <div className="photo_name">
                                <img className="sidebar_icon" src={person} alt={"照片"} />
                                <div className="name">{userName}</div>
                        </div>
                    </NavLink>
                    <div className="sign_out">
                        <i className="profile_more_btn">&gt;</i>
                        <div onClick={logout}>
                            <div className="sign_out_btn">登出</div>
                        </div>
                    </div>
                </div>
                <NavLink to={"/Home"} onClick={selected}>
                    <div className="sidebar_btn">
                        <img className="sidebar_icon" src={global} alt={"icon"}></img>
                        <span className="sidebar_item">設備監控儀表板</span>
                    </div>
                </NavLink>
                {/* <NavLink to={"/FactoryAndDevice"} onClick={selected}>
                    <div className="sidebar_btn">
                        <img className="sidebar_icon" src={star} alt={"icon"}></img>
                        <span className="sidebar_item">工廠設備管理</span>
                    </div>
                </NavLink>
                <NavLink to={"/Permission"} onClick={selected}>
                    <div className="sidebar_btn">
                        <img className="sidebar_icon" src={key} alt={"icon"}></img>
                        <span className="sidebar_item">權限管理</span>
                    </div>
                </NavLink> */}
                {/* <NavLink to={"/AbnormalMgt"} onClick={selected}>
                    <div className="sidebar_btn">
                        <img className="sidebar_icon" src={alert} alt={"icon"}></img>
                        <span className="sidebar_item">預兆與異常管理</span>
                    </div>
                </NavLink> */}
                <NavLink to={"/ReportMgt"} onClick={selected}>
                    <div className="sidebar_btn">
                        <img className="sidebar_icon" src={form} alt={"icon"}></img>
                        <span className="sidebar_item">報表管理</span>
                    </div>
                </NavLink>
            </div>
            <div className="bottom">
                {/* <div className="date_now" ref={date_now} onChange={changeTime}></div> */}
            </div>
        </div>
    </>
}



export default Sidebar