<template>
    <div>
        <Modal :show="open">
            <template #default>
                <LoginCard @loginUser1="handleLogInUser1" @loginUser2="handleUserLogin2" />
            </template>
            <template #footer>
                <button class="bg-gray-200 border border-gray-600 px-6 py-2 rounded text-black hover:bg-gray-300"
                    @click="$emit('close')">Lukk</button>
            </template>
        </Modal>
        <Modal :show="openMap" @close="openMap = false">
            <template #default>
                <h2 class="text-lg font-bold mb-4">Kart over adresse</h2>
                <AddressMap :address="selectedAddress" />
            </template>
        </Modal>
        <CSVList @rowClicked="handleClickedRow" />
    </div>
</template>
<script setup lang="ts">
    import CSVList from './CSVList.vue';
    import Modal from './Modal.vue';
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