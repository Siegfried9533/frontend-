"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartThree = () => {
    const [state, setState] = useState({
        series: [
            {
                name: "Product One",
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
            },
        ],
        options: {
            colors: ["#3C50E0"],
            chart: {
                fontFamily: "Satoshi, sans-serif",
                type: "line",
                height: 335,
                stacked: false,
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            responsive: [
                {
                    breakpoint: 1536,
                    options: {
                        plotOptions: {
                            line: {
                                borderRadius: 0,
                            },
                        },
                    },
                },
            ],
            plotOptions: {
                line: {
                    horizontal: false,
                    borderRadius: 0,
                    columnWidth: "25%",
                    borderRadiusApplication: "end",
                    borderRadiusWhenStacked: "last",
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            legend: {
                position: "top",
                horizontalAlign: "left",
                fontFamily: "Satoshi",
                fontWeight: 500,
                fontSize: "14px",
                markers: {
                    radius: 99,
                },
            },
            fill: {
                opacity: 1,
            },
        },
    });

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <div>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                    Chart Three
                </h3>
                <div className="mt-4">
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="line"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChartThree; 