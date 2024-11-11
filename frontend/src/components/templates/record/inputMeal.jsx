import MenuCard from "@/components/molecules/menuCard";
import TextSearch from "@/components/molecules/textSearch";
import { Typography } from "@mui/material";
import Button from "@/components/atoms/Button";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuEntry from "@/components/molecules/menuEntry";
import WeightRecord from "./weightRecord";
import local from "next/font/local";

const user_id = "test-user-123";

const sampleData = [];

const sampleSearchData = [
    {
        "menu": "牛丼",
        "cal": 586
    },
    {
        "menu": "牛タン",
        "cal": 350
    },
    {
        "menu": "牛カルビ定食",
        "cal": 860
    },
    {
        "menu": "コーヒー牛乳",
        "cal": 210
    },
    {
        "menu": "神戸牛フィレステーキ",
        "cal": 750
    }
]

const InputMeal = ({date, selectedMeal, setSelectedMeal}) => {
    const [strMenu, setStrMenu] = useState("");
    const [doSearch, setDoSearch] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState({"menu": "", "cal": null});
    const [menuSelections, setMenuSelections] = useState({});

    const handleMenuChange = (menu, volume) => {
        setMenuSelections(prevState => ({
            ...prevState,
            [menu]: volume
        }));
    };

    const handleSearch = (e) => {
        setStrMenu(e.target.value);
    }
    const onClickSearchButton = () => {
        alert(`${strMenu}を検索します`)
        setDoSearch(true);
    }

    const handleSelectedMeal = () => {
        setSelectedMeal(null);
        setDoSearch(false);

        const tmpData = {
            "user_id": user_id,
            "meal_type": selectedMeal,
            "menus": menuSelections
        };
        saveToLocalStorage(tmpData);
        saveTodaysRecord(tmpData);
    }

    const removePreviousDayData = () => {
        const storedData = localStorage.getItem("todaysMealRecord");
        const today = new Date().toISOString().split("T")[0];
        if (!storedData) return;

        const todaysMeal = JSON.parse(storedData);
        if (todaysMeal.date !== today) {
            const mealRecords = JSON.parse(localStorage.getItem("mealRecord")) || {};
            mealRecords[todaysMeal.date] = todaysMeal.meals;

            localStorage.setItem("mealRecords", JSON.stringifiy(mealRecords));
            localStorage.setItem("todaysMealRecord", JSON.stringify({ date: today, menus: [] }));
        }
    };

    useEffect(() => {
        removePreviousDayData();
    }, []);

    const saveToLocalStorage = (mealData) => {
        const storedData = localStorage.getItem("mealRecords");
        const currentDate = new Date().toISOString().split("T")[0];
        let records = {};

        if (storedData) {
            records = JSON.parse(storedData);
        } else {
            records = {};
        }

        if (!records[currentDate]) {
            records[currentDate] = [];
        }

        // 新しい食事データを配列に追加
        records[currentDate].push({
            user_id: mealData.user_id,
            date: date,
            meal_type: mealData.meal_type,
            menus: mealData.menus
        });

        localStorage.setItem("mealRecords", JSON.stringify(records));
    };

    const saveTodaysRecord = (mealData) => {
        const storedData = localStorage.getItem("todaysMealRecord");
        const today = new Date().toISOString().split("T")[0];
        const todaysMeals = storedData ? JSON.parse(storedData).meals : [];

        const existingMealIndex = todaysMeals.findIndex(
            (meal) => meal.meal_type === mealData.meal_type
        );

        if (existingMealIndex >= 0) {
            const existingMeal = todaysMeals[existingMealIndex];
            existingMeal.menus = {
                ...existingMeal.menus,
                ...mealData.menus
            };
        } else {
            todaysMeals.push({
                date: date,
                meal_type: mealData.meal_type,
                menus: mealData.menus
            });
        }

        localStorage.setItem("todaysMealRecord", JSON.stringify({ date: today, meals: todaysMeals }));
    }

    const handleSelectedMenu = (data) => {
        sampleData.push({
            "menu": data.menu,
            "cal": data.cal
        });

        setSelectedMenu(data.menu);
        setDoSearch(false);
    }

    return (
        <>
            <TextSearch
                strMenu={strMenu}
                setStrMenu={handleSearch}
                handleSearch={onClickSearchButton}
            />

            {!doSearch && sampleData.map((data) => {
                return (
                    <MenuCard
                        key={data.menu}
                        menuData={data}
                        onVolumeChange={handleMenuChange}
                    />
                );
            })}
            {doSearch && sampleSearchData.map((data) => {
                return (
                    <MenuEntry
                        key={data.menu}
                        menuResult={data}
                        handleAddMeal={handleSelectedMenu}
                    />
                );
            })}
            <ButtonArray>
                <Button
                    onClick={handleSelectedMeal}
                >
                    食べなかった
                </Button>
                <Button
                    onClick={handleSelectedMeal}
                >
                    登録
                </Button>
            </ButtonArray>
        </>
    );
};

export default InputMeal;

const ButtonArray = styled.div`
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
`