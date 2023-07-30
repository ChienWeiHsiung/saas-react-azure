import React, { useRef, useState, useEffect } from "react";

// import { UserContext } from "../../../../container/UserContextProvider";
import API_URL from "../../../../config";

const Map = () => {
    /*--------------Map--------------*/
    const journalRef = useRef(null);

    const [warning, setWarning] = useState([]);

    useEffect(() => {
        if (journalRef.current) {
            const slider = journalRef.current.children[0];
            // 設定初始的 scrollWidth
            const initialScrollWidth = slider.scrollWidth;
            // 在 useRef 中設定初始的 scrollWidth
            journalRef.current.scrollWidthRef = initialScrollWidth;
        }
        fetch(API_URL + "getRepairsInfo", {
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
                // console.log("In Map");
                // console.log(data.data);
                setWarning(data.data);
            })
            .catch((error) => {
                //處理錯誤
                console.error("API Request Error:", error);
            });
    }, []);

    const Draggable = ({ children }) => {
        let mouseCoords = useRef({
            startX: 0,
            startY: 0,
            scrollLeft: 0,
            scrollTop: 0,
        });
        const ourRef = useRef(null);
        const [isMouseDown, setIsMouseDown] = useState(false);

        const handleDragStart = (e) => {
            if (!ourRef.current) return;
            const slider = ourRef.current.children[0];
            const startX = e.pageX - slider.offsetLeft;
            const startY = e.pageY - slider.offsetTop;
            const scrollLeft = slider.scrollLeft;
            const scrollTop = slider.scrollTop;
            mouseCoords.current = { startX, startY, scrollLeft, scrollTop };
            setIsMouseDown(true);
        };
        const handleDragEnd = () => {
            if (!ourRef.current) return;
            setIsMouseDown(false);
        };
        const handleDrag = (e) => {
            if (!isMouseDown || !ourRef.current) return;
            e.preventDefault();
            const slider = ourRef.current.children[0];
            const x = e.pageX - slider.offsetLeft;
            const y = e.pageY - slider.offsetTop;
            const walkX = (x - mouseCoords.current.startX) * 1.5;
            const walkY = (y - mouseCoords.current.startY) * 1.5;
            slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
            slider.scrollTop = mouseCoords.current.scrollTop - walkY;
        };

        return (
            <div ref={ourRef} onMouseDown={handleDragStart} onMouseUp={handleDragEnd} onMouseLeave={handleDragEnd} onMouseMove={handleDrag} className={"flex"}>
                {children}
            </div>
        );
    };

    const factoryRef = useRef(false);

    const openFactoryRef = (factoryRef) => {
        // factoryRef.current.style.display = "block";
    };
    const closeFactoryRef = (factoryRef) => {
        // factoryRef.current.style.display = "none";
    };

    return (
        <>
            <div className="distribution">
                <h3 className="h3subtitle">工廠分布與資訊</h3>
                <Draggable>
                    <div className="overflow-auto" ref={journalRef}>
                        <div className="map">
                            <img src={require("../../../../img/TAIWAN_MAP.png")} alt="" />
                            <div className="map_dot" onMouseEnter={() => openFactoryRef(factoryRef)} onMouseLeave={() => closeFactoryRef(factoryRef)}></div>
                        </div>
                    </div>
                </Draggable>
                {/* <div className="factory_img" ref={factoryRef}>
                    <h4 className="factory_text">臺北三重廠</h4>
                    <div className="factory_img_img">
                        臺北工場照片
                        <img src="" alt=""></img>
                    </div>
                </div> */}
            </div>

            <div className="messenger_box">
                <h3 className="h3subtitle">訊息中心</h3>
                <ul className="messenger_content">
                    {warning.map((item, index) => (
                        <li className="messenger_list" key={index}>
                            <div className="text">
                                <h4>{item.CN_FACNAME}</h4>
                                <p>{item.CL_EQPTYPE + " " + item.CN_EQPMODELNO}</p>
                            </div>
                            <div className="button_r">
                                <input type="button" className="red_btn" value="待保修"></input>
                                <small className="last_time">{item.CN_FALDT}</small>
                            </div>
                        </li>
                    ))}
                    {/* <li className="messenger_list">
                        <div className="text">
                            <h4>企業申請訂閱方案</h4>
                            <p>xxx企業申請訂閱方案</p>
                        </div>
                        <div className="button_r">
                            <input type="button" className="green_btn" value="待處理"></input>
                            <small className="last_time">2023-04-03</small>
                        </div>
                    </li>
                    <li className="messenger_list">
                        <div className="text">
                            <h4>企業申請訂閱方案</h4>
                            <p>xxx企業申請訂閱方案</p>
                        </div>
                        <div className="button_r">
                            <input type="button" className="blue_btn" value="處理中"></input>
                            <small className="last_time">2023-04-03</small>
                        </div>
                    </li>
                    <li className="messenger_list">
                        <div className="text">
                            <h4>企業申請訂閱方案</h4>
                            <p>xxx企業申請訂閱方案</p>
                        </div>
                        <div className="button_r">
                            <input type="button" className="blank_btn" value="已處理"></input>
                            <small className="last_time">2023-04-03</small>
                        </div>
                    </li>
                    <li className="messenger_list">
                        <div className="text">
                            <h4>企業申請訂閱方案</h4>
                            <p>xxx企業申請訂閱方案</p>
                        </div>
                        <div className="button_r">
                            <input type="button" className="green_btn" value="待處理"></input>
                            <small className="last_time">2023-04-03</small>
                        </div>
                    </li>
                    <li className="messenger_list">
                        <div className="text">
                            <h4>企業申請訂閱方案</h4>
                            <p>xxx企業申請訂閱方案</p>
                        </div>
                        <div className="button_r">
                            <input type="button" className="green_btn" value="待處理"></input>
                            <small className="last_time">2023-04-03</small>
                        </div>
                    </li> */}
                </ul>
            </div>
        </>
    );
};

export default Map;
