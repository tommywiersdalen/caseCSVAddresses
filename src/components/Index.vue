<template>
    <div>
        <Modal :show="open" @close="emit('close')">
            <LoginCard @loginUser1="handleLogInUser1" @loginUser2="handleUserLogin2" />
        </Modal>
        <Modal :show="openMap" @close="openMap = false">
            <h2 class="text-lg font-bold mb-4">Kart over adresse</h2>
            <AddressMap :address="selectedAddress" />
        </Modal>
        <CSVList @rowClicked="handleClickedRow" />
    </div>
</template>
<script setup lang="ts">
    import CSVList from './CSVList.vue';
    import Modal from './Layout/Modal.vue';
    import LoginCard from './LoginCard.vue';
    import { useAuthStore } from '../stores/authStore';
    import AddressMap from './AddressMap.vue';
    import { ref } from 'vue';

    const store = useAuthStore();

    const emit = defineEmits(['close']);

    defineProps({
        open: {
            type: Boolean,
            default: false
        }
    });

    const selectedAddress = ref<Record<string, string> | null>(null);
    const openMap = ref<boolean>(false)

    const handleLogInUser1 = () => {
        store.loginUser1();
        emit('close');

    };

    const handleUserLogin2 = () => {
        store.loginUser2();
        emit('close');
    };
    const handleClickedRow = (row: Record<string, string>) => {

        selectedAddress.value = row;
        openMap.value = true;


    };

</script>