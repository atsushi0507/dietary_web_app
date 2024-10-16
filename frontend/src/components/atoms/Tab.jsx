import { Tabs, Tab } from "@mui/material";
import React from "react";

const BasicTab = ({ items, value, onChange }) => {
    return (
        <Tabs
            value={value}
            onChange={onChange}
            indicatorColor="primary"
            variant="fullWidth"
            textColor="primary"
        >
            {items.map((item, index) => (
                <Tab
                    key={index}
                    label={item.label}
                    icon={item.icon ? item.icon : null}
                    iconPosition={item.icon ? "start" : undefined}
                />
            ))}
        </Tabs>
    );
};

export default BasicTab;