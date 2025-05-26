<script setup lang="ts">
  import { ref } from 'vue';
  import Index from './components/Index.vue';
  import MainLayout from './components/Layout/MainLayout.vue';

  import { useAuthStore } from './stores/authStore';
  import Modal from './components/Modal.vue';
  import LoginCard from './components/LoginCard.vue';

  const store = useAuthStore();
  const open = ref<boolean>(false);
  const setOpen = () => {
    open.value = true;
  };
  const setClose = () => {
    open.value = false;
  };
  const handleLogInUser1 = () => {
    store.loginUser1();
    open.value = false;
  };
  const handleUserLogin2 = () => {
    store.loginUser2();
    open.value = false;
  };
  const handleLogout = () => {
    store.logout();
    setClose();
  };

</script>
<template>
  <MainLayout @login="setOpen" @logout="handleLogout">
    <Modal :show="open">
      <LoginCard @loginUser1="handleLogInUser1" @loginUser2="handleUserLogin2" />
    </Modal>
    <Index />
  </MainLayout>
</template>
