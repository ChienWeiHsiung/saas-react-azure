import React, {  useState } from "react";

import Map from "./Map";

const Calendar = () =>{
    /*--------------Calendar--------------*/
    const [showYear, setshowYear] = useState(new Date().getFullYear());
    const [showMonth, setShowMonth] = useState(new Date().getMonth()); //getmonth()的返回值是 0（一月） 到 11（十二月

    // const todo_today = useState(new Date().getDate());
    
    const [selectedDate, setSelectedDate] = useState("");
    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const previous = (showMonth)=>{
        if(showMonth === 0){ //index=>0(為一月) //showMonth若為1並觸發點擊事件表示將跨到前一年
            setshowYear(prev => prev - 1 )
        }
        setShowMonth(prev => (prev + 11) % 12 ) //月份向前
    }

    const next = ()=>{
        if(showMonth === 11){ //index=>0(為十二月) //showMonth若為11並觸發點擊事件表示將跨到下一年
            setshowYear(prev => prev + 1 )
        }
        setShowMonth(prev => (prev + 1) % 12) //月份向後
    }

    const renderCalendar = (task) => {
        const today = new Date();
        // const year = today.getFullYear();
        // const month = today.getMonth(); //getmonth()的返回值是 0（一月） 到 11（十二月
        // const daysInMonth = new Date(year, setShowMonth, 0).getDate(); //這月的所有天數 //因返回值 => 所以實際月份 month + 1
        const daysInMonth = new Date(showYear, showMonth + 1, 0).getDate(); //這月的所有天數 //因返回值 => 所以實際月份 month + 1
        const calendarWeeks = [];
        let week = [];

        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        let isMonth_title = [];
        
        switch(task){
            // 列印月份標題
            case 'month_title':
                isMonth_title.push(
                    <div className="calendar_header" key={'Month'}>
                        <div className={`calendar_title`}>
                            {months[showMonth]}
                        </div>
                        <div className={`calendar_year`}>
                            {showYear}
                        </div>
                        <div className={`calendar_arrow`}>
                            <button 
                                className={`prev-btn`}
                                // onClick={() => setShowMonth(prev => (prev + 11) % 12 )}
                                onClick={() => previous(showMonth)}
                            >&lt;</button>
                            <button 
                                className={`next-btn`}
                                // onClick={() => setShowMonth(prev => (prev + 1) % 12)}
                                onClick={() => next(showMonth)}
                            >&gt;</button>
                        </div>
                    </div>
                )
                
                return isMonth_title;

            // 列印日歷內容
            default:
                for (let i = 1; i <= daysInMonth; i++) {
                    const date = new Date(showYear, showMonth, i);
                    const isCurrentDate = today.toDateString() === date.toDateString();
                    const isSelectedDate =
                    selectedDate && selectedDate.toDateString() === date.toDateString();
                
                    const dateClassName = isSelectedDate ? "selected-date" : "";
                    const todayClassName = isCurrentDate ? "today" : ""; //如果是今日=>標上 className: today
                    const selectedDateClassName = isSelectedDate ? "selected_day" : ""; //如果被選擇=>標上className: selected_day 
            
                    // 製作每一週
                    if(calendarWeeks.length === 0){ //如果是第一行 => 判斷要不要依星期往後挪
                        week.push(
                            <div
                                key={i}
                                className={`day ${todayClassName} ${selectedDateClassName}`}
                                onClick={() => handleDateClick(date)}
                            >
                                <div className={`day-number ${dateClassName}`}>{i}</div>
                            </div>
                        );
                    }

                    else{
                        week.push(
                            <div
                                key={i}
                                className={`day ${todayClassName} ${selectedDateClassName}`}
                                onClick={() => handleDateClick(date)}
                            >
                                <div className={`day-number ${dateClassName}`}>{i}</div>
                            </div>
                        );
                    }
                
                    // 日期按照星期，分配每周天數
                    if (date.getDay() === 6 || i === daysInMonth) {
                        calendarWeeks.push(
                            <div key={calendarWeeks.length} className="days" id={calendarWeeks.length}>
                                {week}
                            </div>
                        );
                        week = [];
                    }
                }
        }
        
        return calendarWeeks;
    };



    

    // const options = {
    //     responsive: true,
    //     plugins: {
    //         title: {
    //             display: true,
    //             position: 'bottom',
    //             align: 'end',
    //             text: '(單位:台)',
    //             font: {
    //                 size: 16
    //             }
    //         },
    //         legend: {
    //             display: false
    //         },
    //         tooltip: {
    //             titleFont: {
    //                 size: 18
    //             },
    //             bodyFont: {
    //                 size: 16
    //             },
    //         }
    //     }
    // };
    return<>
    <div className="col_first">
        <div className="calendar">
            {renderCalendar('month_title')}
            <div className="weeks">
                <p className="week">S</p>
                <p className="week">M</p>
                <p className="week">T</p>
                <p className="week">W</p>
                <p className="week">T</p>
                <p className="week">F</p>
                <p className="week">S</p>
            </div>
            {renderCalendar()}
        </div>
        
        <Map/>
    </div>
    </>

}

export default Calendar;