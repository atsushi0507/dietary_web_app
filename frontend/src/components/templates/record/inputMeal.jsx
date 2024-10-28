import MenuCard from "@/components/molecules/menuCard";
import TextSearch from "@/components/molecules/textSearch";
import { Typography } from "@mui/material";
import Button from "@/components/atoms/Button";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuEntry from "@/components/molecules/menuEntry";

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

const InputMeal = ({setSelectedMeal}) => {
    const [strMenu, setStrMenu] = useState("");
    const [doSearch, setDoSearch] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState({"menu": "", "cal": null});

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