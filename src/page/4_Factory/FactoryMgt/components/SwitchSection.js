//Components - SwitchSection
import React from 'react';

const SwitchSection = (props) => {

    const { selection } = props;

    return<>
        <div className="switchsection topbar">
            {Array.isArray(selection) && selection.map((item, index) => (
                <div
                    className={`topbar_link`}
                    onClick={() => props.handleClick(item.id)}
                    key={index}
                >
                    <input type="button" className={`topbar_link_btn ${props.isSelected === item.id ? 'topbar_link_btn_selected' : ''}`} value={item.option}></input>
                </div>
            ))}
        </div>
        
    </>
    
};

export default SwitchSection;