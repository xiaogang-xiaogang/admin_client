import React, { useEffect, useState } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import './header.css'
import logo from './img/天气.png'
import menuList from '../../config/menuConfig'
import { useLocation, useNavigate } from 'react-router'
import { Modal } from 'antd';
import storageUtils from '../../utils/storageUtils'

export default function Header() {
  let user = storageUtils.getUser()

  const [timer,setTimer] = useState('')  
  let location = useLocation()
  let history = useNavigate()
  let headTitle = ''
  // for(var i=0;i<menuList.length;i++){
  //   if(menuList[i].children){
  //     for(var j=0;j<menuList[i].children.length;j++){
  //       if(location.pathname === menuList[i].children[j].key){
  //         headTitle = menuList[i].children[j].title
  //       }
  //     }
  //   }else{
  //     if(location.pathname === menuList[i].key){
  //       headTitle = menuList[i].title
  //     }
  //   }
  // }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    storageUtils.removeUser()
    memoryUtils.user = {}
    history('/login')
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  menuList.forEach(item =>{
    if(item.key===location.pathname){
      console.log(item.title)
      headTitle = item.title
    }else{
      if(item.children){
        item.children.forEach(child =>{
          if(child.key === location.pathname){
            headTitle = item.title
          }else if(location.pathname.includes(child.key)){
            headTitle = item.title
          }
        })
      }
    }
  })
   

  useEffect(()=>{
      const timeoutId = setTimeout(()=>{
          let timem = new Date()
          setTimer(timem.getFullYear()+'-'+timem.getMonth()+'-'+timem.getDate()+' '+timem.getHours()+':'+timem.getMinutes()+':'+timem.getSeconds())
        },1000)

      return()=>{
          clearTimeout(timeoutId)
      }
  },[timer])
  // console.log(timer)
  return (
    <div className='header'>
      <div className='header-top'>
        <span>欢迎，{user.username}</span>
        <a href='#' onClick={showModal}>退出</a>
        <Modal title="提醒" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='确定' cancelText='取消'>
        <p>是否确认退出</p>
      </Modal>
      </div>
      <div className='header-bottom'>
        <div className='header-bottom-left'>
          <h2>{headTitle}</h2>
        </div>
        <div className='header-bottom-right'>
          <span>{timer}</span>
          <img src={logo} alt='天气'></img>
          <span>晴</span>
        </div>
      </div>
    </div>
  )
}
