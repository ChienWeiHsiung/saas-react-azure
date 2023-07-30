import background from '../img/bg_right.png'

const Background = () =>{
    document.getElementById('root').setAttribute("class","login_root");
    return(
        <img className="bg_right" src={background} alt={"背景"}></img>
    );
};

export default Background;