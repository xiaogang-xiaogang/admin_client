import React ,{useState} from 'react'
import { Card,Statistic,Space,Menu,DatePicker,Timeline} from 'antd'
import { QuestionCircleOutlined,ArrowUpOutlined, RedoOutlined} from '@ant-design/icons'
import './index.css'
import Line from './Line'
import Bar from './Bar'

const { RangePicker } = DatePicker;

export default function Home() {
  const [choice, setChoice] = useState('访问量')
  const items=[
    {
      label:'访问量',
      key:'1'
    },
    {
      label:'销售量',
      key:'2'
    }
  ]
  const onClick = (e)=>{
    let keyValue = items.find(item=>{
      return item.key===e.key
    })
    console.log(keyValue)
    setChoice(keyValue.label)
  }
  return (
    <div className='content'>
      <div className='content-top'>
        <Card
          title="商品总量"
          extra={<QuestionCircleOutlined/>}
          style={{
            width: 300,
            height:250
          }}
          className='content-top-left'
        >
        <Statistic
          value={1128163}
          valueStyle={{
            color: 'black',
            fontSize:'25px',
            fontWeight: 'bolder'
          }}
          suffix="个"
        />
        <Statistic
          value={11.28}
          precision={2}
          valueStyle={{
            color: '#3f8600',
            fontSize:'18px'
          }}
          prefix='周同比' 
          suffix={<div>%<ArrowUpOutlined /></div>}
        />
        <Statistic
          value={3.67}
          precision={2}
          valueStyle={{
            color: '#3f8600',
            fontSize:'18px'
          }}
          prefix='年周比' 
          suffix={<div>%<ArrowUpOutlined /></div>}
        />
        </Card>
        <Line className='content-top-right'/>
        
      </div>
      <div className='content-bottom'>
          <Card
            title={<Menu onClick={onClick} mode="horizontal" items={items} defaultSelectedKeys={'1'}/>}
            extra={<RangePicker placeholder={['开始日期','结束日期']} />} 
            style={{ width: '100%'}}
          >
            <Space direction="horizontal" size={16}>
              <Card title={choice} extra={<span style={{color:'green'}}><RedoOutlined /></span>} >
                <Bar/>
              </Card>
              <Card title="任务" extra={<span style={{color:'green'}}><RedoOutlined /></span>} style={{ width: 300,marginLeft: 40 }}>
              <Timeline
                  items={[
                    {
                      color: 'green',
                      children: '项目启动',
                    },
                    {
                      color: 'green',
                      children: '完成网页初步设置',
                    },
                    {
                      color: 'red',
                      children: (
                        <>
                          <p>联调接口</p>
                          <p>功能验收</p>
                        </>
                      ),
                    },
                    {
                      children: (
                        <>
                          <p>登录功能设计</p>
                          <p>权限验证</p>
                          <p>页面排版</p>
                        </>
                      ),
                    },
                    {
                      color: 'gray',
                      children: (
                        <>
                          <p>产品发布</p>
                        </>
                      ),
                    },
                  ]}
                />
              </Card>
            </Space>
          </Card>
      </div>
    </div>
  )
}
