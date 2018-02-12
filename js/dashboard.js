(function($) {
  'use strict';
  $(function() {
    if ($("#curved-line-chart").length) {
      var d1 = [
        [0, 6],
        [1, 14],
        [2, 10],
        [3, 14],
        [4, 5]
      ];
      var d2 = [
        [0, 6],
        [1, 7],
        [2, 11],
        [3, 8],
        [4, 11]
      ];
      var d3 = [
        [0, 6],
        [1, 5],
        [2, 6],
        [3, 10],
        [4, 5]
      ];
      var curvedLineOptions = {
        series: {
          shadowSize: 0,
          curvedLines: { //This is a third party plugin to make curved lines
            apply: true,
            active: true,
            monotonicFit: true
          },
          lines: {
            show: false,
            lineWidth: 0
          }
        },
        grid: {
          borderWidth: 0,
          labelMargin: 10,
          hoverable: true,
          clickable: true,
          mouseActiveRadius: 6
        },
        xaxis: {
          tickDecimals: 0,
          ticks: false
        },
        yaxis: {
          tickDecimals: 0,
          ticks: false
        },
        legend: {
          noColumns: 4,
          container: $("#chartLegend")
        }
      }

      $.plot($("#curved-line-chart"), [{
          data: d1,
          lines: {
            show: true,
            fill: 0.98
          },
          label: 'Plans',
          stack: true,
          color: '#fd5356'
        },
        {
          data: d2,
          lines: {
            show: true,
            fill: 0.98
          },
          label: 'Purchase',
          stack: true,
          color: '#fe9091'
        },
        {
          data: d3,
          lines: {
            show: true,
            fill: 0.98
          },
          label: 'Services',
          stack: true,
          color: '#feafb0'
        }
      ], curvedLineOptions);
    }
  });
})(jQuery);