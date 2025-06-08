"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartTwo = () => {
    const [state, setState] = useState({
        series: [
            {
                name: "Sales",
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
            },
            {
                name: "Revenue",
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
            },
        ],
        options: {
            colors: ["#3C50E0", "#80CAEE"],
            chart: {
                fontFamily: "Satoshi, sans-serif",
                type: "bar",
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
                            bar: {
                                borderRadius: 0,
                                columnWidth: "25%",
                            },
                        },
                    },
                },
            ],
            plotOptions: {
                bar: {
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
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
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
                    Chart Two
                </h3>
                <div className="mt-4">
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="bar"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChartTwo; 