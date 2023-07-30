import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const Doughnuts = (props) =>{ 
    // 甜甜圈
    const data = {
        labels: [
            'I級',
            'II級',
            'III級',
            'IV級',
            'V級'
        ],
        datasets: [{
            label: '健康度等級分布',
            data: props.data,
            backgroundColor: [
                '#79c584',
                '#a8d38b',
                '#f9c562',
                '#f9a662',
                '#f47a62',
            ],
            hoverOffset: 10,
            borderWidth: 0,
        }],
        
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                position: 'bottom',
                align: 'end',
                text: '(單位:台)',
                font: {
                    size: 16
                }
            },
            legend: {
                display: true,
                position: 'bottom',
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
        }
    };

    return<>
        <div className="box circle_img">
            <h3 className="h3subtitle">健康度等級分布</h3>
            <Doughnut className='doughnut'  data={data} options={options}/>
        </div>
        
    </>
}

export default Doughnuts;