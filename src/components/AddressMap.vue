<template>
    <div>
        <p>Her vises kart med punkt</p>
        <p v-if="address">Punkt {{ address.Lat }} - {{ address.Lon }}</p>
    </div>
</template>
<script setup lang="ts">
    defineProps<{
        address: Record<string, any> | null
    }>();

</script>