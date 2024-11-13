import MenuCard from "@/components/molecules/menuCard";
import TextSearch from "@/components/molecules/textSearch";
import Button from "@/components/atoms/Button";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuEntry from "@/components/molecules/menuEntry";

const user_id = "test-user-123";

const sampleData = [];

const sampleSearchData = [
    {
        "menu": "チキンカツ",
        "cal": 270.0
    },
    {
        "menu": "とんかつ",
        "cal": 310.0
    },
    {
        "menu": "タコス",
        "cal": 189.0
    },
    {
        "menu": "コーヒー牛乳",
        "cal": 210
    },
    {
        "menu": "チャーハン",
        "cal": 168
    }
]

const InputMeal = ({date, selectedMeal, setSelectedMeal}) => {
    const [strMenu, setStrMenu] = useState("");
    const [doSearch, setDoSearch] = useState(false);
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
            "date": date,
            "meal_type": selectedMeal,
            "menus": menuSelections
        };
        saveMealRecord(tmpData);
    }

    // const removePreviousDayData = () => {
    //     const storedData = localStorage.getItem("todaysMealRecord");
    //     const today = new Date().toISOString().split("T")[0];
    //     if (!storedData) return;

    //     const todaysMeal = JSON.parse(storedData);
    //     if (todaysMeal.date !== today) {
    //         const mealRecords = JSON.parse(localStorage.getItem("mealRecord")) || {};
    //         mealRecords[todaysMeal.date] = todaysMeal.meals;

    //         localStorage.setItem("mealRecords", JSON.stringifiy(mealRecords));
    //         localStorage.setItem("todaysMealRecord", JSON.stringify({ date: today, menus: [] }));
    //     }
    // };

    // useEffect(() => {
    //     removePreviousDayData();
    // }, [today]);

    const saveMealRecord = (mealData) => {
        const storedData = localStorage.getItem("mealRecord");
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

        localStorage.setItem("mealRecord", JSON.stringify({ date: today, meals: todaysMeals }));
    }

    const handleSelectedMenu = (data) => {
        sampleData.push({
            "menu": data.menu,
            "cal": data.cal
        });

        // setSelectedMenu(data.menu);
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