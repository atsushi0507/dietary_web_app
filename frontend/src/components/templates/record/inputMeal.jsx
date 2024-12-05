import MenuCard from "@/components/molecules/menuCard";
import TextSearch from "@/components/molecules/textSearch";
import Button from "@/components/atoms/Button";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuEntry from "@/components/molecules/menuEntry";

const user_id = "test-user-123";

const sampleSearchData = [
    { menu: "チキンカツ", cal: 270.0 },
    { menu: "とんかつ", cal: 310.0 },
    { menu: "タコス", cal: 189.0 },
    { menu: "コーヒー牛乳", cal: 210 },
    { menu: "チャーハン", cal: 168 },
];

const InputMeal = ({ date, selectedMeal, setSelectedMeal }) => {
    const [strMenu, setStrMenu] = useState("");
    const [doSearch, setDoSearch] = useState(false);
    const [menuSelections, setMenuSelections] = useState({});
    const [sampleData, setSampleData] = useState([]);

    useEffect(() => {
        // 食事タイプが切り替わった際に状態をリセット
        setSampleData([]);
        setMenuSelections({});
        setDoSearch(false);
    }, [selectedMeal]);

    const handleMenuChange = (menu, volume) => {
        setMenuSelections((prevState) => ({
            ...prevState,
            [menu]: volume,
        }));
    };

    const handleSearch = (e) => {
        setStrMenu(e.target.value);
    };

    const onClickSearchButton = () => {
        setDoSearch(true);
    };

    const handleRegisterMeal = () => {
        const tmpData = {
            user_id,
            date,
            meal_type: selectedMeal,
            menus: menuSelections,
        };
        saveMealRecord(tmpData);
        resetState();
        setSelectedMeal(null);
    };

    const handleNoMeal = () => {
        const tmpData = {
            user_id,
            date,
            meal_type: selectedMeal,
            menus: {"食べなかった": 1},
        };
        saveMealRecord(tmpData);
        resetState();
        setSelectedMeal(null);
    };

    const handleDeleteMenu = (menu) => {
        setMenuSelections((prevSelections) => {
            // 新しいオブジェクトを作成して対象のキーを削除
            const updatedSelections = { ...prevSelections };
            delete updatedSelections[menu];
            return updatedSelections;
        });

        setSampleData((prevData) => prevData.filter((item) => item.menu !== menu));
    }

    const saveMealRecord = (mealData) => {
        const mealRecords = JSON.parse(localStorage.getItem("mealRecord")) || {};

        if (!mealRecords[mealData.date]) mealRecords[mealData.date] = {};
        if (!mealRecords[mealData.date][mealData.meal_type])
            mealRecords[mealData.date][mealData.meal_type] = {};

        Object.entries(mealData.menus).forEach(([menu, volume]) => {
            mealRecords[mealData.date][mealData.meal_type][menu] = volume;
        });

        localStorage.setItem("mealRecord", JSON.stringify(mealRecords));
    };

    const resetState = () => {
        setSampleData([]);
        setMenuSelections({});
        setStrMenu("");
        setDoSearch(false);
    };

    const handleSelectedMenu = (data) => {
        setSampleData((prevData) => [
            ...prevData,
            { menu: data.menu, cal: data.cal },
        ]);
        setDoSearch(false);
    };

    return (
        <>
            <TextSearch
                strMenu={strMenu}
                setStrMenu={handleSearch}
                handleSearch={onClickSearchButton}
            />

            {!doSearch &&
                sampleData.map((data) => (
                    <MenuCard
                        key={data.menu}
                        menuData={data}
                        onVolumeChange={handleMenuChange}
                        onDelete={handleDeleteMenu}
                    />
                ))}
            {doSearch &&
                sampleSearchData.map((data) => (
                    <MenuEntry
                        key={data.menu}
                        menuResult={data}
                        handleAddMeal={handleSelectedMenu}
                    />
                ))}
            <ButtonArray>
                <Button onClick={handleNoMeal}>食べなかった</Button>
                <Button onClick={handleRegisterMeal}>登録</Button>
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
`;
