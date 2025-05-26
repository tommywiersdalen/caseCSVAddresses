<script setup>
    defineProps({
        show: Boolean
    })
    defineEmits(['close'])
</script>
<template>
    <Teleport to="body">
        <div v-show="show" class="fixed inset-0 flex items-start   my-10 justify-center z-2">
            <div class="bg-blue-100 rounded shadow-2xl p-8 mx-auto my-20 w-1/2">
                <div>
                    <slot></slot>
                </div>
                <div class="flex justify-end mt-4">
                    <slot name="footer">
                        <button
                            class="bg-gray-200 border border-gray-600 px-6 py-2 rounded text-black hover:bg-gray-300"
                            @click="$emit('close')">Lukk</button>
                    </slot>
                </div>
            </div>
        </div>
    </Teleport>
</template>