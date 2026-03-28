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
import { useOrderStore } from "@/stores/order";
import { ref, onMounted, watch } from "vue";

const orderStore = useOrderStore();
const mapRef = ref<HTMLDivElement | null>(null);

let map: google.maps.Map;

function loadGoogleMaps(): Promise<void> {
  return new Promise((resolve) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    const key = import.meta.env.VITE_GOOGLE_MAP_KEY;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();

    document.head.appendChild(script);
  });
}

// watch(orderStore.order, () => {
//   initMap();
// });
watch(
  () => [orderStore.order],
  async (coords) => {
    if (coords.some((v) => v == null)) return;

    await loadGoogleMaps();
    initMap();
  },
  { immediate: true },
);

function initMap() {
  if (!mapRef.value) return;

  const shop: google.maps.LatLngLiteral = {
    lat: orderStore.order.shop.lat,
    lng: orderStore.order.shop.lng,
  };

  const home: google.maps.LatLngLiteral = {
    lat: orderStore.order.lat,
    lng: orderStore.order.lng,
  };

  map = new google.maps.Map(mapRef.value, {
    center: shop,
    zoom: 14,
  });

  addMarker(shop, "Shop");
  addMarker(home, "Home");

  drawRoute(shop, home);
}

function addMarker(position: google.maps.LatLngLiteral, title: string) {
  new google.maps.Marker({
    position,
    map,
    title,
  });
}

function drawRoute(
  origin: google.maps.LatLngLiteral,
  destination: google.maps.LatLngLiteral,
) {
  const directionsService = new google.maps.DirectionsService();

  const directionsRenderer = new google.maps.DirectionsRenderer({
    map,
    suppressMarkers: true, // 不使用預設 marker
    polylineOptions: {
      strokeColor: "#409EFF",
      strokeWeight: 5,
    },
  });

  directionsService.route(
    {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === "OK" && result) {
        directionsRenderer.setDirections(result);
      }
    },
  );
}

onMounted(async () => {
  await loadGoogleMaps();
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
    height: calc(100vh - 90px);
    margin: 10px 0;
  }
  .info {
    // padding: 30px;
    margin: 10px 20px;
    flex: 1 2 400px;
    max-width: 860px; /* 最大寬度 */
  }
  // @include respond(lg) {
  //   .info {
  //     max-width: none; /* 最大寬度 */
  //   }
  // }

  @include respond(sm) {
    flex-direction: column;
    .map {
      flex: 2 1 400px;
    }
    .info {
      max-width: none; /* 最大寬度 */
      // margin: 20px;
    }
  }
}
</style>
