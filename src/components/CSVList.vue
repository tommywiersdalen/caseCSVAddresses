<template>
    <div class="container mx-auto p-4">
        <table v-if="store.isAuthenticated" class="min-w-full border-collapse">
            <caption class="text-lg font-semibold mb-4">CSV Data fra {{ csvFilePath }}</caption>
            <thead>
                <tr>
                    <th class="border p-4 bg-gray-300" v-for="(header, index) in headers" :key="index">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="hover:bg-gray-200" v-for="row in parsedData" :key="row.ADRESSEID"
                    @click="handleRowClicked(row)">
                    <td class="border p-4 " v-for="(cell, index) in row" :key="index">{{ cell }}</td>
                </tr>
            </tbody>
        </table>
        <p v-else class="text-red-500">Du må være innlogget for å bruke denne applikasjonen.</p>
        <div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref, watch } from 'vue';
    import Papa from 'papaparse';
    import { useAuthStore } from '../stores/authStore';



    const store = useAuthStore();

    const csvFile = ref<File | null>(null);
    const parsedData = ref<Record<string, string>[]>([]);
    const headers = ref<string[]>([]);

    const csvFilePath = ref<string>('Adresser Utsira.csv');

    const emit = defineEmits(['rowClicked']);
    defineProps({
        openMap: {
            type: Boolean,
            default: false
        }
    });

    const fetchCSVFile = async () => {
        try {
            const response = await fetch(csvFilePath.value);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            csvFile.value = new File([blob], 'data.csv', { type: 'text/csv;charset=utf-8;' });

        } catch (error) {
            console.error('Error fetching CSV file:', error);
        }
    };

    const parseCSV = () => {
        if (csvFile.value) {
            Papa.parse(csvFile.value, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    if (store.user?.role === "role2") {
                        // Filter rows based on BYGNINGSTYPE starting with '111'
                        parsedData.value = (results.data as Record<string, string>[])
                            .filter(row => row['BYGNINGSTYPE']?.startsWith('111'));
                    } else {
                        // For other roles, parse all data
                        parsedData.value = results.data as Record<string, string>[];
                    }

                    if (parsedData.value.length > 0) {
                        headers.value = Object.keys(parsedData.value[0]);
                        headers.value = headers.value.map(header => header.toUpperCase());
                    }
                },
                error: (error) => {
                    console.error('Error parsing CSV file:', error);
                }
            });
        } else {
            console.warn('No CSV file to parse');
        }
    };
    const handleRowClicked = (row: Record<string, string>) => {
        emit('rowClicked', row);

    };

    fetchCSVFile().then(() => {
        parseCSV();
    });

    watch(() => store.isAuthenticated, (newValue) => {
        if (newValue) {
            parseCSV();
        } else {
            parsedData.value = [];
            headers.value = [];
        }
    });



</script>