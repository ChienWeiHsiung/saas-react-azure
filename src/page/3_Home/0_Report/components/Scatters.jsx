import 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';
// import faker from 'faker';

const Scatters = () =>{
    // 台北三重廠
    // 台中南屯廠
    // 桃園蘆竹廠
    const data = {
        datasets: [ //data 依照等級分 x: 表示工廠編號
                {
                    label: 'I級(0-20%)',
                    data: [
                    ],
                    backgroundColor: '#79C584',
                    borderWidth: 0,
                    pointRadius: 7,
                },
                {
                    label: 'II級(20-40%)',
                    data: [

                    ],
                    backgroundColor: '#a8d38b',
                    borderWidth: 0,
                    pointRadius: 7,
                },
                {
                    label: 'III級(40-60%)',
                    data: [{x: 1,y: 50,},
                    ],
                    backgroundColor: '#f9c562',
                    borderWidth: 0,
                    pointRadius: 7,
                },
                {
                    label: 'IV級(60-80%)',
                    data: [

                    ],
                    backgroundColor: '#f9a662',
                    borderWidth: 0,
                    pointRadius: 7,
                },
                {
                    label: 'V級(80-100%)',
                    data: [
                    ],
                    backgroundColor: '#f47a62',
                    borderWidth: 0,
                    pointRadius: 7,
                },
            ],
    };

    const options = {
        responsive: true,
        plugins: {
                title: {
                    display: false,
                },
                legend: {
                    display: true,
                    position: 'right',
                    align: "start",
                    labels: {
                        //設定legend長度
                        boxWidth: 20,
                        boxHeight: 20,
                        //設定legend圓角
                        useBorderRadius: true,
                        borderRadius: 3,
                    }
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
                    title: {
                        display: true,
                        text: "故障分數(%)"
                    },
                    min: 0,
                    max: 3,
                    ticks: {
                        callback: function(value) {
                            if(value === 0 || value === 4){
                                return "";
                            }
                            if(value === 1){
                                return "工廠一";
                            }
                            if(value === 2){
                                return "工廠二";
                            }
                        }
                    },
                    grid: {
                        lineWidth: 2.5,
                        color: function(context) {
                            if (context.tick.value === 0) {
                                return '#b2d6ff';
                            }
                            return '#F6F7FB';
                        },
                    },
                },
                y: {
                    title: {
                        display: false,
                        text: "設備名稱"
                    },
                    min: 0,
                    max: 100,
                    beginAtZero: true,
                    grid: {
                        lineWidth: 2.5,
                        color: function(context) {
                            if (context.tick.value === 0) {
                                return '#b2d6ff';
                            }
                            return '#F6F7FB';
                        },
                    },
                },
            },
        };
    return<>
        <div className="box scatter_container">
            <h3 className="h3subtitle">故障度等級分布</h3>
            <Scatter type='scatter'  data={data} options={options}/>
        </div>
    </>
}
export default Scatters;