<template>
  <div>
    <Form :id="id" />
  </div>
</template>
<script setup>
const route = useRoute();
const id = route.params.id;
definePageMeta({
  middleware: "protected",
});
</script>
