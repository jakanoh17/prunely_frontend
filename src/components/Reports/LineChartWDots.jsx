import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartWithDots = ({ data, xAxisDataKey, yAxisDataKey }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Monthly Sales Data
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={xAxisDataKey}
              tick={{ fill: "#555", fontSize: 12 }} // Style the text color
              tickMargin={10} // Add space between axis and labels
              angle={-45} // Rotate labels
              dy={10} // Adjust vertical position
              textAnchor="end" // Align text to the end of the label
            />
            <YAxis tick={{ fill: "#555" }} dataKey={yAxisDataKey} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3f51b5"
              strokeWidth={2}
              dot={{ fill: "#f50057", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default LineChartWithDots;
