import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// プログレスバーのコンテナ (position: 'relative' を保持)
const CustomLinearProgress = styled(Box)(({ theme }) => ({
  height: 20,
  borderRadius: 10,
  position: 'relative', // これにより範囲塗りつぶしや基準線が正しく配置される
  backgroundColor: '#f0f0f0',
}));

// プログレスバーの塗り部分
const ProgressBarFill = styled(LinearProgress)(({ theme }) => ({
  borderRadius: 10,
  backgroundColor: '#f0c36d',
  zIndex: 2, // プログレスバーの上に表示
  height: '100%',
}));

// 範囲塗りつぶし部分 (props を正しく受け取る)
const RangeFill = styled('div')((props) => {
    return {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: `${props.leftPosition}%`,  // left の計算を適用
      width: `${props.width}%`,        // width の計算を適用
      backgroundColor: props.fillColor, // 塗りつぶしの色を適用
      opacity: 0.3,                    // 塗りつぶしの透明度
      zIndex: 100,                       // プログレスバーの下に表示
      borderRadius: 'inherit',         // 丸みを継承
    };
  });

// 基準線 (動的に leftPosition と color を反映)
const Guideline = styled('div')(({ leftPosition, color }) => ({
  position: 'absolute',
  left: `${leftPosition}%`,
  top: 0,
  bottom: 0,
  width: '2px',
  borderLeft: `2px dashed ${color}`,
  zIndex: 3, // プログレスバーの上に表示
}));

const CustomProgressBar = ({ value, maxValue = 100, ranges = [], showGuidelines = false, guidelineValues = [] }) => {
  // 正規化されたプログレスバーの値 (0〜100)
  const normalizedValue = (value / maxValue) * 100;

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <CustomLinearProgress>
      {ranges.map((range, idx) => {
          const leftPosition = (range.start / maxValue) * 100; // 範囲の左側位置
          const width = ((range.end - range.start) / maxValue) * 100; // 範囲の幅

          console.log(`Range ${idx}: leftPosition = ${leftPosition}, width = ${width}`);

          return (
            <RangeFill
              key={idx}
              leftPosition={leftPosition}
              width={width}
              fillColor={range.fillColor}
            />
          );
        })}

        {/* プログレスバー本体 */}
        <ProgressBarFill variant="determinate" value={normalizedValue} />

        {/* 基準線の描画 */}
        {showGuidelines && guidelineValues.map((guidelineValue, idx) => {
          const guidelinePosition = (guidelineValue / maxValue) * 100;
          return (
            <Guideline
              key={idx}
              leftPosition={guidelinePosition}
              color={guidelineValue === maxValue ? 'red' : 'black'} // 100% の基準線は赤、それ以外は黒
            />
          );
        })}
      </CustomLinearProgress>

      {/* <Typography variant="body2" align="center">{`${value}/${maxValue}`}</Typography> */}
    </Box>
  );
};

export default CustomProgressBar;
