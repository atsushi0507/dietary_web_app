"use client";
import Text from "@/components/atoms/Text";
import Title from "@/components/atoms/Title";
import Button from "@/components/atoms/Button";
import React from "react";
import styled from "styled-components";
import useCalorieAndPFC from "@/hooks/useCalorieAndPFC";
import { Typography } from "@mui/material";

const FinalView = ({ answers, onPrevious}) => {
    const {calorieIntake, protein, fat, carbs} = useCalorieAndPFC(answers);
    return (
        <>
            <Typography variant="h4">
                あなたの一日の目安です
            </Typography>
            <ResultView>
                <FactorArea>
                    <Typography variant="bold1" sx={{fontWeight: "bold"}}>
                        摂取カロリー: 
                    </Typography>
                    <span>{calorieIntake} kcal</span>
                </FactorArea>
                <FactorArea>
                    <Typography variant="body1" sx={{fontWeight: "bold"}}>
                        タンパク質: 
                    </Typography>
                    <span>{protein} g</span>
                </FactorArea>
                <FactorArea>
                    <Typography variant="bold1" sx={{fontWeight: "bold"}}>
                        脂質: 
                    </Typography>
                    <span>{fat} g</span>
                </FactorArea>
                <FactorArea>
                    <Typography variant="body1" sx={{fontWeight: "bold"}}>
                        炭水化物: 
                    </Typography>
                    <span>{carbs} g</span>
                </FactorArea>
            </ResultView>

            <SampleMenuArea>
                <Typography variant="h5">
                    サンプルメニュー
                </Typography>
            </SampleMenuArea>            

            <FootButton>
                <Button onClick={onPrevious}>
                    戻る
                </Button>
                <Button onClick={() => alert("完了です！")}>
                    完了
                </Button>
            </FootButton>
        </>
    );
};

export default FinalView;

const ResultView = styled.div`
    display: flex;
    flex-direction: column;
`

const FactorArea = styled.div`
    display: flex;
    flex-direction: row;
`

const FootButton = styled.div`
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`

const SampleMenuArea = styled.div`
    background-color: gray;
`