import React, { useRef, useEffect } from "react";
import * as echarts from 'echarts';

//echart配置
const axiosOption = {

    // 图例文字颜色
    textStyle: {
        color: "#333",
    },
    // 提示框
    tooltip: {
        trigger: "axis",
    },
    xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
            lineStyle: {
                color: "#17b3a3",
            },
        },
        axisLabel: {
            interval: 0,
            color: "#333",
        },
    },
    yAxis: [
        {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: "#17b3a3",
                },
            },
        },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: [],
}

const normalOption = {
    tooltip: {
        trigger: "item",
    },
    color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
    ],
    series: [],
}
//样式,数据源,判断属于哪种类型(柱,饼等等)
const MyEcharts = ({ style, chartData, isAxiosChart = true }) => {
    //获取dom实例
    const echartRef = useRef()
    let echartObj = useRef(null)
    

    useEffect(() => {
        let options
        //echart初始化
        // echarts.init(echartRef.current)
        echartObj.current = echarts.init(echartRef.current)
        //设置option
        if (isAxiosChart) {
            //设置x轴
            axiosOption.xAxis.data = chartData.xData
            axiosOption.series = chartData.series
            options = axiosOption
        } else {
            normalOption.series = chartData.series
            options=normalOption
        }
   echartObj.current.setOption(options)

    }, [chartData])
    return (
        <div style={style} ref={echartRef}></div>
    )
}
export default MyEcharts