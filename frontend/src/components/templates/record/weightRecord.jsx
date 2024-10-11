import Button from "@/components/atoms/Button";
import NumberInput from "@/components/atoms/NumberInput";
import { Alert } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const WeightRecord = () => {
    const [weight, setWeight] = useState(48);
    const handleButton = () => {
        alert("登録しました");
    }
    return (
        <>
            <div>
                <NumberInput
                    value={weight}
                    step={0.1}
                    name="weight"
                    min={30.0}
                    max={200.0}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <span> kg</span>
            </div>
            <FootButton>
                <Button onClick={handleButton}>
                    登録
                </Button>
            </FootButton>
        </>
    );
};

export default WeightRecord;

const FootButton = styled.div`
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`