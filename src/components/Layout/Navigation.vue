<template>
    <div class="flex flex-col ">
        <header class="flex justify-between items-center bg-blue-500 text-white p-4">
            <h1>Addressliste</h1>
            <div>
                <p v-if="store.isAuthenticated" class="text-sm">Innlogget som:</p>
                <p v-if="store.user">{{ store.user.name }}</p>
            </div>
            <div class="flex justify-end">
                <button v-if="store.isAuthenticated" @click="$emit('logout')"
                    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2">
                    Logg
                    ut
                </button>
                <button v-else @click="$emit('login')"
                    class="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Logg inn
                </button>
            </div>
        </header>
    </div>
</template>
<script setup lang="ts">
    import { useAuthStore } from '../../stores/authStore';
    const store = useAuthStore();
</script>