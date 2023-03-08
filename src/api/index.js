/* 
包含应用中所有接口请求函数的模块
*/
import ajax from "./ajax";
import axios from "axios";

/* 
登录
*/
export const reqLogin = (username, password) => ajax('/login',{username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST')

export const reqWeather = (city) => {
    const url = `https://api.apiopen.top/api/getTime`
    axios({
        method:'GET',
        url:url,
        dataType:'jsonp',
    }).then((res)=>{
        console.log(res)
    })
}
// reqWeather('北京')

export const reqCategorys = (parentId) => ajax('/manage/category/list', {parentId})

export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add',{categoryName, parentId}, 'POST')

export const reqUpdateCategory = (categoryName, parentId)=> ajax('/manage/category/update', { parentId ,categoryName }, 'POST')
