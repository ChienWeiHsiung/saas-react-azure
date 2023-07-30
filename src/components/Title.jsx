import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Previous from "../img/Previous.svg";

const Title = (props) => {
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

    const renderButtons = (buttonCount, title_path_array, link_array) => {
        const buttons = [];
        for (let i = 0; i < buttonCount; i++) {
            buttons.push(
                <React.Fragment key={i}>
                    <NavLink to={link_array[i]}>{title_path_array[i]}</NavLink>
                </React.Fragment>
            );

            if (i !== buttonCount - 1) {
                buttons.push(<React.Fragment key={`separator-${i}`}>&ensp;&gt;&ensp;</React.Fragment>);
            }
        }

        return buttons;
    };

    return (
        <div className="dividing_line title_container">
            <div className="title_container_flex">
                {previousButton(props.previousTo)}
                <h1 className="maintitle">{props.title_text}</h1>
            </div>
            <div className="link">{renderButtons(props.buttonCount, props.title_path_array, props.link_array)}</div>
        </div>
    );
};

export default Title;
