am5.ready(async function() {

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "none",
  wheelY: "none",
  paddingLeft: 0
}));

// We don't want zoom-out button to appear while animating, so we hide it
chart.zoomOutButton.set("forceHidden", true);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {
  minGridDistance: 30,
  minorGridEnabled: true
});

yRenderer.grid.template.set("location", 1);

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,
  categoryField: "_id",
  renderer: yRenderer,
  tooltip: am5.Tooltip.new(root, { themeTags: ["axis"] })
}));

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,
  min: 0,
  numberFormatter: am5.NumberFormatter.new(root, {
    "numberFormat": "#,###a"
  }),
  extraMax: 0.1,
  renderer: am5xy.AxisRendererX.new(root, {
    strokeOpacity: 0.1,
    minGridDistance: 80

  })
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "count",
  categoryYField: "_id",
  tooltip: am5.Tooltip.new(root, {
    pointerOrientation: "left",
    labelText: "{valueX}"
  })
}));


// Rounded corners for columns
series.columns.template.setAll({
  cornerRadiusTR: 5,
  cornerRadiusBR: 5,
  strokeOpacity: 0
});

// Make each column to be of a different color
series.columns.template.adapters.add("fill", function (fill, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

series.columns.template.adapters.add("stroke", function (stroke, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});


// Set data
async function getTopAuthors(){
    const response= await fetch("http://localhost:5000/top_authors")
    const data=await response.json()
    return data
}
const data=await getTopAuthors()
    data.reverse()
yAxis.data.setAll(data);
series.data.setAll(data);
sortCategoryAxis();

// Get series item by category
function getSeriesItem(category) {
  for (var i = 0; i < series.dataItems.length; i++) {
    var dataItem = series.dataItems[i];
    if (dataItem.get("categoryY") == category) {
      return dataItem;
    }
  }
}

chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none",
  xAxis: xAxis,
  yAxis: yAxis
}));



// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);

}); // end am5.ready()
