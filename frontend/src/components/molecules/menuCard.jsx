import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NumberInput from "../atoms/NumberInput";
import CloseIcon from "@mui/icons-material/Close";

const MenuCard = ({ menuData, onVolumeChange, onDelete }) => {
    const { menu, cal } = menuData;
    const [volume, setVolume] = useState(1.0);

    const handleVolume = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    }

    // Volumeが変更されたら親コンポーネントに通知
    useEffect(() => {
        onVolumeChange(menu, volume);
    }, [menu, volume]);

    return (
        <Card>
            <MenuAndCalorie>
                <Typography variant="p">
                    {menu}
                </Typography>
                <Typography variant="p" sx={{marginLeft: "10px"}}>
                    {cal * volume} kcal
                </Typography>
                <IconButton
                    size="small"
                    onClick={() => onDelete(menu)}
                    sx={{marginLeft: "auto"}}
                >
                    <CloseIcon />
                </IconButton>
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
    border: solid;
    border-radius: 8px;
    padding: 4px 8px;
`

const MenuAndCalorie = styled.div`
    display: flex;
    flex-direction: row;
`

const VolumeArea = styled.div`
    display: flex;
    flex-direction: row;
`