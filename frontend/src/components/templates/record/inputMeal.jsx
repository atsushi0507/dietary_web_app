import MenuCard from "@/components/molecules/menuCard";
import TextSearch from "@/components/molecules/textSearch";
import { Typography } from "@mui/material";
import Button from "@/components/atoms/Button";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuEntry from "@/components/molecules/menuEntry";
import WeightRecord from "./weightRecord";

const user_id = "test-user-123";

const sampleData = [
    {
        "menu": "カレーライス",
        "cal": 720
    },
    {
        "menu": "コーンサラダ",
        "cal": 140
    }
];

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
    }

    const removePreviousDayData = () => {
        const storedData = localStorage.getItem("mealRecords");
        if (!storedData) return;

        const records = JSON.parse(storedData);
        const today = new Date();

        // 3日以上前の日付を削除
        Object.keys(records).forEach(recordDate => {
            const recordDateObj = new Date(recordDate);
            const diffInDays = (today - recordDateObj) / (1000 * 60 * 60 * 24);
            
            if (diffInDays >= 1) {
                delete records[recordDate];
            }
        });

        localStorage.setItem("mealRecords", JSON.stringify(records));
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