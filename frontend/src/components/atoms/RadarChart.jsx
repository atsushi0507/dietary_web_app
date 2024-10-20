"use client";
import React, { useRef, useState, useEffect } from "react";
import * as echarts from "echarts";

const RadarChart = ({ title = "Radar Chart", darkMode, indicators, seriesData, maxValues, chartHeight = "350px", unit = "%" }) => {
    const chartRef = useRef(null);
    const [radius, setRadius] = useState(120); // 初期値は120
    const [myChart, setMyChart] = useState(null); // チャートインスタンスを保存

    // チャートオプションを返す関数
    const getOptions = (radius) => ({
        title: {
            text: title,
            top: 'top',  // titleの位置を上に配置
            left: 'center',  // 中央揃え
            textStyle: {
                fontSize: 14
            },
            show:false
        },
        legend: {
            top: 'bottom',
        },
        radar: [
            {
                indicator: indicators.map((indicator, index) => ({
                    name: indicator,
                    max: maxValues ? maxValues[index] : 150, // maxValuesが指定されていない場合のデフォルト値
                })),
                center: ["50%", "50%"], // 中心位置を調整
                radius: "75%",  // 自動計算されたradiusを使用
                startAngle: 90,
                splitNumber: 5,
                axisNameGap: 8,

                axisName: {
                    formatter: "{value}",
                    color: "#428bd4",
                },

                axisLine: {
                    lineStyle: {
                        color: "rgba(211, 253, 250, 0.8)",
                    },
                },
            },
        ],
        series: [
            {
                type: "radar",
                emphasis: {
                    linestyle: {
                        width: 4,
                    },
                },
                data: seriesData.map((item) => ({
                    value: item.values,
                    name: item.name,
                    areaStyle: {
                        color: item.color || "rgba(255, 188, 52, 0.6)", // デフォルトのエリア色
                    },
                    label: {
                        show: true,
                        formatter: function (params) {
                            return params.value.toFixed(1) + unit;
                        },
                    },
                })),
            },
        ],
    });

    useEffect(() => {
        const adjustRadius = () => {
            if (chartRef.current) {
                // 親要素の横幅を取得
                const chartWidth = chartRef.current.clientWidth;
                const margin = 10; // 左右のマージンを固定で10pxとする
                const availableWidth = chartWidth - margin * 2;

                // レーダーチャートのradiusを(availableWidth / 2)で設定
                const newRadius = availableWidth / 3;
                setRadius(newRadius);
            }
        };

        adjustRadius(); // 初期設定

        if (chartRef.current) {
            const chartInstance = echarts.init(chartRef.current, darkMode ? "dark" : "light");
            setMyChart(chartInstance); // チャートインスタンスを保存
            chartInstance.setOption(getOptions(radius)); // 初回のオプション設定

            const handleResize = () => {
                adjustRadius(); // ウィンドウリサイズ時にradiusを再調整
                chartInstance.resize();
            };

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
                chartInstance.dispose();
            };
        }
    }, [darkMode]); // darkMode に基づいて再レンダリング

    // radius が変更された場合にのみチャートを再描画
    useEffect(() => {
        if (myChart) {
            myChart.setOption(getOptions(radius)); // radius に基づいて再描画
        }
    }, [radius, myChart]); // radius 変更時のみ再描画

    return (
        <div>
            <div ref={chartRef} style={{ width: "100%", height: chartHeight }} />
        </div>
    );
};

export default RadarChart;
