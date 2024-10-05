import React from 'react';
import { LinearProgress } from '@mui/material';

const ProgressBar = ({ value, maxValue, isPercent }) => {
    const displayValue = isPercent
        ? `${value}%`
        : `${value}/${maxValue}`;
    return (
        <div>
        <LinearProgress variant="determinate" value={value/maxValue * 100} />
        <p>{displayValue}</p>
        </div>
  );
};

export default ProgressBar;
