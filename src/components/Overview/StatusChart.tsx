import React from "react";

// providers
import { useAppContext, useCandidaciesContext } from "../../providers";

// helpers
import { composeStatusChart, isStatusChartComplete } from "../../helpers";

// packages
import { Box, Grid, Paper, Typography } from "@mui/material";

//FIXME: IPad Pro 12.9" (1024x1366) is not supported
export const StatusChart: React.FC = (): JSX.Element => {
    const { isDesktop } = useAppContext();
    const { allCandidacies } = useCandidaciesContext();

    const statusChart = composeStatusChart(allCandidacies);
    const total = statusChart.reduce((sum, item) => sum + item.value, 0);
    const chartSize = 210;
    const segmentSize = 76;
    let currentAngle = -90;

    return (
        <Grid item xs={12} md={4} lg={isDesktop ? 5 : 6}>
            <Paper
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                }}
            >
                <div className="pieChart">
                {allCandidacies.length ? (
                    <>
                        <Box>
                            {statusChart.map(({ color, name }, idx) => (
                                <Typography 
                                    key={idx} 
                                    component="span" 
                                    variant="body2" 
                                    color={color}
                                    ml={0.8}
                                    mr={0.8}
                                >
                                    {name}
                                </Typography>
                            ))}
                        </Box>
                        {isStatusChartComplete(statusChart) ? (
                            <svg width={chartSize} height={chartSize}>
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="76"
                                    fill={statusChart[0].color}
                                    strokeWidth="0"
                                />
                                <text
                                    x="100"
                                    y="105"
                                    fill="#fff"
                                    textAnchor="middle"
                                >
                                    100%
                                </text>
                            </svg>
                        ) : (
                            <svg width={chartSize} height={chartSize}>
                                <g transform={`translate(${chartSize / 2},${chartSize / 2})`}>
                                    {statusChart.map((item, index) => {
                                        const percentage = (item.value / total) * 100;
                                        const angle = (360 * percentage) / 100;
                                        const largeArcFlag = angle > 180 ? 1 : 0;

                                        const startX =
                                            segmentSize *
                                            Math.cos((currentAngle * Math.PI) / 180);
                                        const startY =
                                            segmentSize *
                                            Math.sin((currentAngle * Math.PI) / 180);

                                        const endX =
                                            segmentSize *
                                            Math.cos(((currentAngle + angle) * Math.PI) / 180);
                                        const endY =
                                            segmentSize *
                                            Math.sin(((currentAngle + angle) * Math.PI) / 180);

                                        const labelX =
                                            segmentSize *
                                            0.6 *
                                            Math.cos(((currentAngle + angle / 2) * Math.PI) / 180);
                                        const labelY =
                                            segmentSize *
                                            0.6 *
                                            Math.sin(((currentAngle + angle / 2) * Math.PI) / 180);

                                        const pathData = `
                                            M 0 0
                                            L ${startX} ${startY}
                                            A ${segmentSize} ${segmentSize} 0 ${largeArcFlag} 1 ${endX} ${endY}
                                            Z
                                        `;

                                        currentAngle += angle;

                                        return (
                                            <g key={index}>
                                                <path
                                                    d={pathData}
                                                    fill={item.color}
                                                    strokeWidth="0"
                                                />
                                                <text
                                                    x={labelX}
                                                    y={labelY}
                                                    fill="#fff"
                                                    textAnchor="middle"
                                                >
                                                    {percentage > 0 && percentage.toFixed(0) + "%"}
                                                </text>
                                            </g>
                                        );
                                    })}
                                </g>
                            </svg>
                        )}
                    </>
                ) : (
                    <Typography variant="body2" color="text.secondary" align="center">
                        No data to compare
                    </Typography>
                )}
                </div>
            </Paper>
        </Grid>
    );
};
