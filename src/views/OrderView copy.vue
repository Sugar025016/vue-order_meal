<template>
  <div class="order-view">
    <div ref="mapRef" class="map"></div>
    <div class="info">
      <Order class="login-view_auth-login-form" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Order from "@/components/order/Order.vue";
import { ref, onMounted } from "vue";
declare const google: any;

const mapRef = ref<HTMLDivElement | null>(null);

function loadGoogleMaps(): Promise<void> {
  return new Promise((resolve) => {
    // 已載入就直接用
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    ((script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBrOCdfPjd6fB_-QSRZIpDRP1q-O2bl8iI"),
      (script.async = true));
    script.defer = true;
    script.onload = () => resolve();

    document.head.appendChild(script);
  });
}

// onMounted(async () => {
//   await loadGoogleMaps();

//   if (!mapRef.value) return;

//   const location = { lat: 25.033964, lng: 121.564468 };

//   const map = new google.maps.Map(mapRef.value, {
//     center: location,
//     zoom: 15,
//   });

//   new google.maps.Marker({
//     position: location,
//     map,
//     title: "台北 101",
//   });
// });
let map: google.maps.Map;

function initMap() {
  const shop = { lat: 25.033964, lng: 121.564468 };
  const home = { lat: 25.047924, lng: 121.517081 };

  map = new google.maps.Map(mapRef.value, {
    center: shop,
    zoom: 14,
  });

  addMarker(shop, "Shop");
  addMarker(home, "Home");

  drawRoute(shop, home);
}

function addMarker(position: any, title: any) {
  new google.maps.Marker({
    position,
    map,
    title,
  });
}

function drawRoute(origin: any, destination: any) {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  directionsRenderer.setMap(map);

  directionsService
    .route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((result: any) => {
      directionsRenderer.setDirections(result);
    });
}
onMounted(async () => {
  await loadGoogleMaps();

  if (!mapRef.value) return;

  initMap();
});
</script>

<style lang="scss" scoped>
.order-view {
  width: 100%;
  // height: 500px;
  flex: 1;
  display: flex;
  // position: relative;
  .map {
    flex: 1;
    min-width: 100px;

    flex: 2 1 300px;
    height: calc(100vh - 80px);
  }
  .info {
    padding: 30px;
    flex: 1 2 400px;
    max-width: 860px; /* 最大寬度 */
  }
  @include respond(lg) {
    .info {
      max-width: none; /* 最大寬度 */
      padding: 20px;
    }
  }

  @include respond(md) {
    flex-direction: column;
    .map {
      flex: 2 1 400px;
    }
    .info {
      max-width: none; /* 最大寬度 */
      padding: 20px;
    }
  }
}
</style>
