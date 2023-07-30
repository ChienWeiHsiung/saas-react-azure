import logo from "../img/shengsenlogo-white.png"

const Logo = () =>{
    return(
        <header>
            <div className="logo">
                <img src={logo} alt={"logo"} />
            </div>
            <p className="sub_text">© COPYRIGHT 2021 © Shengsen Co., LTD. ALL RIGHTS RESERVED.</p>
        </header>
    );
};

export default Logo;