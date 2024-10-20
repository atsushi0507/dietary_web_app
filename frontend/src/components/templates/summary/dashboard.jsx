import BasicTab from "@/components/atoms/Tab";
import React, { useState } from "react";
import styled from "styled-components";
import sampleData from "@/public/sampleAchievement.json";
import LineChart from "@/components/atoms/LineChart";

const tabOptions = [
    {label: "達成度"},
    {label: "体重"},
    {label: "ヒートマップ"}
]

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const handleTab = (e, newValue) => {
        setSelectedTab(newValue)
    }

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