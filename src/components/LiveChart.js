import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Charts, Widgets, FusionTheme);
const chartConfigs = {
  type: "realtimeline",
  renderAt: "container",
  width: "100%",
  height: "350",
  dataFormat: "json",
};
export const LiveChart = ({
  name = "",
  categories,
  dataset,
  showChart,
  yAxisMaxValue,
  yAxisMinValue,
}) => {
  const dataSource = {
    chart: {
      caption: `${name} Price Ticker`,
      // subCaption: outDate,
      numberPrefix: "$",
      numdisplaysets: "10",
      // labeldisplay: "rotate",
      showRealTimeValue: "0",
      theme: "fusion",
      plotToolText: "$label<br>Price: <b>$dataValue</b>",
      setAdaptiveYMin: "1",
      yAxisMaxValue,
      yAxisMinValue,
    },
    categories: [
      {
        category: categories,
      },
    ],
    dataset: [
      {
        data: dataset,
      },
    ],
  };

  return showChart ? (
    <ReactFC {...chartConfigs} dataSource={dataSource} />
  ) : null;
};
