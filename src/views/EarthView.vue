<template>
  <div class="container">
    <div ref="globeContainer" class="globe-container"></div>
    <div class="locations-list">
      <ul>
        <li v-for="location in locations" :key="location.name">
          <div @click="toggleLocation(location)">
            {{ location.name }}
          </div>
          <ul v-if="location.expanded">
            <li v-for="subLocation in location.subLocations" :key="subLocation.name"
              @click="flyToLocation(subLocation, location.name)">
              {{ subLocation.name }}
            </li>
          </ul>
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
    const countriesData = ref([]); // 保存国家数据

    const colorScale = scaleSequentialSqrt(interpolateYlOrRd);

    const getVal = feat => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

    const locations = ref([]);

    const toggleLocation = (location) => {
      locations.value.forEach(loc => {
        if (loc !== location) {
          loc.expanded = false;
        }
      });
      location.expanded = !location.expanded;
    };

    const flyToLocation = (location, country) => {
      if (globeInstance.value) {
        globeInstance.value.pointOfView({ lat: location.lat, lng: location.lng, altitude: 2 }, 2000);

        // 通过经纬度找到对应的国家
        console.log(countriesData.value)
        const flyD = countriesData.value.find(d => d.properties.ISO_A2 === country);

        console.log(flyD)
        highlightCountry(flyD);
      }
    };

    const highlightCountry = (country) => {
      globeInstance.value
        .polygonAltitude(d => d === country ? 0.12 : 0.06)
        .polygonCapColor(d => d === country ? 'steelblue' : colorScale(getVal(d)));
    };

    onMounted(() => {
      fetch('ne_110m_admin_0_countries.geojson')
        .then(res => res.json())
        .then(countries => {
          countriesData.value = countries.features; // 保存国家数据
          const maxVal = Math.max(...countries.features.map(getVal));
          colorScale.domain([0, maxVal]);

          globeInstance.value = Globe()(globeContainer.value)
            .globeImageUrl('/earth-night.jpg')
            .backgroundImageUrl('/night-sky.png')
            .lineHoverPrecision(0)
            .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
            .polygonAltitude(0.06)
            .polygonCapColor(feat => colorScale(getVal(feat)))
            .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)')
            .polygonStrokeColor(() => '#111')
            .polygonLabel(({ properties: d }) => `
              <b>${d.ADMIN} (${d.ISO_A2}):</b> `)
            .onPolygonHover(hoverD => {
              highlightCountry(hoverD);
            })
            .polygonsTransitionDuration(300);

          // Auto-rotate
          globeInstance.value.controls().autoRotate = true;
          globeInstance.value.controls().autoRotateSpeed = 0.5;
        });

      // Fetch locations data from JSON file
      fetch('./locations.json')
        .then(res => res.json())
        .then(data => {
          locations.value = data.locations;
          updateMarkers();
        });
    });

    return {
      globeContainer,
      locations,
      toggleLocation,
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
  width: 100%;
  height: 100%;
}

.locations-list {
  position: absolute;
  top: 50px;
  right: 20px;
  width: 300px;
  max-height: calc(100vh - 40px);
  background-color: rgba(68, 68, 68, 0);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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

.locations-list ul li li:hover {
  background-color: #a5a5a5;
}

</style>
