import Button from "@/components/atoms/Button";
import NumberInput from "@/components/atoms/NumberInput";
import { Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const user_id = "test-user-123";

const WeightRecord = ({ date }) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [weight, setWeight] = useState(userData.weight);
    const [message, setMessage] = useState("");

    const saveToLocalStorage = (weightData) => {
        let weightRecords = JSON.parse(localStorage.getItem("weightRecords")) || {};

        if (!weightRecords[date]) weightRecords[date] = parseFloat(weightData.weight);

        weightRecords[date] = parseFloat(weightData.weight);

        localStorage.setItem("weightRecords", JSON.stringify(weightRecords));
    };

    // firestore に保存する仕組み
    const recordWeightToFS = async (weightData) => {
        try {
            console.log(weightData);
            const response = await axios.post(
                "https://asia-northeast1-dietary-web-app.cloudfunctions.net/record_weight_to_fs",
                weightData
            );
            setMessage(response.data.message);
        } catch(error) {
            setMessage("Error recording weight...: " + error.message);
        }
    };

    const handleButton = () => {
        const weightData = {
            weight: weight,
            date: date
        };
        saveToLocalStorage(weightData);
        // recordWeightToFS(weightData);
    }
    return (
        <>
            <div>
                <NumberInput
                    value={weight}
                    step={0.1}
                    name="weight"
                    min={30.0}
                    max={200.0}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <span> kg</span>
            </div>
            <FootButton>
                <Button onClick={handleButton}>
                    登録
                </Button>
            </FootButton>
        </>
    );
};

export default WeightRecord;

const FootButton = styled.div`
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`