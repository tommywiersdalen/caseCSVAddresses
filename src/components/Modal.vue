<script setup>
    defineProps({
        show: Boolean
    })
</script>
<template>
    <Transition name="modal">
        <div v-if="show" class="fixed left-0 top-0 bg-black opacity-50 w-screen h-screen">
            <div class="bg-white rounded shadow-md p-8 mx-auto my-20 w-1/4">
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <button
                            class="bg-gray-100 border border-gray-300 px-6 py-2 rounded text-black hover:bg-gray-200"
                            @click="$emit('logIn')">Log inn</button>
                        <button
                            class="bg-gray-100 border border-gray-300 px-6 py-2 rounded text-black hover:bg-gray-200"
                            @click="$emit('close')">Avbryt</button>
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>