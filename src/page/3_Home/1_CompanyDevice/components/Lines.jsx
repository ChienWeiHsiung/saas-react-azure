import 'chart.js/auto';
import {NavLink} from 'react-router-dom';
import { Line } from 'react-chartjs-2';

const Lines = () =>{ 
    const line_data = {
        labels: [
            '2/10',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '3/20'
        ],
        datasets: [{
            label: "顯示",
            data: [658, 590, 80, 871, 596, 554, 563, 355, 259, 140],
            fill: false,
            borderColor: '#888',
            // yAxisID: "percentage"
        }]
    };

    const line_options = {
        responsive: true,
        plugins: {
                title: {
                    display: false,
                },
                legend: {
                    display: false
                },
                tooltip: {
                    titleFont: {
                        size: 18
                    },
                    bodyFont: {
                        size: 16
                    },
                }
            },
            scales: {
                x: {
                    grid:{
                        display: false,
                        drawBorder: false,
                        drawOnChartArea: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "數據量(筆)"
                    },
                    min: 0,
                    max: 1000,
                    ticks: {
                        callback: function(value) {
                            if(value === 0){
                                return value;
                            }
                            if(value === 1000){
                                return "1,000";
                            }
                        }
                    },
                    grid: {
                        lineWidth: 2.5,
                        color: function(context) {
                            if (context.tick.value > 0) {
                                return 'transparent';
                            }
                        },
                    },
                beginAtZero: true,
                },
            },
        aspectRatio: 6/1
    }

    return<>
        <NavLink to={"/Record"} className={"box boxHover line_content col_l"}>
            <h3 className="h3subtitle">每日數據量</h3>
            <Line type="line" data={line_data} options={line_options}></Line>
        </NavLink>
    </>
}

export default Lines;