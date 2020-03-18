let myChart = document.getElementById("myChart").getContext("2d");
//- Global Options
Chart.defaults.global.defaultFontFamily = "Open Sans";
Chart.defaults.global.defaultFontSize = 15;
Chart.defaults.global.defaultFontColor = "black";
Chart.defaults.global.responsive = true;
let lineChart = new Chart(myChart, {
  type: "line",
  data: {
    labels: dataX,
    datasets: [
      {
        label: "Population",
        data: dataY,
        backgroundColor: ["rgba(83,36,242,0.5)"],
        borderWidth: 1,
        borderColor: "black",
        hoverBorderWidth: 3,
        hoverBorderColor: "black",
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "My Chart in test Project",
      fontSize: 19,
    },
    legend: {
      // display:false, Ẩn chú thích
      // position: "right",
      labels: {
        fontColor: "#888",
      },
    },
    layout: {
      // padding: {
      //   left: 50,
      //   right: 0,
      //   top: 0,
      //   bottom: 0,
      // },
    },
    tooltips: {
      // enabled: false, ẩn thông tin khi hover vào
    },
    maintainAspectRatio: true,
    responsive: false,
  },
});
