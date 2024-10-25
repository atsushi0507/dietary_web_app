import Button from "@/components/atoms/Button";
import NumberInput from "@/components/atoms/NumberInput";
import { Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const user_id = "test-user-123";

const WeightRecord = ({ date }) => {
    const [weight, setWeight] = useState(48);
    const [message, setMessage] = useState("");

    const saveToLocalStorage = (weightData) => {
        const storedData = localStorage.getItem("weightRecords");
        const currentDate = new Date().toISOString().split("T")[0];
        let records = {};

        if (storedData) {
            records = JSON.parse(storedData);
        } else {
            record = {};
        }

        // 今日の日付のレコードがない場合、空の配列を作成
        if (!records[currentDate]) {
            records[currentDate] = [];
        }

        // 新しい体重データを配列に追加
        records[currentDate].push({
            weight: weightData.weight,
            timestamp: weightData.timestamp,
            date: date,
            user_id: weightData.user_id,
        });

        localStorage.setItem("weightRecords", JSON.stringify(records));
    };

    // 前日のデータを削除する関数
    const removePreviousDayData = () => {
        const storedData = localStorage.getItem("weightRecords");
        if (!storedData) return;

        const records = JSON.parse(storedData);
        // const today = new Date().toISOString().split('T')[0]; // 今日の日付を取得
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]; // 昨日の日付を取得

        // 昨日の日付のデータを削除
        if (records[yesterday]) {
            delete records[yesterday];
            localStorage.setItem("weightRecords", JSON.stringify(records));
        }
    };

    useEffect(() => {
        // アプリが起動した際、またはコンポーネントがマウントされた際に前日のデータを削除
        removePreviousDayData();
    }, []);

    // firestore に保存する仕組み
    const recordWeightToFS = async (weightData) => {
        try {
            const response = await axios.post(
                "https://url.url",
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
            timestamp: new Date().toISOString(), // タイムスタンプを付与
            date: date,
            user_id: user_id
        };
        saveToLocalStorage(weightData);
        recordWeightToFS(weightData);
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