import React,{useState} from 'react'
import { NavLink} from 'react-router-dom'
import { Card,Form, Input,Upload,InputNumber, Select, Button,Modal} from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import RichTextEditor from './RichTextEditor'

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
        defaultValue='86'
      >
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select>
    </Form.Item>
  );
  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


export default function ProudctDetail() {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([])
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
          console.log(file.preview)
        }
        console.log(file)
        console.log(fileList)
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
      };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  return (
    <div>
        <Card
            title={(<NavLink to='/admin/product'>返回</NavLink>)}
            bordered={false}
            style={{
            width: '100%',
            paddingRight:'120px',
            }}
        >
            <Form {...layout}>
                <Form.Item name='username' label='姓名'>
                    <Input/>
                </Form.Item>
                <Form.Item name='email' label='邮箱' rules={[{type:'email'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name='password' label='密码'>
                    <Input.Password/>
                </Form.Item>
                <Form.Item name='age' label='年龄' 
                    rules={[
                        {
                            type:'number',
                            min:1,
                            max:120
                        }
                    ]}
                >
                    <InputNumber/>
                </Form.Item>
                <Form.Item name='phone' label='手机'
                    rules={[
                        {
                            required: true,
                            message: 'Please input Intro',
                        },
                        ]}
                >
                    <Input addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}/>
                </Form.Item>
                <Form.Item
                    name="intro"
                    label="简介"
                    rules={[
                    {
                        required: true,
                        message: 'Please input Intro',
                    },
                    ]}
                >
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>
                <Form.Item label="上传" valuePropName="fileList">
                    <Upload listType="picture-card" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" onPreview={handlePreview} fileList={fileList} onChange={handleChange}>
                        <div>
                        <PlusOutlined />
                            <div
                                style={{
                                marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label="编辑文本" >
                    <RichTextEditor></RichTextEditor>
                </Form.Item>
                <Form.Item
                wrapperCol={{
                    offset: 13,
                    span: 16,
                }}

                >
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Card>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  )
}
