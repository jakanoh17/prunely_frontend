import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  yAxis: [
    {
      label: "Hours",
    },
  ],
};

export default function BarsDataset({ data }) {
  const [dataset, setDataset] = useState([
    { day: "Mon", hours: 32 },
    { day: "Tues", hours: 30 },
    { day: "Wed", hours: 20 },
    { day: "Thu", hours: 30 },
    { day: "Fri", hours: 10 },
    { day: "Sat", hours: 70 },
    { day: "Sun", hours: 30 },
  ]);

  useEffect(() => {
    // console.log(data[0].created);

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const recentData = data.filter(
      (session) => session.created.date > sevenDaysAgo
    );
    // console.log(recentData);
  }, [data]);

  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "day" }]}
      series={[{ dataKey: "hours" }]}
      {...chartSetting}
    />
  );
}
