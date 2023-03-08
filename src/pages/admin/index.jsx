import React from 'react'
import { Navigate, Outlet  } from 'react-router-dom'
import LeftNav from '../../component/left-nav'
import Header from '../../component/header'

import { Layout } from 'antd';
import storageUtils from '../../utils/storageUtils'
const { Footer, Sider, Content } = Layout;



export default function Admin() {
    // const user = storageUtils.getUser()
    // console.log(user)
    // if(!user || !user._id) {
    //     return <Navigate to="/login" />
    // }
  return (
    <Layout hasSider>
        <Sider>
            <LeftNav></LeftNav>
        </Sider>
        <Layout style={{color: '#fff',height:'100%'}}>
            <Layout style={{overflow:'scroll',minHeight:100}}>
                <Header></Header>
                <Content className="site-layout" style={{backgroundColor:'#fff', color:'black', margin:'30px',minHeight:450}} >
                    <Outlet/>
                </Content>
                <Footer style={{textAlign:'center', color:'#cccccc'}}>推荐使用谷歌浏览器</Footer>
            </Layout>
        </Layout>
    </Layout>
  )
}


