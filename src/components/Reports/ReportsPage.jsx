import ReportsWidget from "./ReportsWidget";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import WhatshotTwoToneIcon from "@mui/icons-material/WhatshotTwoTone";
import ItemList from "./ItemList";
import data from "../../utils/dummy.json";
import LineChartWithDots from "./LineChartWDots";
import { Switch, FormControlLabel } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { secondsToHHMM } from "../../utils/functions";
import { useEffect, useState } from "react";

const convertToCSV = (data) => {
  const headers = ["Session Name", "Session ID", "Overall Time", "Created At"];
  const rows = data.map((session) => [
    session.sessionName,
    session._id,
    session.overallTime,
    new Date(session.createdAt).toLocaleString(),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  return csvContent;
};

export default function ReportsPage({
  header,
  getStudySessions,
  savedSessionData,
  frequentlyUsedLabelsData,
}) {
  const [hhmmStr, setHHMM] = useState("");
  const [streak, setStreak] = useState(0);
  const [daysAccessed, setDaysAccessed] = useState(0);
  const [isWeekView, setIsWeekView] = useState(true); // Toggle for week/month view
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getStudySessions();
  }, []);

  // calculate overall studying time
  useEffect(() => {
    if (savedSessionData) {
      let sumOfOverallTime = 0;
      const keys = Object.keys(savedSessionData);

      for (let i = 0; i < keys.length; i++) {
        sumOfOverallTime += savedSessionData[i].overallTime;
      }
      const displayText = secondsToHHMM(sumOfOverallTime);
      setHHMM(displayText);
    }
  }, [savedSessionData]);

  // DAYS ACCESSED
  useEffect(() => {
    if (savedSessionData) {
      // Calculate streak of days accessed
      const dates = Object.values(savedSessionData).map(
        (session) => new Date(session.createdAt).toISOString().split("T")[0]
      ); // Extract unique dates
      const uniqueDates = [...new Set(dates)].sort(); // Get unique, sorted dates

      let currentStreak = 1;
      for (let i = 1; i < uniqueDates.length; i++) {
        const prevDate = new Date(uniqueDates[i - 1]);
        const currentDate = new Date(uniqueDates[i]);

        const diffInDays = Math.ceil(
          (currentDate - prevDate) / (1000 * 60 * 60 * 24)
        );

        if (diffInDays === 1) {
          currentStreak += 1; // Continue streak
        } else if (diffInDays > 1) {
          currentStreak = 1; // Reset streak
        }
      }
      setStreak(currentStreak);
    }
  }, [savedSessionData]);

  // STREAK
  useEffect(() => {
    if (savedSessionData) {
      // Calculate the unique days accessed in the current calendar year
      const currentYear = new Date().getFullYear();
      const accessedDates = new Set();

      // Loop through the object keys to get the `createdAt` for each session
      for (let key in savedSessionData) {
        if (savedSessionData.hasOwnProperty(key)) {
          const createdAt = new Date(savedSessionData[key].createdAt);
          if (createdAt.getFullYear() === currentYear) {
            // Get the date part of the session (ignore the time)
            const dateString = createdAt.toISOString().split("T")[0]; // Format: YYYY-MM-DD
            accessedDates.add(dateString); // Add unique date to the set
          }
        }
      }

      // Set the count of unique days accessed in the current year
      setDaysAccessed(accessedDates.size);
    }
  }, [savedSessionData]);

  // GRAPH
  useEffect(() => {
    // Process chart data based on week or month
    if (isWeekView) {
      setChartData(getWeekData(savedSessionData));
    } else {
      setChartData(getMonthData(savedSessionData));
    }
  }, [isWeekView]);

  // // Helper function to get data for the current week
  const getWeekData = (sessionData) => {
    const weeks = [];
    const now = new Date();
    const startOfWeek = now.getDate() - now.getDay(); // Get the start of the current week
    const endOfWeek = startOfWeek + 6;

    // Group sessions by date in the current week
    for (let i = startOfWeek; i <= endOfWeek; i++) {
      const date = new Date(now.setDate(i));
      const formattedDate = date.toISOString().split("T")[0]; // Get date in YYYY-MM-DD format
      let totalTimeForDay = 0;

      Object.values(sessionData).forEach((session) => {
        const createdAt = new Date(session.createdAt);
        if (createdAt.toISOString().split("T")[0] === formattedDate) {
          totalTimeForDay += session.overallTime;
        }
      });

      weeks.push({
        date: formattedDate,
        total: totalTimeForDay / 3600, // Convert seconds to hours
      });
    }

    return weeks;
  };

  // // Helper function to get data for the current month
  const getMonthData = (sessionData) => {
    const monthData = [];
    const now = new Date();
    const currentMonth = now.getMonth();

    // Group sessions by day of the month
    for (let i = 1; i <= 31; i++) {
      const date = new Date(now.setDate(i));
      if (date.getMonth() !== currentMonth) break;

      const formattedDate = date.toISOString().split("T")[0];
      let totalTimeForDay = 0;

      Object.values(sessionData).forEach((session) => {
        const createdAt = new Date(session.createdAt);
        if (createdAt.toISOString().split("T")[0] === formattedDate) {
          totalTimeForDay += session.overallTime;
        }
      });

      if (totalTimeForDay > 0) {
        monthData.push({
          date: formattedDate,
          hoursStudied: totalTimeForDay / 3600, // Convert seconds to hours
        });
      }
    }

    return monthData;
  };

  const handleDownloadCSV = () => {
    const csvData = convertToCSV(savedSessionData);

    // Create a blob from the CSV data
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    // Create an anchor element
    const link = document.createElement("a");

    // Set the download attribute with a filename
    link.download = "sessionData.csv";

    // Create an object URL for the blob and set it as the href
    link.href = URL.createObjectURL(blob);

    // Trigger a click event to download the file
    link.click();
  };

  // if (frequentlyUsedLabelsData) {
  //   console.log(frequentlyUsedLabelsData);
  //   const dummyData = frequentlyUsedLabelsData.has("label1")
  //     ? frequentlyUsedLabelsData.get("label1")
  //     : [];
  // }

  const labels = [
    {
      label: "label1",
      values: [
        { month: "January", sales: 30 },
        { month: "February", sales: 45 },
        { month: "March", sales: 28 },
        { month: "April", sales: 50 },
        { month: "May", sales: 60 },
        { month: "June", sales: 70 },
      ],
    },
    {
      label: "label2",
      values: [
        { month: "January", sales: 80 },
        { month: "February", sales: 80 },
        { month: "March", sales: 28 },
        { month: "April", sales: 50 },
        { month: "May", sales: 0 },
        { month: "June", sales: 70 },
      ],
    },
    {
      label: "label3",
      values: [
        { month: "January", sales: 0 },
        { month: "February", sales: 45 },
        { month: "March", sales: 80 },
        { month: "April", sales: 50 },
        { month: "May", sales: 40 },
        { month: "June", sales: 70 },
      ],
    },
  ];

  console.log(labels);

  return (
    <div className="reports">
      {header}
      <section className="reports__container">
        <ReportsWidget
          classModifier={"reports__widget_type_hrs-studied"}
          caption="hours studied"
          icon={<AccessTimeTwoToneIcon fontSize="large" />}
          stat={hhmmStr}
        />
        <ReportsWidget
          classModifier={"reports__widget_type_dys-accessed"}
          caption="days accessed"
          icon={<CalendarMonthTwoToneIcon fontSize="large" />}
          stat={daysAccessed}
        />
        <ReportsWidget
          classModifier={"reports__widget_type_streak"}
          caption="day streak (this yr)"
          icon={<WhatshotTwoToneIcon fontSize="large" />}
          stat={streak}
        />

        <section className="reports__graph">
          <h2 className="reports__sub-title reports__sub-title_element_main-widget">
            {isWeekView ? "Weekly View" : "Monthly View"}
          </h2>
          <FormControlLabel
            control={
              <Switch
                checked={isWeekView}
                onChange={() => setIsWeekView(!isWeekView)}
                name="viewSwitch"
                color="primary"
              />
            }
            label={isWeekView ? "Week View" : "Month View"}
          />
          <ResponsiveContainer width="100%" height={300}>
            {isWeekView ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => date.substring(5)}
                >
                  <Label value="Date" offset={-5} position="insideBottom" />
                </XAxis>
                <YAxis>
                  <Label
                    value="Hours Studied"
                    angle={-90}
                    position="insideLeft"
                  />
                </YAxis>
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            ) : (
              <ScatterChart width={500} height={400}>
                <XAxis dataKey="date" name="Date" />
                <YAxis dataKey="hoursStudied" name="Hours Studied" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Hours Studied" data={chartData} fill="#8884d8" />
              </ScatterChart>
            )}
          </ResponsiveContainer>
        </section>
        <section className="reports__sub-section reports__sub-section_type_sessions">
          <h2 className="reports__sub-title">Saved Study Sessions</h2>
          <div className="reports__sessions-list">
            <ItemList data={data} />;
          </div>
        </section>
        <section className="reports__sub-section reports__sub-section_type_intervals">
          <h2 className="reports__sub-title">Saved Intervals</h2>
          {labels.map((data) => {
            return (
              <LineChartWithDots
                key={data.label}
                data={data.values}
                xAxisDataKey={"month"}
                yAxisDataKey={"sales"}
              />
            );
          })}
        </section>
        <button className="reports__download-btn" onClick={handleDownloadCSV}>
          Download Session Data
        </button>
      </section>
    </div>
  );
}
