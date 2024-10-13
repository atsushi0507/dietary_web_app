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

const InputMeal = () => {
    const [strMenu, setStrMenu] = useState("");
    const handleSearch = (e) => {
        setStrMenu(e.target.value);
    }
    const onClickSearchButton = () => {
        alert(`${strMenu}を検索します`)
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
                    onClick={() => alert("食べてないです🍕")}
                >
                    食べなかった
                </Button>
                <Button
                    onClick={() => alert("完了")}
                >
                    完了
                </Button>
            </ButtonArray>
        </>
    );
};

export default InputMeal;

const ButtonArray = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`