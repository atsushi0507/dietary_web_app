import MenuCard from "@/components/molecules/menuCard";
import TextSearch from "@/components/molecules/textSearch";
import { Typography } from "@mui/material";
import Button from "@/components/atoms/Button";
import React, { useState } from "react";
import styled from "styled-components";

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

const InputMeal = ({setSelectedMeal}) => {
    const [strMenu, setStrMenu] = useState("");
    const handleSearch = (e) => {
        setStrMenu(e.target.value);
    }
    const onClickSearchButton = () => {
        alert(`${strMenu}を検索します`)
    }

    const handleSelectedMeal = () => {
        setSelectedMeal(null);
    }

    return (
        <>
            <TextSearch
                strMenu={strMenu}
                setStrMenu={handleSearch}
                handleSearch={onClickSearchButton}
            />

            <MenuCard
                menuData={sampleData[0]}
            />
            <ButtonArray>
                <Button
                    onClick={handleSelectedMeal}
                >
                    食べなかった
                </Button>
                <Button
                    onClick={handleSelectedMeal}
                >
                    完了
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