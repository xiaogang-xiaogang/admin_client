import React from 'react'
import ReactEcharts from 'echarts-for-react';

export default function Pie2() {

    const getOption = ()=>{
        let option = {
            title: {
                text: '实力对比图',
                subtext: '小宇宙',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'right'
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: '60%',
                  data: [
                    { value: 1048, name: '杨鹏刚' },
                    { value: 735, name: '冯光东' },
                    { value: 580, name: '郑鑫尧' },
                    { value: 484, name: '张振' },
                    { value: 300, name: '马竞坦' }
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
        };
        return option;
    };
  return (
    <div>
        <ReactEcharts style={{height:500}} option={getOption()}/>
    </div>
  )
}
