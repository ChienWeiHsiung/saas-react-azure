import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const Bars = () =>{
    // 長條圖
    const data_bar_I = {
        labels: [
            '60 ↓',
            '60 ↑',
            '70 ↑',
            '80 ↑',
            '90 ↑'
        ],
        datasets: [{
            label: 'I 級健康度分布',
            data: [300, 50, 100, 20, 90],
            backgroundColor: [
            '#51A976',
            '#9ED293',
            '#abd9b3',
            '#92cf9c',
            '#79c584',
            ],
            hoverOffset: 9
        }]
    };

    const data_bar_II = {
        labels: [
            '60 ↓',
            '60 ↑',
            '70 ↑',
            '80 ↑',
            '90 ↑'
        ],
        datasets: [{
            label: 'I 級健康度分布',
            data: [0, 0, 1, 1, 1],
            backgroundColor: [
                '#51A976',
                '#9ED293',
                '#c7e2b7',
                '#b7daa1',
                '#a8d38b',
            ],
            hoverOffset: 9
        }]
    };

    const data_bar_III = {
        labels: [
            '60 ↓',
            '60 ↑',
            '70 ↑',
            '80 ↑',
            '90 ↑'
        ],
        datasets: [{
            label: 'I 級健康度分布',
            data: [0, 0, 0, 1, 0],
            backgroundColor: [
                '#51A976',
                '#9ED293',
                '#f8d591',
                '#f8cf80',
                '#f9c562',
            ],
            hoverOffset: 9
        }]
    };

    const data_bar_IV = {
        labels: [
            '60 ↓',
            '60 ↑',
            '70 ↑',
            '80 ↑',
            '90 ↑'
        ],
        datasets: [{
            label: 'I 級健康度分布',
            data: [0, 0, 0, 1, 0],
            backgroundColor: [
                '#51A976',
                '#9ED293',
                '#abd9b3',
                '#f8b680',
                '#f9a662',
            ],
            hoverOffset: 9
        }]
    };

    const data_bar_V = {
        labels: [
            '60 ↓',
            '60 ↑',
            '70 ↑',
            '80 ↑',
            '90 ↑'
        ],
        datasets: [{
            label: 'I 級健康度分布',
            data: [0, 0, 1, 0, 0],
            backgroundColor: [
                '#51A976',
                '#9ED293',
                '#f4ac9f',
                '#F0B847',
                '#f47a62',
            ],
            hoverOffset: 9
        }]
    };

    const bar_options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            tooltip: {
                titleFont: {
                    size: 18
                },
                bodyFont: {
                    size: 16
                },
            },
            yield:{
                display: false
            }
        },
        borderRadius: 6,
        barPercentage: 0.5,
        scales: {
            x: {
                grid:{
                    display: false,
                    drawBorder: false,
                    drawOnChartArea: false
                }
            },
            y: {
                ticks: {
                    display: false
                },
                grid: {
                    lineWidth: 2.5,
                    color: function(context) {
                        if (context.tick.value > 0) {
                            return 'transparent';
                        }
                    return '#b2d6ff';
                    },
                },
                beginAtZero: true,
            },
        }
    }

    // 第五個長條圖
    const bar_last_options= {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            tooltip: {
                titleFont: {
                    size: 18
                },
                bodyFont: {
                    size: 16
                },
            },
            yield:{
                display: false
            }
        },
        borderRadius: 6,
        barPercentage: 0.25,
        scales: {
            x: {
                grid:{
                    display: false,
                    drawBorder: false,
                    drawOnChartArea: false
                }
            },
            y: {
                ticks: {
                    display: false
                },
                grid: {
                    lineWidth: 2.5,
                    color: function(context) {
                        if (context.tick.value > 0) {
                            return 'transparent';
                        }
                    return '#b2d6ff';
                    },
                },
                beginAtZero: true,
            },
        },
        aspectRatio: 4/1
    }
    return<>
        <div className="charts_row_col">
            <div className="bar_chart b1">
                <h3 className="h4h3subtitle">I 級健康度分布</h3>
                <Bar type='bar'  data={data_bar_I} options={bar_options}/>
            </div>
            <div className="bar_chart b2">
                <h3 className="h4h3subtitle">II 級健康度分布</h3>
                <Bar type='bar'  data={data_bar_II} options={bar_options}/>
            </div>
            <div className="bar_chart b3">
                <h3 className="h4h3subtitle">III 級健康度分布</h3>
                <Bar type='bar'  data={data_bar_III} options={bar_options}/>
            </div>
            <div className="bar_chart b4">
                <h3 className="h4h3subtitle">IV 級健康度分布</h3>
                <Bar type='bar'  data={data_bar_IV} options={bar_options}/>
            </div>
            <div className="bar_chart_last">
                <h3 className="h4h3subtitle">V 級健康度分布</h3>
                <Bar type='bar'  data={data_bar_V} options={bar_last_options}/>
            </div>
        </div>
    </>
}
export default Bars;