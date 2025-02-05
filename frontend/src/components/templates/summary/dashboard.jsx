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
import { Typography } from "@mui/material";

const tabOptions = [
    {label: "達成度"},
    {label: "PFCバランス"},
    {label: "カロリーバランス"},
    {label: "ヒートマップ"}
];

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

    return (
        <Container>
            <BasicTab
                items={tabOptions}
                value={selectedTab}
                onChange={handleTab}
            />
            {selectedTab === 0 &&
            <LineChart
                data={nutritionRatio}
                seriesKeys={["calories", "protein", "fat", "carb"]}
                title="sample"
                yAxisLabel="達成度"
                height="275px"
            />}
            {selectedTab === 1 &&
            <PieChart
                title="PFCバランス"
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
            {selectedTab === 3 && (
                heatmapData.length > 0 ? (
                    <HeatMap
                        title="食事回数"
                        max={4}
                        data={heatmapData}
                        height="300px"
                    />
                ) : (
                    <Typography variant="body1">
                        食事記録がありません
                    </Typography>
                )
            )}

        </Container>
    );
};

export default Dashboard;

const Container = styled.div`
    height: 320px;
    width: 100%;
    background-color: #f5f5f5;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid #ccc;
    border-radius: 4px;
    justify-content: "center";
    overflow: auto;
`