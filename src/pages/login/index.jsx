import React from 'react'
import { useNavigate, Navigate } from "react-router-dom";
import logo from './imgs/icon1.png'
import { Button , Form, Input , message} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
import storageUtils from '../../utils/storageUtils';

import './login.css'


export default function Login() {

    let history = useNavigate()

    const user = storageUtils.getUser()
    if(user && user._id){
        return <Navigate to="/admin/home" />
    }

    let onFinish = async (values) => {
        // const params = useParams()
    /*         async function async1() {
            console.log('async1 start');
            await async2();
            console.log('async1 end');
          }
          async function async2() {
            console.log('async2');
          }
          console.log('script start');
          setTimeout(function() {
            console.log('setTimeout');
          }, 0)
          async1();
          new Promise(function(resolve) {
            console.log('promise1');
            resolve();
          }).then(function() {
            console.log('promise2');
          }); */
        // console.log('Received values of form: ', values);
        // try{
        //     const response = await reqLogin(values.username,values.password)
        //     console.log('请求成功',response.data)
        //     let result = response.data
        //     if(result.status===0){
        //         message.success('登录成功')
        //         const user = result.data 
        //         // memoryUtils.user = user
        //         storageUtils.saveUser(user)
        //         localStorage.setItem('user_key',JSON.stringify(user))
        //         history('/admin/home')
        //         // App('/home')
        //     }else{
        //         message.error(result.msg+result.status)
    
        //     }
        // }catch(err){
        //     console.log('请求出错',err.message)
        // }
        history('/admin/home')
    };
  return (
    <div className='login'>
    <header className='login-header'>
        <img src={logo} alt='logo'></img>
        <h1>后台管理系统</h1>
    </header>
    <section className='login-content'>
        <h2>用户登录</h2>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            >
            <Form.Item
                name="username"
                rules={[
                {
                    required: true,
                    message: '请输入你的名称!',
                },{
                    min:4,
                    message:'用户名不能小于4'
                }
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                {
                    required: true,
                    message: '请输入你的密码!',
                },
                {
                    pattern:/([^A-Z0-9])/g,
                    message:'密码需包含小写字母'
                },
                {
                    min:4,
                    message:"长度不得小于4位"
                }

                ]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                登录
                </Button>
            </Form.Item>
        </Form>

    </section>
  </div>
  )
}
