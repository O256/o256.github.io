<template>
    <div class="container">
      <div ref="globeContainer" class="globe-container"></div>
      <div class="locations-list">
        <ul>
          <li v-for="location in locations" :key="location.name" @click="flyToLocation(location)">
            {{ location.name }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import Globe from 'globe.gl';
  import { scaleSequentialSqrt } from 'd3-scale';
  import { interpolateYlOrRd } from 'd3-scale-chromatic';
  
  export default {
    name: 'EarthView',
    setup() {
      const globeContainer = ref(null);
      const globeInstance = ref(null);
  
      const colorScale = scaleSequentialSqrt(interpolateYlOrRd);
  
      const getVal = feat => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);
  
      const locations = [
        { name: 'New York', lat: 40.7128, lng: -74.0060 },
        { name: 'London', lat: 51.5074, lng: -0.1278 },
        { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
        { name: 'Sydney', lat: -33.8688, lng: 151.2093 }
      ];
  
      const flyToLocation = (location) => {
        if (globeInstance.value) {
          globeInstance.value.pointOfView({ lat: location.lat, lng: location.lng, altitude: 2 }, 2000);
        }
      };
  
      onMounted(() => {
        fetch('ne_110m_admin_0_countries.geojson')
          .then(res => res.json())
          .then(countries => {
            const maxVal = Math.max(...countries.features.map(getVal));
            colorScale.domain([0, maxVal]);
  
            globeInstance.value = Globe()(globeContainer.value)
              .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
              .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
              .lineHoverPrecision(0)
              .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
              .polygonAltitude(0.06)
              .polygonCapColor(feat => colorScale(getVal(feat)))
              .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)')
              .polygonStrokeColor(() => '#111')
              .polygonLabel(({ properties: d }) => `
                <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
                GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
                Population: <i>${d.POP_EST}</i>
              `)
              .onPolygonHover(hoverD => globeInstance.value
                .polygonAltitude(d => d === hoverD ? 0.12 : 0.06)
                .polygonCapColor(d => d === hoverD ? 'steelblue' : colorScale(getVal(d)))
              )
              .polygonsTransitionDuration(300);
  
            // Add markers
            globeInstance.value
              .pointsData(locations)
              .pointLat(d => d.lat)
              .pointLng(d => d.lng)
              .pointColor(() => 'red')
              .pointAltitude(() => 0.1)
              .pointRadius(() => 0.1);
  
            // Auto-rotate
            globeInstance.value.controls().autoRotate = true;
            globeInstance.value.controls().autoRotateSpeed = 0.5;
          });
      });
  
      return {
        globeContainer,
        locations,
        flyToLocation
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }
  
  .globe-container {
    width: 75%;
    height: 100%;
  }
  
  .locations-list {
    width: 25%;
    padding: 10px;
    overflow-y: auto;
    z-index: 1000;
  }
  
  .locations-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .locations-list li {
    margin: 10px 0;
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .locations-list li:hover {
    background-color: #a5a5a5;
  }
  </style>
  