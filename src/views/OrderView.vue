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
import { ref,onMounted  } from "vue";
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

onMounted(async () => {
  await loadGoogleMaps();

  if (!mapRef.value) return;

  const location = { lat: 25.033964, lng: 121.564468 };

  const map = new google.maps.Map(mapRef.value, {
    center: location,
    zoom: 15,
  });

  new google.maps.Marker({
    position: location,
    map,
    title: "台北 101",
  });
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
  }
  .info {
    background-color: rgb(255, 241, 225);
    width: 600px;
    padding: 20px;
  }
}
</style>
