import React from 'react';
import {  useNavigate} from 'react-router-dom';

import Previous from '../../../img/Previous.svg';

import DynamicLinkButton from "../components/DynamicLinkButton";

const MyProvider = (props) => {
    const navigate = useNavigate();
    const previousButton = (previousTo) => {
        if (previousTo === null) {
            return (
                <div onClick={() => navigate(-1)}>
                    <img src={Previous} alt={"<"} />
                </div>
            );
        } else {
            return (
                <div onClick={() => navigate(-1)}>
                    <img src={Previous} alt={"<"} />
                </div>
            );
        }
    };


    return (
            <div className="dividing_line title_container">
                <div className='title_container_flex'>
                    {previousButton(props.previousTo)}
                    <h1 className="maintitle">{props.title_text}</h1>
                </div>
                <DynamicLinkButton/>
            </div>
        
    );
};

export default MyProvider;
