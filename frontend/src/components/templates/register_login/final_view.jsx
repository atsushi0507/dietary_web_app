"use client";
import Text from "@/components/atoms/Text";
import Title from "@/components/atoms/Title";
import Button from "@/components/atoms/Button";
import React from "react";
import styled from "styled-components";
import useCalorieAndPFC from "@/hooks/useCalorieAndPFC";

const FinalView = ({ answers, onPrevious}) => {
    const {calorieIntake, protein, fat, carbs} = useCalorieAndPFC(answers);
    return (
        <>
            <Title level={2}>
                あなたの一日の目安です
            </Title>
            <ResultView>
                <FactorArea>
                    <Text fontWeight="bold">
                        摂取カロリー: 
                    </Text>
                    <span>{calorieIntake} kcal</span>
                </FactorArea>
                <FactorArea>
                    <Text fontWeight="bold">
                        タンパク質: 
                    </Text>
                    <span>{protein} g</span>
                </FactorArea>
                <FactorArea>
                    <Text fontWeight="bold">
                        脂質: 
                    </Text>
                    <span>{fat} g</span>
                </FactorArea>
                <FactorArea>
                    <Text fontWeight="bold">
                        タンパク質: 
                    </Text>
                    <span>{carbs} g</span>
                </FactorArea>
            </ResultView>

            <SampleMenuArea>
                <Title level={3}>
                    サンプルメニュー
                </Title>
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