import React from "react";
import ReactEChart from "echarts-for-react";

const PieChart = ({ data, title, height = "150px" }) => {
    const options = {
        tooltip: {
            trigger: "item"
        },
        legend: {
            top: "5%",
            left: "center"
        },
        series: [
            {
                label: {
                    show: false,
                    position: "center"
                },
                emphasis: {
                        label: {
                        show: true,
                        fontWeight: "bold",
                        fontSize: 20,
                        formatter: "{b}: {d}%"
                    }
                },
                labelLine: {
                    show: false
                },
                data: data,
                name: title,
                type: "pie",
                radius: ["50%", "75%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2
                }
            }
        ]
    };

    return <ReactEChart option={options} style={{height: height, width: "100%"}}/>;
};

export default PieChart;