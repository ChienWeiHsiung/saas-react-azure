import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { LinkContext } from '../../../container/LinkProvider';

const DynamicLinkButton = (props) => {
    const { pathData } = useContext(LinkContext);

    return (
        <div className="link">
            {pathData.map((path, index) => (
                <React.Fragment key={index}>
                    <Link to={path.link}>
                        {path.title}&ensp;&gt;&ensp;
                    </Link>
                </React.Fragment>
            ))}
        </div>

    );
};

export default DynamicLinkButton;
