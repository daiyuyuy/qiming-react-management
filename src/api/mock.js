import Mock from "mockjs"
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'

//拦截接口
// Mock.mock(/home\/getData/, function () {
//     console.log("被拦截的接口");
// })
//主页
Mock.mock(/home\/getData/, homeApi.getStatisticalData)
//用户
Mock.mock(/user\/getUser/, userApi.getUserList)
//新增
Mock.mock(/user\/addUser/, 'post', userApi.createUser)
//编辑
Mock.mock(/user\/editUser/, 'post', userApi.updateUser)
//删除
Mock.mock(/user\/delUser/, 'post', userApi.deleteUser)