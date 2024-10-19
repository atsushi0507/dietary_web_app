import BasicTab from "@/components/atoms/Tab";
import React, { useState } from "react";
import styled from "styled-components";

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
        </Container>
    );
};

export default Dashboard;

const Container = styled.div`
    height: 400px;
    width: 100%;
    background-color: rgba(255, 125, 0, 0.3);
    overflow: auto;
`