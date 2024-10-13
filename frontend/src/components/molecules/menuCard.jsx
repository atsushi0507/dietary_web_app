import { Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import NumberInput from "../atoms/NumberInput";

const MenuCard = ({ menuData }) => {
    const { menu, cal } = menuData;
    const [volume, setVolume] = useState(1.0);

    const handleVolume = (e) => {
        setVolume(e.target.value);
    }

    return (
        <Card>
            <MenuAndCalorie>
                <Typography variant="p">
                    {menu}
                </Typography>
                <Typography variant="p" sx={{marginLeft: "10px"}}>
                    {cal} kcal
                </Typography>
            </MenuAndCalorie>
            <VolumeArea>
                <NumberInput
                    value={volume}
                    onChange={handleVolume}
                    step={0.1}
                />
                <Typography variant="p">
                    人前
                </Typography>
            </VolumeArea>
        </Card>
    );
};

export default MenuCard;

const Card = styled.div`

`

const MenuAndCalorie = styled.div`
    display: flex;
    flex-direction: row;
`

const VolumeArea = styled.div`
    display: flex;
    flex-direction: row;
`