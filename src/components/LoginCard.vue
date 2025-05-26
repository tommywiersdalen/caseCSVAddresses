<template>
    <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" @click="$emit('loginUser1')">
        Logg inn med bruker 1
    </button>
    <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2" @click="$emit('loginUser2')">
        Logg inn med bruker 2
    </button>
</template>
<script setup lang="ts">
    import { defineEmits } from 'vue';
    const emit = defineEmits(['loginUser1', 'loginUser2']);
    // Emits for login actions
</script>