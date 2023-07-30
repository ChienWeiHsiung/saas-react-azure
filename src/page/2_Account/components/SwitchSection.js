//Components - SwitchSection
import React from 'react';

const SwitchSection = (props) => {

    const { selection } = props;

    return<>
        <div className="profile_box">
            {Array.isArray(selection) && selection.map((item, index) => (
                <ul key={index} className="subsidebar">
                    <span className="subsidebar_label">{item.title}</span>
                    {Array.isArray(selection[index].content) && selection[index].content.map((item, i) => (
                        <li 
                            onClick={() => props.handleClick(item.id)}
                            key={i}
                        >
                            <input type="button" className={`subsidebar_btn ${props.isSelected === item.id ? 'subsidebar_btn_selected' : ''}`} value={item.option}></input>
                        </li>
                    ))}
                </ul>
            ))}
            {/* <ul className="subsidebar">
                <span className="subsidebar_label">個人</span>
                <NavLink to={"/Profile"}>
                    <li>編輯個人檔案</li>
                </NavLink>
                <NavLink to={"/ChangePwd"}>
                    <li>變更密碼</li>
                </NavLink>
            </ul>
            <ul className="subsidebar">    
                <span className="subsidebar_label">企業</span>
                <NavLink to={"/CompanyProfile"}>
                    <li>編輯企業檔案</li>
                </NavLink>
                <NavLink to={"/PremiumPlan"}>
                    <li>訂閱方案</li>
                </NavLink>
                <NavLink to={"/Payment"}>
                    <li>付款方式</li>
                </NavLink>
                <NavLink to={"/Bill"}>
                    <li>帳單紀錄</li>
                </NavLink>
            </ul> */}
        </div>
        
    </>
    
};

export default SwitchSection;