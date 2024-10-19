import React from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid2";
import RadarChart from "@/components/atoms/RadarChart";
import { Typography } from "@mui/material";

const Feedback = () => {
    return (
        <Container>
            <Grid
                container
                columns={12}
            >
                <Grid
                    size={{xs: 6, md: 4, lg: 9}}
                >
                    <UpperPart>
                    <Typography>
                        Left
                    </Typography>
                    </UpperPart>
                </Grid>
                <Grid
                    size={{xs: 6, lg: 3}}
                >
                    <UpperPart>
                        <RadarChart 
                            title=""
                            darkMode={false}
                            // indicators={["タンパク質", "脂質", "炭水化物"]}
                            indicators={["P", "F", "C", "S", "O"]}
                            seriesData={[
                                { name: "", values: [5.0, 4.2, 3.5, 3.8, 2.8], color: "rgba(255, 188, 52, 0.6)" },
                            ]}
                            maxValues={[5, 5, 5]}
                            chartHeight="150px"
                            unit=""
                        />
                    </UpperPart>
                </Grid>
                <Grid
                    size={{xs: 12}}
                >
                    <Typography>
                        Bottom
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Feedback;

const Container = styled.div`
    height: 300px;
    width: 100%;
    background-color: rgba(0, 0, 255, 0.3);
`

const UpperPart = styled.div`
    height: 150px;
    width: 100%;
    background-color: rgba(0, 255, 0, 0.3);
`

const BottomPart = styled.div`
    height: 150px;
    background-color: rgba(120, 0, 0, 0.3);
`

const RadarChartWrapper = styled.div`
    width: 150px; /* レーダーチャートの横幅 */
    height: 150px; /* レーダーチャートの高さ */
`;