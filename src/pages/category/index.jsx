import React, { useEffect, useState } from 'react'
import {Button, Card, Table, Space, Modal, Input,Form,Select} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api';

export default function Category() {
  const [data,setData] = useState([])
  const [flag,setFlag] = useState(true)
  const [count, setCount] = useState(0)
  const [isChild, setChild] = useState(false)
  const [childTitle, setChildTitle] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [childId, setChildId] = useState('')
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const[ form1] = Form.useForm()
  const [form2] = Form.useForm()
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal1 = (record) => {
    form2.setFieldValue('Name',record.name)
    // form2.setFieldValue().Name = record.name
    setIsModalOpen1(true);
  };
  const handleOk1 = ()=>{
    reqUpdateCategory(form2.getFieldValue().Name,isChild?childId:0).then(resp=>{
      reqCategorys(isChild?childId:0).then(resp=>{
        setData(resp.data.data)
      }).catch(err =>{
        console.log('获取失败')
      })
    }).catch(err=>{
      console.log('修改失败')
    })
    setIsModalOpen1(false);
  }
  const handleCancel1 = ()=>{
    setIsModalOpen1(false);
  }
  const handleOk = () => {
    console.log(form1.getFieldValue())
    if(form1.getFieldValue().jibie==='0'){
      reqAddCategory(form1.getFieldValue().Name, '0').then(resp=>{
        reqCategorys(0).then(resp=>{
          setData(resp.data.data)
          setFlag(false)
          setChild(false)
        }).catch(err =>{
          console.log('获取失败')
        })
      }).catch(err=>{
        console.log('添加失败')
      })
    }else{
      reqAddCategory(form1.getFieldValue().Name, childId).then(resp=>{
        reqCategorys(childId).then(resp=>{
          setData(resp.data.data)
          setFlag(false)
          setChild(true)
        }).catch(err =>{
          console.log('获取失败')
        })
      }).catch(err=>{
        console.log('添加失败')
      })
    }
    form1.resetFields()
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    form1.resetFields()
    setIsModalOpen(false);
  };
  const lookChild = (record)=>{
    console.log(record._id)
    reqCategorys(record.key).then(resp=>{
      setChildTitle(record.name)
      setData(resp.data.data)
      setChild(true)
      setChildId(record._id)
    }).catch(err =>{
      console.log('获取失败')
    })
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '操作',
      key: 'age',
      render: (_,record) => (
        <Space size="small">
          <a onClick={() => showModal1(record)}>修改分类</a>
          <a onClick={() => lookChild(record)} hidden={isChild}>查看子分类</a>
        </Space>
      ),
      width:'40%'
    },
  ];
  useEffect(()=>{
    reqCategorys(0).then(resp=>{
      setData(resp.data.data)
      setFlag(false)
      setChild(false)
    }).catch(err =>{
      console.log('获取失败')
    })
  },[count])
  data.forEach(item => {
    item.key=item._id
  })
  let extra = (
    <Button type='primary' onClick={showModal}>
      <PlusOutlined />
      添加
    </Button>
  )
  const changeParent = ()=>{
    reqCategorys(0).then(resp=>{
      setData(resp.data.data)
      setFlag(false)
      setChild(false)
    }).catch(err =>{
      console.log('获取失败')
    })
  }
  let titleCard = (
    <h2>
    一级&nbsp;
      <a onClick={changeParent} style={{fontSize:'13px'}} hidden={!isChild}>/&nbsp;{childTitle}</a>
    </h2>
  )
  return (
    <div>
    <Card
      title={titleCard}
      extra={extra}
      style={{
        width: '100%',
      }}
    >
    <Modal title="添加" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='确定' cancelText='取消'>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form1}
      >
      <Form.Item
        label="级别"
        name="jibie"
      >
        <Select>
          <Select.Option value='0'>一级类别</Select.Option>
          {
            isChild===true?<Select.Option value='1'>{childTitle}</Select.Option>:null
          }
        </Select>
      </Form.Item>

      <Form.Item
        label="Name"
        name="Name"
      >
        <Input />
      </Form.Item>
    </Form>
    </Modal>
        <Table 
        columns={columns} 
        loading={flag}
        dataSource={data} 
        pagination={{
          defaultPageSize:5,
          defaultCurrent:1,
          hideOnSinglePage:true
        }}
  
        />;
    </Card>

    <Modal title="修改" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1} okText='确定' cancelText='取消'>
    <Form
        name="modify"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form2}
      >
      <Form.Item
        label="Name"
        name="Name"
        rules={[
          {required:true,
            message: 'Please input your password!',}
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
    </Modal>
    </div>
  )
}
