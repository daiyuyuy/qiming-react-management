import React, { useEffect, useState } from "react";
import { Col, Row, Card, Table } from "antd";
import * as Icon from "@ant-design/icons";
import "./home.css";
import { getData } from "../../api";
// import * as echarts from 'echarts';
import MyEcharts from '../../components/Echars'

//table数据
const columns = [
  {
    title: '款式',
    dataIndex: 'name'
  },
  {
    title: '今日购买',
    dataIndex: 'todayBuy'
  },
  {
    title: '本月购买',
    dataIndex: 'monthBuy'
  },
  {
    title: '总购买',
    dataIndex: 'totalBuy'
  }
]

//订单数据
const countData = [
  {
    "name": "今日支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "今日收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "今日未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#ed1d24"
  },
  {
    "name": "本月支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "本月收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "本月未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#ed1d24"
  }
]

//动态获取icon
const iconElement = (name) => React.createElement(Icon[name]);
const Home = () => {

  //为防止后续路径问题,可以直接用require引入
  const userImg = require("../../assets/images/cat.png");
  //首次
  useEffect(() => {
    getData().then(({ data }) => {
      console.log(data, "res");
      const { tableData, orderData, userData, videoData } = data.data
      setTableData(tableData)

      //x轴
      const xData = orderData.date
      //series
      //Object.keys将key转换为数组
      const keyArray = Object.keys(orderData.data[0])
      const series = []
      keyArray.forEach(key => {
        series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line'
        })
      })
      setEchartData({
        orderData: { xData, series },
        user: {
          xData: userData.map(item => item.date),
          series: [{
            name: '新增单品',
            data: userData.map(item => item.new),
            type: "bar"
          },
          {
            name: '爆款单品',
            data: userData.map(item => item.active),
            type: "bar"
          }]
        },
        video: {
          series: [
            {
              data: videoData,
              type: "pie"
            }
          ]
        }
      })
    })
    // 基于准备好的dom，初始化echarts实例

  }, [])



  //定义table数据

  const [tableData, setTableData] = useState([])
  //echart响应式数据
  const [echartData, setEchartData] = useState({})

  return (
    <Row className="home">
      <Col span={9}>
        <Card hoverable>
          <div className="user">
            <img src={userImg} alt="" />
            <div className="userinfo">
              <p className="name">dy喵</p>
              <p className="access">管理员</p>
            </div>
          </div>
          <div className="login-message">
            <p>上次登录时间：<span>2021-7-19</span></p>
            <p>上次登录地点：<span>上海</span></p>
          </div>
        </Card>
        <Card hoverable style={{ marginTop: 10 }}>
          {/* 记得rowKey, */}
          <Table rowKey={'name'} columns={columns} dataSource={tableData} pagination={false}></Table>
        </Card>
      </Col>
      <Col span={15}>
        <div className="num">
          {
            countData.map((item, index) => {
              return (
                <Card key={index} hoverable>
                  <div className="icon-box" style={{ background: item.color }}>
                    {iconElement(item.icon)}
                  </div>
                  <div className="detail">
                    <p className="num">{item.value}</p>
                    <p className="txt">{item.name}</p>
                  </div>
                </Card>
              )
            })
          }
        </div>
        {echartData.orderData && <MyEcharts chartData={echartData.orderData} style={{ height: "280px" }}></MyEcharts>}
        <div className="graph">
          {echartData.user && <MyEcharts chartData={echartData.user} style={{ height: "240px", width: "50%" }} />}
          {echartData.video && <MyEcharts chartData={echartData.video} isAxiosChart={false} style={{ height: "260px", width: "50%" }} />}
        </div>

      </Col>
    </Row>
  );
};

export default Home;
