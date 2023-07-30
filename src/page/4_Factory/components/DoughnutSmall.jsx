import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const DoughnutSmall = (props) =>{ 
    // 小甜甜圈
    const data = {
        labels: [
            '健康度',
            '餘',
        ],
        datasets: [{
            label: '健康度等級分布',
            data: props.array,
            backgroundColor: [
                '#f47a62','#D9D9D9'
            ],
            hoverOffset: 10,
            borderWidth: 0,
        }],
        
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false
            },
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        }
    };

    return<>
        <div className="box doughnut_small_img">
            <Doughnut className='doughnut'  data={data} options={options}/>
        </div>
        
    </>
}

export default DoughnutSmall;