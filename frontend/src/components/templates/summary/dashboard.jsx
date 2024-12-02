import BasicTab from "@/components/atoms/Tab";
import React, { useState } from "react";
import styled from "styled-components";
import sampleData from "@/public/sampleAchievement.json";
import LineChart from "@/components/atoms/LineChart";
import PieChart from "@/components/atoms/PieChart";
import HeatMap from "@/components/atoms/HeatMap";
import useCalcWeeklyNutrition from "@/hooks/useCalcWeeklyNutrition";
import { useAveragePFC } from "@/hooks/useAveragePFC";
import { useMealTypeAverageCalories } from "@/hooks/useMealTypeAverageCalories";
import useMealCount from "@/hooks/useMealCount";
import useNutrientRatio from "@/hooks/useNutritionRatio";

const tabOptions = [
    {label: "達成度"},
    {label: "PFCバランス"},
    {label: "カロリーバランス"},
    {label: "ヒートマップ"}
];

const sampleHeatmapData = [
    ["2024-05-01", 3], ["2024-05-02", 3], ["2024-05-03", 2], ["2024-05-04", 3],["2024-05-05", 3],
    ["2024-05-06", 3], ["2024-05-07", 3], ["2024-05-08", 2], ["2024-05-09", 3],["2024-05-10", 3],
    ["2024-05-11", 2], ["2024-05-12", 2], ["2024-05-13", 2], ["2024-05-14", 3],["2024-05-15", 3],
    ["2024-05-16", 3], ["2024-05-17", 3], ["2024-05-18", 1], ["2024-05-19", 3],["2024-05-20", 3],
    ["2024-05-21", 2], ["2024-05-22", 1], ["2024-05-23", 2], ["2024-05-24", 3],["2024-05-25", 3],
    ["2024-05-26", 3], ["2024-05-27", 4], ["2024-05-28", 2], ["2024-05-29", 3],["2024-05-30", 3],
    ["2024-05-31", 3], ["2024-06-01", 3], ["2024-06-02", 3], ["2024-06-03", 2]
]
console.log(sampleHeatmapData);

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const handleTab = (e, newValue) => {
        setSelectedTab(newValue)
    }

    const weeklyData = useCalcWeeklyNutrition();
    const averagePFC = useAveragePFC(weeklyData);
    const averageMealCalories = useMealTypeAverageCalories(weeklyData);
    const heatmapData = useMealCount();
    const nutritionRatio = useNutrientRatio();
    console.log(nutritionRatio);

    return (
        <Container>
            <BasicTab
                items={tabOptions}
                value={selectedTab}
                onChange={handleTab}
            />
            {selectedTab === 0 &&
            <LineChart
                data={sampleData}
                seriesKeys={["calories", "protein", "fat", "carbs"]}
                title="sample"
                yAxisLabel="達成度"
                height="275px"
            />}
            {selectedTab === 1 &&
            <PieChart
                title="PFCバランス"
                // data={samplePFCData}
                data={averagePFC}
                height="300px"
            />
            }
            {selectedTab === 2 &&
            <PieChart
                title="カロリーバランス"
                data={averageMealCalories}
                height="300px"
            />
            }
            {selectedTab === 3 &&
            <HeatMap
                title="食事回数"
                max={4}
                data={sampleHeatmapData}
                height="300px"
            />
            }
        </Container>
    );
};

export default Dashboard;

const Container = styled.div`
    height: 320px;
    width: 100%;
    background-color: rgba(255, 125, 0, 0.3);
    justify-content: "center";
    overflow: auto;
`