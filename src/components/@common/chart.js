import basiccomponent from './basiccomponent';
import Vvveb from '../../gui/components';
import { SelectInput } from '../../inputs/inputs';
import extend from 'lodash/extend';

const chart = extend({}, basiccomponent, {
    name: "Chart.js",
    attributes: ["data-component-chartjs"],
    image: "icons/chart.svg",
    dragHtml: '<img src="libs/builder/icons/chart.svg" style="width: 100px; height: auto;">',
    html: '<div data-component-chartjs class="chartjs" data-chart=\'{\
			"type": "line",\
			"data": {\
				"labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],\
				"datasets": [{\
					"data": [12, 19, 3, 5, 2, 3],\
					"fill": false,\
					"borderColor":"rgba(255, 99, 132, 0.2)"\
				}, {\
					"fill": false,\
					"data": [3, 15, 7, 4, 19, 12],\
					"borderColor": "rgba(54, 162, 235, 0.2)"\
				}]\
			}}\' style="min-height:240px;min-width:240px;width:100%;height:100%;position:relative">\
			  <canvas></canvas>\
			</div>',
    chartjs: null,
    ctx: null,
    node: null,
    config: {/*
			type: 'line',
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
				datasets: [{
					data: [12, 19, 3, 5, 2, 3],
					fill: false,
					borderColor:'rgba(255, 99, 132, 0.2)',
				}, {
					fill: false,
					data: [3, 15, 7, 4, 19, 12],
					borderColor: 'rgba(54, 162, 235, 0.2)',
				}]
			},*/
    },

    dragStart: function (node) {
        //check if chartjs is included and if not add it when drag starts to allow the script to load
        body = Vvveb.Builder.frameBody;

        if ($("#chartjs-script", body).length == 0) {
            $(body).append('<script id="chartjs-script" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"></script>');
            $(body).append('<script>\
				$(document).ready(function() {\
					$(".chartjs").each(function () {\
						ctx = $("canvas", this).get(0).getContext("2d");\
						config = JSON.parse(this.dataset.chart);\
						chartjs = new Chart(ctx, config);\
					});\
				\});\
			  </script>');
        }

        return node;
    },


    drawChart: function () {
        if (this.chartjs != null) this.chartjs.destroy();
        this.node.dataset.chart = JSON.stringify(this.config);

        config = Object.assign({}, this.config);//avoid passing by reference to avoid chartjs to fill the object
        this.chartjs = new Chart(this.ctx, config);
    },

    init: function (node) {
        this.node = node;
        this.ctx = $("canvas", node).get(0).getContext("2d");
        this.config = JSON.parse(node.dataset.chart);
        this.drawChart();

        return node;
    },


    beforeInit: function (node) {

        return node;
    },

    properties: [
        {
            name: "Type",
            key: "type",
            inputtype: SelectInput,
            data: {
                options: [{
                    text: "Line",
                    value: "line"
                }, {
                    text: "Bar",
                    value: "bar"
                }, {
                    text: "Pie",
                    value: "pie"
                }, {
                    text: "Doughnut",
                    value: "doughnut"
                }, {
                    text: "Polar Area",
                    value: "polarArea"
                }, {
                    text: "Bubble",
                    value: "bubble"
                }, {
                    text: "Scatter",
                    value: "scatter"
                }, {
                    text: "Radar",
                    value: "radar"
                }]
            },
            init: function (node) {
                return JSON.parse(node.dataset.chart).type;
            },
            onChange: function (node, value, input, component) {
                component.config.type = value;
                component.drawChart();

                return node;
            }
        }]
});

export default chart;
