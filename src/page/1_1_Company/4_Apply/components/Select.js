import React, { useRef, useEffect } from "react";

const Select = ({ onChangeType, onChangeCity }) => {
    
    useEffect(() => {
        console.log('useEffect');
        for (const dropdown of document.querySelectorAll(".select")) {
            const options = dropdown.querySelectorAll(".custom-option");
            for (const option of options ) {
                option.addEventListener("click", function () {
                    console.log('I am clicked : ' + this.innerHTML);
                    dropdown.classList.remove("open");
                    if (!this.classList.contains("selected")) {
                        this.parentNode.querySelector(".custom-option.selected").classList.remove("selected");
                        this.classList.add("selected");
                        this.closest(".select").querySelector(".select__trigger span").textContent = this.textContent;
                    }
                });
            }
        }
        window.addEventListener("click", (e) => {
            for (const select of document.querySelectorAll(".select")) {
                if (!select.contains(e.target)) {
                    select.classList.remove("open");
                }
            }
        }); 
      }, []);

    /*--------------下拉選單--------------*/
    const dropdown1 = useRef();
    const dropdown2 = useRef();
    // const dropdown3 = useRef();
    function open_dropdown(dropdown) {
        dropdown.current.classList.add("open");
        // dropdown.current.querySelector(".select__trigger").classList.toggle("rotate");
    }

    const handleTypeClick = (value) => {
        onChangeType(value);
    };

    const handleCityClick = (value) => {
        onChangeCity(value);
    };

    return (
        <>
            <div className="input_white select-wrapper">
                <div className="select" ref={dropdown1}>
                    <div className="select__trigger" onClick={() => open_dropdown(dropdown1)}>
                        <span>行業類別</span>
                        <div className="arrow" />
                    </div>
                    <div className="custom-options">
                        <span className="custom-option selected" data-value={0} onClick={() => handleTypeClick('')} >
                            行業類別
                        </span>
                        <span className="custom-option" data-value={1} onClick={() => handleTypeClick('農林漁牧業')} >
                            農林漁牧業
                        </span>
                        <span className="custom-option" data-value={2} onClick={() => handleTypeClick('礦業及土石採取業')}>
                            礦業及土石採取業
                        </span>
                        <span className="custom-option" data-value={3} onClick={() => handleTypeClick('製造業')}>
                            製造業
                        </span>
                        <span className="custom-option" data-value={4} onClick={() => handleTypeClick('電力及燃氣供應業')}>
                            電力及燃氣供應業
                        </span>
                        <span className="custom-option" data-value={5} onClick={() => handleTypeClick('用水供應及污染整治業')}>
                            用水供應及污染整治業
                        </span>
                        <span className="custom-option" data-value={6} onClick={() => handleTypeClick('營造業')}>
                            營造業
                        </span>
                        <span className="custom-option" data-value={7} onClick={() => handleTypeClick('批發及零售業')}>
                            批發及零售業
                        </span>
                        <span className="custom-option" data-value={8} onClick={() => handleTypeClick('運輸及倉儲業')}>
                            運輸及倉儲業
                        </span>
                        <span className="custom-option" data-value={9} onClick={() => handleTypeClick('住宿及餐飲業')}>
                            住宿及餐飲業
                        </span>
                        <span className="custom-option" data-value={10} onClick={() => handleTypeClick('資訊及通訊傳播業')}>
                            資訊及通訊傳播業
                        </span>
                        <span className="custom-option" data-value={11} onClick={() => handleTypeClick('金融及保險業')}>
                            金融及保險業
                        </span>
                        <span className="custom-option" data-value={12} onClick={() => handleTypeClick('不動產業')}>
                            不動產業
                        </span>
                        <span className="custom-option" data-value={13} onClick={() => handleTypeClick('專業、科學及技術服務業')}>
                            專業、科學及技術服務業
                        </span>
                        <span className="custom-option" data-value={14} onClick={() => handleTypeClick('支援服務業')}>
                            支援服務業
                        </span>
                        <span className="custom-option" data-value={15} onClick={() => handleTypeClick('公共行政及國防；強制性社會安全')}>
                            公共行政及國防；強制性社會安全
                        </span>
                        <span className="custom-option" data-value={16} onClick={() => handleTypeClick('教育服務業')}>
                            教育服務業
                        </span>
                        <span className="custom-option" data-value={17} onClick={() => handleTypeClick('醫療保健及社會工作服務業')}>
                            醫療保健及社會工作服務業
                        </span>
                        <span className="custom-option" data-value={18} onClick={() => handleTypeClick('藝術、娛樂及休閒服務業')}>
                            藝術、娛樂及休閒服務業
                        </span>
                        <span className="custom-option" data-value={19} onClick={() => handleTypeClick('其他服務業')}>
                            其他服務業
                        </span>
                    </div>
                </div>
            </div>

            {/* <div className="question"> */}
            {/* <label htmlFor>工廠地址</label> */}
            <div className="input_group">
                <div className="input_white select-wrapper">
                    <div className="select" ref={dropdown2}>
                        <div className="select__trigger" onClick={() => open_dropdown(dropdown2)}>
                            <span>公司所在縣市名稱</span>
                        </div>
                        <div className="custom-options">
                            <span className="custom-option selected" data-value={0} onClick={() => handleCityClick('')}>
                                選擇縣市
                            </span>
                            <span className="custom-option" data-value={1} onClick={() => handleCityClick('台北市')}>
                                台北市
                            </span>
                            <span className="custom-option" data-value={2} onClick={() => handleCityClick('新北市')}>
                                新北市
                            </span>
                            <span className="custom-option" data-value={3} onClick={() => handleCityClick('基隆市')}>
                                基隆市
                            </span>
                            <span className="custom-option" data-value={4} onClick={() => handleCityClick('桃園市')}>
                                桃園市
                            </span>
                        </div>
                    </div>
                </div>
                {/* <div className="input_white select-wrapper">
                    <div className="select" ref={dropdown3}>
                        <div className="select__trigger" onClick={() => open_dropdown(dropdown3)}>
                            <span>選擇地區</span>
                        </div>
                        <div className="custom-options">
                            <span className="custom-option selected" data-value={0} onClick={() => handleDistrictClick('')}>
                                選擇縣市
                            </span>
                            <span className="custom-option" data-value={1} onClick={() => handleDistrictClick('信義區')}>
                                信義區
                            </span>
                            <span className="custom-option" data-value={2} onClick={() => handleDistrictClick('中山區')}>
                                中山區
                            </span>
                            <span className="custom-option" data-value={3} onClick={() => handleDistrictClick('中正區')}>
                                中正區
                            </span>
                            <span className="custom-option" data-value={4} onClick={() => handleDistrictClick('大安區')}>
                                大安區
                            </span>
                        </div>
                    </div>
                </div> */}
                {/* </div> */}
                {/* <input type="text" placeholder="輸入詳細地址" /> */}
            </div>

            {/* <div className="input_white select-wrapper">
      <div className="select" ref={dropdown2}>
        <div className="select__trigger" onClick={() => open_dropdown(dropdown2)}><span>工廠地區</span>
          <div className="arrow" />
        </div>
        <div className="custom-options">
          <span className="custom-option selected" data-value={0}>企業地址</span>
          <span className="custom-option" data-value={1}>臺北市</span>
          <span className="custom-option" data-value={2}>新北市</span>
          <span className="custom-option" data-value={3}>基隆市</span>
          <span className="custom-option" data-value={4}>新竹市</span>
          <span className="custom-option" data-value={5}>桃園市</span>
          <span className="custom-option" data-value={6}>新竹縣</span>
          <span className="custom-option" data-value={7}>宜蘭縣</span>
          <span className="custom-option" data-value={8}>臺中市</span>
          <span className="custom-option" data-value={9}>苗栗縣</span>
          <span className="custom-option" data-value={10}>彰化縣</span>
          <span className="custom-option" data-value={11}>南投縣</span>
          <span className="custom-option" data-value={12}>雲林縣</span>
          <span className="custom-option" data-value={13}>高雄市</span>
          <span className="custom-option" data-value={14}>臺南市</span>
          <span className="custom-option" data-value={15}>嘉義市</span>
          <span className="custom-option" data-value={16}>嘉義縣</span>
          <span className="custom-option" data-value={17}>屏東縣</span>
          <span className="custom-option" data-value={18}>澎湖縣</span>
          <span className="custom-option" data-value={19}>花蓮縣</span>
          <span className="custom-option" data-value={20}>臺東縣</span>
          <span className="custom-option" data-value={21}>金門縣</span>
          <span className="custom-option" data-value={22}>連江縣</span>
        </div>
      </div>
    </div> */}
        </>
    );
};

export default Select;
