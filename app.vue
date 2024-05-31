<template>
<div>
  {{ data }}
</div>
</template>

<script setup lang="ts">
const data = await $fetch ('/api/recipes')
</script>
