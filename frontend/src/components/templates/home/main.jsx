"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import BasicTab from "@/components/atoms/Tab";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import BalanceIcon from '@mui/icons-material/Balance';
import MenuList from "./menuList";
import CalorieRanking from "./calorieRanking";
import BalanceRanking from "./balanceRanking";
import TopReport from "./topReport";
import useCalcTodaysNutrition from "@/hooks/useMealData";
import axios from "axios";
import { auth } from "@/firebase/firebaseConfig";

const tabOptions = [
    { icon: <RestaurantIcon />, label: "食事" },
    { icon: <LocalFireDepartmentIcon />, label: "カロリー" },
    { icon: <BalanceIcon />, label: "バランス" }
];

const Main = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [basicInfo, setBasicInfo] = useState({
        cal: 0.0,
        P: 0.0,
        F: 0.0,
        C: 0.0
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = localStorage.getItem("userData");
                if (!userData) {
                    const user = auth.currentUser;
                    const uid = user.uid;

                    // axios を使用して Cloud Functions を呼び出す
                    const response = await axios.get(
                        "https://asia-northeast1-dietary-web-app.cloudfunctions.net/get_user",
                        {
                            params: { uid: uid }, // クエリパラメータとして uid を送信
                        }
                    );
                    const userDataFromFS = response.data.user_info;

                    // ローカルストレージに保存
                    localStorage.setItem("userData", JSON.stringify(userDataFromFS));

                    // 状態を更新
                    setBasicInfo({
                        cal: parseFloat(userDataFromFS.cal).toFixed(1),
                        P: parseFloat(userDataFromFS.protein).toFixed(1),
                        F: parseFloat(userDataFromFS.fat).toFixed(1),
                        C: parseFloat(userDataFromFS.carb).toFixed(1)
                    });
                } else {
                    const parsedData = JSON.parse(userData);
                    setBasicInfo({
                        cal: parseFloat(parsedData.cal).toFixed(1),
                        P: parseFloat(parsedData.protein).toFixed(1),
                        F: parseFloat(parsedData.fat).toFixed(1),
                        C: parseFloat(parsedData.carb).toFixed(1)
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []); // 空の依存配列で初回レンダリング時にのみ実行

    const sampleFromLS = useCalcTodaysNutrition();

    const handleSelectedTab = (e, newValue) => {
        setSelectedTab(newValue);
    }

    return (
        <Grid container direction="column">
            <Grid size={12}>
                <TopReport mealData={sampleFromLS} person={basicInfo}/>
            </Grid>
            <Grid size={12}>
                <BasicTab
                    items={tabOptions}
                    value={selectedTab}
                    onChange={handleSelectedTab}
                />
                {selectedTab === 0 && <MenuList mealData={sampleFromLS} />}
                {selectedTab === 1 && <CalorieRanking mealData={sampleFromLS} />}
                {selectedTab === 2 && <BalanceRanking mealData={sampleFromLS} person={basicInfo}/>}
            </Grid>
        </Grid>
    );
};

export default Main;
