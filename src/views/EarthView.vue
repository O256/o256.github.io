<template>
  <div class="container">
    <img src="@/assets/Earth/ChinaUnicomLogo.svg" alt="China Unicom Logo" class="logo" />
    <div ref="globeContainer" class="globe-container"></div>
    <div class="locations-list">
      <ul>
        <li v-for="location in locations" :key="location.name">
          <div @click="toggleLocation(location)">
            {{ location.name }}
          </div>
          <ul v-if="location.expanded">
            <li v-for="subLocation in location.subLocations" :key="subLocation.name"
              @click="flyToLocation(subLocation, location.ISO_A2)">
              {{ subLocation.name }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div ref="infoContainerRef" class="info-container"></div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Globe from 'globe.gl';
import { scaleSequentialSqrt } from 'd3-scale';
import { interpolateYlOrRd } from 'd3-scale-chromatic';
import * as THREE from 'three';

export default {
  name: 'EarthView',
  setup() {
    const globeContainer = ref(null);
    const globeInstance = ref(null);
    const countriesData = ref([]); // 保存国家数据
    const infoContainerRef = ref(null); // 用于显示国旗和信息的容器
    const markers = ref([]); // 保存标记数据
    const layers = ref([]); // 保存图层数据

    const colorScale = scaleSequentialSqrt(interpolateYlOrRd);
    const getVal = feat => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

    const locations = ref([]);
    const currentLocation = ref(null); // 当前显示信息的地点

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

        // 找到对应的国家并高亮显示
        const flyD = countriesData.value.find(d => d.properties.ISO_A2 === country);
        if (flyD) {
          highlightCountry(flyD);
          showFlagAndInfo(location, flyD);
          globeInstance.value.controls().autoRotate = false;
        }
      }
    };

    const highlightCountry = (country) => {
      if (country) {
        globeInstance.value
          .polygonAltitude(d => {
            return d.properties.ISO_A2 === country.properties.ISO_A2 ? 0.08 : 0.06;
          })
          .polygonCapColor(d => {
            return d.properties.ISO_A2 === country.properties.ISO_A2 ? 'steelblue' : colorScale(getVal(d));
          });

        // 添加标记数据
        markers.value = { lat: country.lat, lng: country.lng, ISO_A2: country.properties.ISO_A2 };
        updateMarkers();
      } else {
        markers.value = [];
        updateMarkers();
        globeInstance.value.polygonAltitude(0.06);
        globeInstance.value.polygonCapColor(d => colorScale(getVal(d)));
      }
    };

    const showFlagAndInfo = (location, country) => {
      const infoContainer = infoContainerRef.value;
      if (!infoContainer) return;

      infoContainer.style.display = 'block';
      // 清空之前的内容
      infoContainer.innerHTML = '';
      // 创建信息元素
      const infoBox = document.createElement('div');
      infoBox.className = 'info-box';
      infoBox.innerHTML = `
        <img src="https://flagcdn.com/w320/${country.properties.ISO_A2.toLowerCase()}.png" alt="${country.properties.ADMIN} Flag" class="flag">
        </br>
        <b>${country.properties.ADMIN} (${country.properties.ISO_A2}):</b>
        <br />
        Population: ${country.properties.POP_EST.toLocaleString()}
        <br />
        GDP: ${country.properties.GDP_MD_EST.toLocaleString()} USD
      `;

      // 将国旗和信息添加到容器中
      infoContainer.appendChild(infoBox);

      // 保存当前地点以便在每次渲染帧时更新位置
      currentLocation.value = location;
      updateInfoContainerPosition();
    };

    const updateInfoContainerPosition = () => {
      const infoContainer = infoContainerRef.value;
      if (!infoContainer || !currentLocation.value) return;

      const { x, y } = globeInstance.value.getScreenCoords(currentLocation.value.lat, currentLocation.value.lng);
      infoContainer.style.left = `${x}px`;
      infoContainer.style.top = `${y}px`;

      requestAnimationFrame(updateInfoContainerPosition);
    };

    const createBaseLayer = () => {
      globeInstance.value
        .customLayerData(layers.value)
        .customThreeObject(d => {
          const geometry = new THREE.SphereGeometry(0.5, 16, 16);
          const material = new THREE.MeshLambertMaterial({
            color: 0x00ff00,
            emissive: 0x00ff00,
            emissiveIntensity: 0.3
          });
          return new THREE.Mesh(geometry, material);
        })
        .customThreeObjectUpdate((obj, d) => {
          // 判断是否是markers,markers的z坐标为0.08
          // 如果markers.value.length > 0,则z = 0.08,否则z = 0.06 
          let z = 0.06;
          if (markers.value) {
            // 选中国家的点
            if (d.ISO_A2 === markers.value.ISO_A2) {
              z = 0.08;
              obj.material.color.setRGB(1, 0, 0);
            }
          }
          Object.assign(obj.position, globeInstance.value.getCoords(d.lat, d.lng, z));
        });
    };

    onMounted(() => {
      fetch('ne_110m_admin_0_countries.geojson')
        .then(res => res.json())
        .then(countries => {
          countriesData.value = countries.features; // 保存国家数据
          const maxVal = Math.max(...countries.features.map(getVal)); // 获取最大值
          colorScale.domain([0, maxVal]); // 设置颜色比例尺的域

          globeInstance.value = Globe()(globeContainer.value)
            .globeImageUrl('/earth-night.jpg')
            .backgroundImageUrl('/night-sky.png')
            .lineHoverPrecision(0)
            .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
            .polygonAltitude(0.06) // 设置国家的高度
            .polygonCapColor(feat => colorScale(getVal(feat))) // 设置国家的颜色
            .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)') // 设置国家的边框颜色
            .polygonStrokeColor(() => '#111') // 设置国家的边框颜色
            .polygonLabel(({ properties: d }) => `
              <div class="info-box">
                <img src="https://flagcdn.com/w320/${d.ISO_A2.toLowerCase()}.png" alt="${d.ADMIN} Flag" class="flag">
                <br />
                <b>${d.ADMIN} (${d.ISO_A2}):</b> 
                <br />
                Population: ${d.POP_EST.toLocaleString()}
                <br />
                GDP: ${d.GDP_MD_EST.toLocaleString()} USD
              </div>
              `)
            .onPolygonHover(hoverD => {
              if (hoverD) {
                const contry = countriesData.value.find(d => d.properties.ISO_A2 === hoverD.properties.ISO_A2);
                highlightCountry(contry);
                // 隐藏信息容器
                infoContainerRef.value.style.display = 'none';
                // 停止转动
                globeInstance.value.controls().autoRotate = false;
              } else {
                highlightCountry(null);
                // infoContainerRef.value.style.display = 'block';
                // 开始转动
                globeInstance.value.controls().autoRotate = true;
              }
            })
            .polygonsTransitionDuration(300);

          globeInstance.value.controls().autoRotate = true;
          globeInstance.value.controls().autoRotateSpeed = 0.5;
        });

      // Fetch locations data from JSON file
      fetch('./locations.json')
        .then(res => res.json())
        .then(data => {
          locations.value = data.locations;
          layers.value = data.locations.flatMap(location =>
            location.subLocations.map(subLocation => ({
              lat: subLocation.lat,
              lng: subLocation.lng,
              ISO_A2: location.ISO_A2
            }))
          );
          updateMarkers();
        });

      // 开始更新信息容器的位置
      requestAnimationFrame(updateInfoContainerPosition);
    });

    // 更新markers
    const updateMarkers = () => {
      if (globeInstance.value) {
        createBaseLayer();
      }
    };

    return {
      globeContainer,
      locations,
      toggleLocation,
      flyToLocation,
      infoContainerRef
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.logo {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 180px;
  /* Adjust the size as needed */
  z-index: 1001;
}

.globe-container {
  width: 100%;
  height: 100%;
}

.locations-list {
  position: absolute;
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

.info-container {
  position: absolute;
  z-index: 1001;
  pointer-events: none;
}
</style>

<!-- 将 .flag 样式移到全局样式中 -->
<style>
.flag {
  width: 40px !important;
  /* 调整国旗的宽度并增加优先级 */
  height: auto !important;
  /* 保持宽高比并增加优先级 */
}

.info-box {
  background-color: rgba(97, 97, 97, 0.363);
  padding: 10px;
  border-radius: 8px;
  margin-left: 10px;
}
</style>
