<template>
    <div>
        <table v-if="store.isAuthenticated" class="min-w-full border-collapse">
            <caption class="text-lg font-semibold mb-4">CSV Data fra {{ csvFilePath }}</caption>
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in parsedData" :key="index">
                    <td v-for="(cell, index) in row" :key="index">{{ cell }}</td>
                </tr>
            </tbody>
        </table>
        <p v-else class="text-red-500">You must be logged in to view the CSV data.</p>
        <p v-if="!store.isAuthenticated" class="text-red-500">Please log in to access the data.</p>
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