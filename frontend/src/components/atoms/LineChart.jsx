import React from 'react';
import ReactECharts from 'echarts-for-react'; // ECharts Reactコンポーネント

const LineChart = ({ data, seriesKeys, title = "Line Chart", yAxisLabel = "Value", height = "150px" }) => {
    // `data`は日付と各項目の値を持つ配列 (例: [{date: "2024-05-01", calories: 99.8, protein: 89.2}, ...])
    // `seriesKeys`は描画したいデータのキー (例: ["calories", "protein"])
    
    // X軸の値はすべてのデータで共通なので、日付だけ取得
    const dates = data.map(item => item.date);

    // seriesKeysに応じて、系列データを構築
    const series = seriesKeys.map(key => ({
        name: key, // シリーズの名前 (例: "calories", "protein")
        type: 'line', // 線グラフ
        data: data.map(item => item[key]), // 各日付ごとの値
        smooth: true, // 曲線にする (任意)
        showSymbol: false, // データポイントのシンボルを非表示 (必要に応じて変更)
    }));

    const seriesWithFill = series.map(item => ({
        ...item,
        markArea: {
            data: [
                // 適正範囲（例: 90%〜110% を緑色で塗りつぶす）
                [
                    { yAxis: 90 }, 
                    { yAxis: 110 }
                ],
                // 下限の危険範囲（例: 70%以下を赤色で塗りつぶす）
                [
                    { yAxis: 'min' }, 
                    { yAxis: 70 }
                ],
                // 上限の危険範囲（例: 130%以上を赤色で塗りつぶす）
                [
                    { yAxis: 130 },
                    { yAxis: 'max' }
                ]
            ],
            itemStyle: {
                color: (params) => {
                    const yAxisStart = params.coord[0].y;
                    const yAxisEnd = params.coord[1].y;
                    if (yAxisStart === 90 && yAxisEnd === 110) {
                        return 'rgba(144,238,144,0.3)'; // 薄い緑色
                    } else {
                        return 'rgba(255,69,0,0.3)'; // 薄い赤色
                    }
                },
            },
        }
    }));

    // EChartsのオプション設定
    const options = {
        title: {
            text: title, // グラフのタイトル
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: seriesKeys, // 凡例として表示するデータの名前
            bottom: "0%"
            // top: 'auto',
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true,
        },
        xAxis: {
            type: 'category', // 日付はカテゴリデータ
            boundaryGap: false,
            data: dates, // X軸のラベル (日付)
        },
        yAxis: {
            type: 'value', // Y軸は数値
            name: yAxisLabel, // Y軸のラベル (例: "達成率")
        },
        series: series, // 描画するシリーズデータ
    };

    return <ReactECharts option={options} style={{ height: height, width: '90%' }} />;
};

export default LineChart;
