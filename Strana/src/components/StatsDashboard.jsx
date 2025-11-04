import React, { useState } from "react";
import "./StatsDashboard.css";

const statsDataStDash = {
  "Total Jobs": {
    value: 132,
    chart: [0, 1000, 1800, 1800, 3200, 4800, 5100, 4600, 3200, 2900, 2200, 2200],
  },
  "Total Assigned Jobs": {
    value: 43,
    chart: [0, 500, 900, 1100, 1600, 2400, 2600, 2500, 1700, 900, 500, 100],
  },
  "Jobs That You Have Applied": {
    value: 21,
    chart: [0, 200, 500, 900, 1300, 1500, 1700, 1700, 1500, 1200, 700, 500],
  },
  "Finished Jobs": {
    value: 63,
    chart: [20, 400, 1000, 1700, 2300, 2800, 3100, 3050, 2700, 2200, 2000, 1800],
  },
};

const statsLabelsStDash = [
  "Total Jobs",
  "Total Assigned Jobs",
  "Jobs That You Have Applied",
  "Finished Jobs",
];

export default function StatsDashboardStDash() {
  const [selectedStatStDash, setSelectedStatStDash] = useState("Total Jobs");
  const dataStDash = statsDataStDash[selectedStatStDash];

  // Chart layout
  const width = 600;
  const height = 190;
  const leftPad = 60;
  const rightPad = 30;
  const topPad = 35;
  const botPad = 30;
  const maxY = 5200;
  const yTicks = [0, 2500, 5000];

  // Generate polyline coordinates
  const getChartPointsStDash = (dataArr) => {
    const count = dataArr.length;
    return dataArr
      .map((y, i) => {
        const x =
          leftPad +
          ((width - leftPad - rightPad) * i) / (count - 1);
        const plotY =
          topPad +
          (height - topPad - botPad) -
          (y / maxY) * (height - topPad - botPad);
        return `${x},${plotY}`;
      })
      .join(" ");
  };

  return (
    <div className="performance-overview-row-StDash">
      <div className="performance-statistics-card-StDash">
        <div className="statistics-title-StDash">STATISTICS</div>
        <div className="statistics-subtitle-StDash">
          Overall target accomplishment over the year
        </div>

        <svg width={width} height={height} className="statistics-chart-StDash">
          {/* Grid lines & Y labels */}
          {yTicks.map((v, idx) => {
            const plotY =
              topPad +
              (height - topPad - botPad) -
              (v / maxY) * (height - topPad - botPad);
            return (
              <g key={idx}>
                <line
                  x1={leftPad}
                  x2={width - rightPad + 10}
                  y1={plotY}
                  y2={plotY}
                  className="statistics-axis-line-StDash"
                />
                <text
                  x={leftPad - 20}
                  y={plotY + 4}
                  className="statistics-y-text-StDash"
                >
                  {v === 0 ? 0 : (v / 1000).toFixed(3).replace(".000", "")}
                </text>
              </g>
            );
          })}

          {/* Main line */}
          <polyline
            fill="none"
            stroke="#6566ff"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={getChartPointsStDash(dataStDash.chart)}
          />
        </svg>

        <div className="statistics-axis-labels-StDash">
          {[
            "Nov",
            "Dec",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
          ].map((month, idx) => (
            <span
              key={month}
              style={{
                marginLeft: idx === 0 ? "10px" : "0",
              }}
            >
              {month}
            </span>
          ))}
        </div>
      </div>

      <div className="quick-overview-col-StDash">
        {statsLabelsStDash.map((label) => (
          <div
            key={label}
            className={`overview-card-StDash${
              selectedStatStDash === label ? " highlight-StDash" : ""
            }`}
            onClick={() => setSelectedStatStDash(label)}
          >
            <div className="overview-label-StDash">{label}</div>
            <div className="overview-value-StDash">
              {statsDataStDash[label].value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
