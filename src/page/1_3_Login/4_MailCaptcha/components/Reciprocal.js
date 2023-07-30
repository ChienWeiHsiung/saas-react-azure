const Reciprocal = () => {
    // let oTimerId;
    // let timeleft=60000;  // 1*60*1000
    // let sec=0;
    // let min=0;
    // let secstr;
    // let minstr;
    // let starter = Date.now();
    // let stoptime=starter+timeleft;

    // function minsec(tl){
    // min=parseInt(tl / 60);
    // sec=tl % 60;
    // if (sec<=9)
    //     secstr='0'+sec
    // else
    //     secstr=sec;
    // if (min<=9)
    //     minstr='0'+min
    // else
    //     minstr=min;
    //     document.getElementById("countdown").innerHTML = minstr+':'+secstr;
    // }

    // function ReCalculate(){
    //     starter = Date.now();
    //     stoptime=starter+timeleft;
    //     clearInterval(oTimerId)
    //     oTimerId =  setInterval(function () {
    //         var rightnow = new Date();
    //         if(rightnow > stoptime){
    //             alert("重新發送驗證碼");
                
    //         } else {
    //             minsec((stoptime-rightnow) / 1000 | 0);
    //         }
    //     }, 1000);
    // }
    // ReCalculate();
    return<>
        <p className="reciprocal" id="reciprocal"><span className="countdown" id="countdown">01:00</span>後可重新發送</p>
    </>
}

export default Reciprocal