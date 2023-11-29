
import {ref,computed} from 'vue';
import iconMapa from '@images/icons/icon_map.png' 
import { $themeColors } from '@themeConfig';
import worldMap from '@highcharts/map-collection/custom/world.geo.json'
import topMap from '@highcharts/map-collection/custom/world.topo.json'
import store from '@/store'
import useAppConfig from '@core/app-config/useAppConfig';
export default function useMap(){

  const iconMap =  ref({
      // path: iconMapa,
      fillColor: "#e01283",
      fillOpacity: .5,
      strokeWeight: 0,
      rotation: 0,
      scale: .1,
      icon:iconMapa,
    })
    
    const {
      skin
    } = useAppConfig();

    const onPointClick = function () {
      const key = this.key;
      $('#mapDropdown option').each(function () {
        if (this.value === `countries/${key.substr(0, 2)}/${key}-all.js`) {
          $('#mapDropdown').val(this.value).trigger('change');
        }
      });
    };


    const colorText = computed(() => skin.value == 'dark' ? '#FFF' : '#333333')

    const chartOptionMap = ref({
      title: {
        enabled: false,
       
      },
      subtitle: {
        enabled: false,
      },
      mapNavigation: {
            enabled: true,
            enableDoubleClickZoom:true,
            enableDoubleClickZoomTo:true,
            enableTouchZoom:true,
            mouseWheelSensitivity:1.5,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
      },
  

      chart: {
        // map: worldMap,
        map:topMap,
        height: 300,
       
      },

      colorAxis: {
        stops: [
          [0, '#55aaff'],
          [1, '#2d5b88']
        ]
      },
      legend: {
        enabled: true,
        align: 'left',

        navigation:{
          enabled:false,
        },
        bubbleLegend:{
          enabled:false
        },
        itemStyle:{
          color:computed(() => colorText.value)
        },

        title:{
          style:{
            color:computed(() => colorText.value)
          }
        }
      },
      exporting: {
        enabled: true
      },
      credits: {
        enabled: false,
      },
     

      plotOptions: {
       
        series: {
          allAreas: true,
          showInLegend: true,
          backgroundColor: colorRand(),
  
          tiledwebmap:{
            enabled:false
          },
          states: {
           
            hover: {
              enabled:false,
              color: $themeColors.danger
            }
          },

          point: {
              events: {
                load: function () {
                  const point = this;

                  // Aplica un pequeño desplazamiento aleatorio en la latitud
                  point.plotY += Math.random() * 0.5;

                  // Aplica un pequeño desplazamiento aleatorio en la longitud
                  point.plotX += Math.random() * 0.5;
                }
              }
            }

        }
      },

    tooltip: {
      
      shared: true,
      formatter: function () {

        let tooltipText = '';
        if(this.point.name && this.point.name != 'x'){
          tooltipText = '<strong>' + this.point.name + '</strong><br>'
        }
        this.series.chart.series.forEach(function (series) {
          const point = series.points.find(function (point) {
            return point.name === this.point.name ;
          }.bind(this));
          
          if (point && series.name != 'x') {
            tooltipText += series.name + ': ' + `${point.value ? point.value : 0}` + '<br>';
          }
        }.bind(this));
        
        return tooltipText;
      }
    },


  
      series: []
    });



    const stylosMap = ref([
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ]);

    return {
      iconMap,
      stylosMap,
      iconMapa,

      // Chart Maps
      chartOptionMap,
      colorText
    }

}