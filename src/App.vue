<script setup lang="ts">
  import { ref } from 'vue';
  import Index from './components/Index.vue';
  import { useAuthStore } from './stores/authStore';

  import Navigation from './components/Layout/Navigation.vue';

  const store = useAuthStore();
  const open = ref<boolean>(false);
  const handleToggleModal = () => {
    open.value = !open.value;
  };

  const handleLogout = () => {
    store.logout();
    open.value = false;
  };

</script>
<template>
  <main>
    <Navigation @logout="handleLogout" @login="handleToggleModal" />
    <Index :open="open" @close="handleToggleModal" />
  </main>
</template>
