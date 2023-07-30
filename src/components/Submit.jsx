import {NavLink} from 'react-router-dom';

const Submit = (props) =>{
    return <NavLink to={props.link}>
        <input id="login_btn" className="submit" type="button" defaultValue={props.defaultValue} onClick={props.onClick}/>
    </NavLink>
}

export default Submit