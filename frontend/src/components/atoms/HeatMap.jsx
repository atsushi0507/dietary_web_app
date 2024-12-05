import React from "react";
import ReactEChart from "echarts-for-react";

const getDateRange = (data) => {
    if (data.length === 0) return null;

    const dates = data.map(item => new Date(item[0]));
    const minDate = new Date(Math.min(...dates)); // 最小日付
    const maxDate = new Date(Math.max(...dates)); // 最大日付

    // YYYY-MM-DD の形式で範囲を返す
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return [formatDate(minDate), formatDate(maxDate)];
};


const HeatMap = ({ data, max = 4, title, height = "150px" }) => {
    const range = getDateRange(data);

    const options = {
        title: {
            top: 30,
            left: "center",
            text: title
        },
        tooltip: {
            position: "top",
            formatter: function (params) {
                return `${params.value[0]}: ${params.value[1]}回の食事`;
            }
        },
        visualMap: {
            min: 0,
            max: max,
            type: "piecewise",
            orient: "horizontal",
            left: "center",
            top: 65,
            pieces: [
                { min: 0, max: 0, label: "0回 (食事なし)", color: "#d94e5d" },
                { min: 1, max: 1, label: "1回", color: "#f2c967" },
                { min: 2, max: 2, label: "2回", color: "#91cc75" },
                { min: 3, max: 4, label: "3回以上", color: "#73c0de" }
            ]
        },
        calendar: {
            top: 120,
            left: 30,
            right: 30,
            cellSize: ['auto', 13],
            itemStyle: {
              borderWidth: 0.5
            },
            yearLabel: { show: false },
            // range: ["2024-05", "2024-06"]
            range: range
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: data
          }
    };

    return <ReactEChart option={options} style={{height: height, width: "100%"}} />
};

export default HeatMap;