// mock数据模拟
import Mock from 'mockjs'

// 图表数据
let List = []
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          连衣裙: Mock.Random.float(100, 8000, 0, 0),
          白T恤: Mock.Random.float(100, 8000, 0, 0),
          半身裙: Mock.Random.float(100, 8000, 0, 0),
          七分裤: Mock.Random.float(100, 8000, 0, 0),
          外搭: Mock.Random.float(100, 8000, 0, 0),
          吊带: Mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: '连衣裙',
            value: 2999
          },
          {
            name: '白T恤',
            value: 4999
          },
          {
            name: '半身裙',
            value: 1500
          },
          {
            name: '七分裤',
            value: 1999
          },
          {
            name: '外搭',
            value: 2200
          },
          {
            name: '吊带',
            value: 5500
          }
        ],
        // 柱状图
        userData: [
          {
            date: '周一',
            new: 5,
            active: 200
          },
          {
            date: '周二',
            new: 10,
            active: 500
          },
          {
            date: '周三',
            new: 12,
            active: 550
          },
          {
            date: '周四',
            new: 60,
            active: 800
          },
          {
            date: '周五',
            new: 65,
            active: 550
          },
          {
            date: '周六',
            new: 53,
            active: 770
          },
          {
            date: '周日',
            new: 33,
            active: 170
          }
        ],
        // 折线图
        orderData: {
          date: ['20240620', '20240621', '20240622', '20240623', '20240624', '20240625', '20240626'],
          data: List
        },
        tableData: [
          {
            name: '连衣裙',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000
          },
          {
            name: '白T恤',
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: 24000
          },
          {
            name: '半身裙',
            todayBuy: 800,
            monthBuy: 4500,
            totalBuy: 65000
          },
          {
            name: '七分裤',
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: 45000
          },
          {
            name: '外搭',
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: 34000
          },
          {
            name: '吊带',
            todayBuy: 350,
            monthBuy: 3000,
            totalBuy: 22000
          }
        ]
      }
    }
  }
}
