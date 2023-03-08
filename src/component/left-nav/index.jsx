import React from 'react'
import './leftnav.css'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import menuList from '../../config/menuConfig'
// import Home from '../../pages/Home'

import logo from './img/icon1.png'
import {
    AppstoreOutlined,
    ContainerOutlined,
    MailOutlined,
    PieChartOutlined,
    DesktopOutlined
  } from '@ant-design/icons';
  import { Menu } from 'antd';
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  // const items = [
  //   getItem('首页', '/admin/home', <PieChartOutlined />),
  //   getItem('商品', 'sub1', <MailOutlined />, [
  //       getItem('品类管理', '/admin/category',<ContainerOutlined />),
  //       getItem('商品管理', '/admin/product',<ContainerOutlined />),
  //     ]),
  //   getItem('用户管理', '/admin/user', <DesktopOutlined />),
  //   getItem('角色管理', '/admin/role', <ContainerOutlined />),
  //   getItem('图形图表', '/admin/charts', <AppstoreOutlined />),
  // ];
  const items = []
  for(var i=0;i<menuList.length;i++){
    if(!menuList[i].children){
      items.push(getItem(menuList[i].title,menuList[i].key,<PieChartOutlined />))
    }else{
      let item = []
      for(let j=0;j<menuList[i].children.length;j++){
        item.push(getItem(menuList[i].children[j].title,menuList[i].children[j].key,<MailOutlined />))
      }
      items.push(getItem(menuList[i].title,menuList[i].key,<PieChartOutlined />,item))
    }
  }


// submenu keys of first level
export default function LeftNav() {

  let history = useNavigate()

  let location = useLocation()
  console.log(location)
  let isOpen = ''
  let path = location.pathname
  for(var i=0;i<menuList.length;i++){
    if(menuList[i].children){
      for(let j=0;j<menuList[i].children.length;j++){
        if(location.pathname.includes(menuList[i].children[j].key)){
          isOpen = menuList[i].key
        }
      }
    }
  }
  if(location.pathname.includes('/admin/product')){
    path = '/admin/product'
  }

  const onClick = (e) => {
    history(e.key)
  };
  return (
    <div className='left-nav'>
        <Link to='/admin/home' className='left-nav-header'>
            <img src={logo} alt="商标"></img>
            <h1>后台管理</h1>
        </Link>
        <Menu
            onClick={onClick}
            defaultSelectedKeys={[path]}
            defaultOpenKeys={[isOpen]}
            mode="inline"
            theme="dark"
            items={items}
        />
    </div>
  )
}
