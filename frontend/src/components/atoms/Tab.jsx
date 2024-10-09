import { Tabs, Tab } from "@mui/material";
import React from "react";

const BasicTab = ({ items, value, onChange }) => {
    return (
        <Tabs value={value} onChange={onChange}>
            {items.map(item => (
                <Tab key={item} label={item} />
            ))}
        </Tabs>
    );
};

export default BasicTab;