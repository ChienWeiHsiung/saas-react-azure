import React, { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/saas.css";
import API_URL from "../../config";

import Sidebar from "../../components/Sidebar";

import { UserContext } from "../../container/UserContextProvider";

const FactoryAndDevice = () => {
    /*--------------Context Provider--------------*/
    const { setFactoryClickedIndex, factoryData, setFactoryData } = useContext(UserContext);
    /*--------------add factory--------------*/
    const addfactory = useRef();
    function fac_open() {
        addfactory.current.showModal();
        fadeIn(addfactory);
    }

    function fac_close() {
        addfactory.current.style.opacity = 0;
        addfactory.current.close();
    }

    /*開啟dialog視窗時會有動畫浮現的效果*/
    const intervalTime = 20; // 每隔10毫秒增加不透明度
    const maxOpacity = 1; // 最大不透明度
    function fadeIn(dialog) {
        let opacity = 0;
        let intervalId = setInterval(() => {
            opacity += 0.25;
            dialog.current.style.opacity = opacity;
            if (opacity >= maxOpacity) {
                clearInterval(intervalId);
            }
        }, intervalTime);
    }

    /*--------------下拉選單--------------*/
    function open_dropdown(dropdown) {
        dropdown.current.classList.toggle("open");
    }

    useEffect(() => {
        for (const dropdown of document.querySelectorAll(".select")) {
            const options = dropdown.querySelectorAll(".custom-option");
            for (const option of options) {
                option.addEventListener("click", function () {
                    dropdown.classList.remove("open");
                    if (!this.classList.contains("selected")) {
                        this.parentNode.querySelector(".custom-option.selected").classList.remove("selected");
                        this.classList.add("selected");
                        this.closest(".select").querySelector(".select__trigger span").textContent = this.textContent;
                    }
                });
            }
        }
        // 兩個下拉選單不會同時開啟
        window.addEventListener("click", (e) => {
            for (const select of document.querySelectorAll(".select")) {
                if (!select.contains(e.target)) {
                    select.classList.remove("open");
                }
            }
        });
        // 點選另一個下拉選單時，原本選單箭頭會改成向下
        window.addEventListener("click", (e) => {
            for (const select__trigger of document.querySelectorAll(".select__trigger")) {
                if (!select__trigger.contains(e.target)) {
                    select__trigger.classList.remove("rotate");
                }
            }
        });
    }, []);

    /*--------------Dialog中的Inputs--------------*/
    const factoryNumberRef = useRef();
    const factoryNameRef = useRef();
    const phoneRef = useRef();
    const countyRef = useRef();
    const districtRef = useRef();
    const addressRef = useRef();
    const factoryScaleRef = useRef();
    const typeRef = useRef();
    const establishDateRef = useRef();
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = () => {
        const factoryNumber = factoryNumberRef.current.value;
        const factoryName = factoryNameRef.current.value;
        const phone = phoneRef.current.value;

        const selectedCountyOption = countyRef.current.querySelector(".custom-option.selected");
        const county = selectedCountyOption.textContent;

        const selectedDistrictOption = districtRef.current.querySelector(".custom-option.selected");
        const district = selectedDistrictOption.textContent;

        const address = addressRef.current.value;

        const factoryScale = factoryScaleRef.current.value;

        const selectedTypeOption = typeRef.current.querySelector(".custom-option.selected");
        const type = selectedTypeOption.textContent;

        const establishDate = establishDateRef.current.value;

        if (
            factoryNumber === "" ||
            factoryName === "" ||
            phone === "" ||
            selectedCountyOption.getAttribute("data-value") === "0" ||
            selectedDistrictOption.getAttribute("data-value") === "0" ||
            address === "" ||
            factoryScale === "" ||
            selectedTypeOption.getAttribute("data-value") === "0" ||
            establishDate === ""
        ) {
            console.log( establishDate );
            alert("有空值");
            return;
        }
        const uploaded_data = {
            CN_FACNO: factoryNumber,
            CN_FACNAME: factoryName,
            CL_FACTYPE: type,
            CL_FACCOUNTY: county,
            CL_FACDISTRICT: district,
            CN_FACADDRESS: address,
            CN_FACTEL: phone,
            CN_FACSCALE: factoryScale,
            CN_FACPHOTO: selectedImage.split(",")[1],
            CN_FACDOE: establishDate,
        };
        fetch(API_URL + "addFactory", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(uploaded_data),
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("API Error:", response.status);
                    throw new Error("API Error");
                }
            })
            .then((data) => {
                if (data.result === true) {
                }
            })
            .catch((error) => {
                console.error("API Request Error:", error);
            });
        // Clear the input fields if needed
        factoryNumberRef.current.value = "";
        factoryNameRef.current.value = "";
        phoneRef.current.value = "";
        addressRef.current.value = "";
        factoryScaleRef.current.value = "";
        establishDateRef.current.value = "";
        fac_close();
    };
    /*--------------Render的Info--------------*/
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(API_URL + "getFactory", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("API Error:", response.status);
                    throw new Error("API Error");
                }
            })
            .then((data) => {
                console.log(data.data);
                // 在這裡處理獲取到的資料
                setFactoryData(data.data);
                setIsLoading(false); // Set loading state to false once the data is loaded
            })
            .catch((error) => {
                //處理錯誤
                console.error("API Request Error:", error);
            });
    }, [setFactoryData]);

    const factoryClicked = (factoryIndex) => {
        console.log(factoryIndex);
        setFactoryClickedIndex(factoryIndex);
        navigate("/FactoryMgt");
    };
    const renderTable = () => {
        if (isLoading) {
            //加載數據時添加加載動畫 isLoading = true
            return (
                <div className="loading-animation">
                    {/* Loading... */}
                    <div className="loader"></div>
                </div>
            );
        }
        if (factoryData.length !== 0) {
            const factoriesCode = factoryData.map((item, index) => {
                let factory = item.factory;
                let equipment = item.equipment;

                return (
                    <div className="box boxHover" key={index} onClick={() => factoryClicked(index)}>
                        <h2 className="company_name">
                            {factory.CN_FACNAME}
                            <small>
                                設備數量
                                <span>{" " + equipment.length}</span>
                            </small>
                        </h2>
                        <div className="company">
                            <img className="company_img" src={`data:image/jpeg;base64,${factory.CN_FACPHOTO}`} alt={factory.CN_FACNAME + "-img"}></img>
                        </div>
                    </div>
                );
            });
            return factoriesCode;
        } else {
            return;
        }
    };

    return (
        <>
            <Sidebar />

            <main className="main">
                <div className="title_container dividing_line">
                    <h1 className="maintitle">工廠與設備管理</h1>
                </div>

                <input type="button" className="add_company_btn" value="新增工廠" onClick={fac_open}></input>

                <div className="company_row_col">{renderTable()}</div>
            </main>
            {/* <!-- 新增工廠 --> */}
            <dialog id="addfactory" ref={addfactory}>
                <div className="dia_container">
                    <div className="dia_header">
                        <div className="dia_title">
                            <div>新增工廠</div>
                        </div>
                        <img src={require("../../img/dialog_img/close.png")} alt="X" className="dia_close" onClick={fac_close} />
                    </div>
                    <div className="dia_main2 f5_bg">
                        <div>
                            <div className="question">
                                <label htmlFor="factory-number">工廠編號</label>
                                <input type="text" placeholder="FC-0004" ref={factoryNumberRef} />
                            </div>
                            <div className="question">
                                <label htmlFor="factory-name">工廠名稱</label>
                                <input type="text" placeholder="新竹關西廠" ref={factoryNameRef} />
                            </div>
                            <div className="question">
                                <label htmlFor="phone">電話</label>
                                <input type="text" placeholder="(03)88645321" ref={phoneRef} />
                            </div>
                            <div className="question">
                                <label htmlFor="factory-address">工廠地址</label>
                                <div className="input_group">
                                    <div className="select-wrapper">
                                        <div className="select" ref={countyRef}>
                                            <div className="select__trigger" onClick={() => open_dropdown(countyRef)}>
                                                <span>選擇縣市</span>
                                            </div>
                                            <div className="custom-options">
                                                <span className="custom-option selected" data-value={0}>
                                                    選擇縣市
                                                </span>
                                                <span className="custom-option" data-value={1}>
                                                    台北市
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="select-wrapper">
                                        <div className="select" ref={districtRef}>
                                            <div className="select__trigger" onClick={() => open_dropdown(districtRef)}>
                                                <span>選擇地區</span>
                                            </div>
                                            <div className="custom-options">
                                                <span className="custom-option selected" data-value={0}>
                                                    選擇縣市
                                                </span>
                                                <span className="custom-option" data-value={1}>
                                                    信義區
                                                </span>
                                                <span className="custom-option" data-value={2}>
                                                    中山區
                                                </span>
                                                <span className="custom-option" data-value={3}>
                                                    中正區
                                                </span>
                                                <span className="custom-option" data-value={4}>
                                                    大安區
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input type="text" placeholder="輸入詳細地址" ref={addressRef} />
                            </div>
                            <div className="question">
                                <label htmlFor="factory-scale">工廠規模(公頃)</label>
                                <input type="text" placeholder="125.26" ref={factoryScaleRef} />
                            </div>
                        </div>
                        <div>
                            <div className="question">
                                <label htmlFor="factory-type">工廠類型</label>
                                <div className="select-wrapper">
                                    <div className="select" ref={typeRef}>
                                        <div className="select__trigger" onClick={() => open_dropdown(typeRef)}>
                                            <span>選擇工廠類型</span>
                                        </div>
                                        <div className="custom-options">
                                            <span className="custom-option selected" data-value={0}>
                                                選擇工廠類型
                                            </span>
                                            <span className="custom-option" data-value={1}>
                                                製造
                                            </span>
                                            <span className="custom-option" data-value={2}>
                                                加工
                                            </span>
                                            <span className="custom-option" data-value={3}>
                                                組裝
                                            </span>
                                            <span className="custom-option" data-value={4}>
                                                包裝
                                            </span>
                                            <span className="custom-option" data-value={5}>
                                                加工訂製工廠
                                            </span>
                                            <span className="custom-option" data-value={6}>
                                                能源工廠
                                            </span>
                                            <span className="custom-option" data-value={7}>
                                                其他
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="question">
                                <label htmlFor="establish-date">設立日期</label>
                                <input type="date" placeholder="2012/05/12" ref={establishDateRef} /> 
                            </div>

                            <div className="question">
                                <label htmlFor="factory-photo">工廠照片</label>
                                <div className="factoryimg" onClick={handleImageClick}>
                                    {selectedImage ? (
                                        <img src={selectedImage} alt="工廠照片" className="uploaded-img" />
                                    ) : (
                                        <img src={require("../../img/dialog_img/img.png")} alt="工廠照片" className="noneimg" />
                                    )}
                                </div>
                                <input type="file" id="factory-photo" accept="image/*" style={{ display: "none" }} ref={fileInputRef} onChange={handleImageUpload} />
                            </div>
                        </div>
                    </div>
                    <div className="dia_footer f5_bg">
                        <div className="dia_btn btn_blue" onClick={handleSubmit}>
                            新增
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default FactoryAndDevice;

