<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    postContent: {
        type: String,
        required: true
    },
    files: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['close']);

const getObjectURL = (file) => {
    if (typeof window !== 'undefined') {
        return window.URL.createObjectURL(file);
    }
    return '';
};
</script>

<template>
    <Dialog header="Post Preview" visible modal :closable="true" @hide="emit('close')">
        <div>
            <p>{{ postContent }}</p>
            <div v-if="files.length" class="mt-4">
                <div v-for="(file, index) in files" :key="index" class="mb-2">
                    <div v-if="file.type.startsWith('image/')" class="w-32 h-32 overflow-hidden">
                        <img :src="getObjectURL(file)" class="w-full h-full object-cover" />
                    </div>
                    <div v-else-if="file.type.startsWith('video/')" class="w-32 h-32 overflow-hidden">
                        <video :src="getObjectURL(file)" class="w-full h-full object-cover" controls />
                    </div>
                    <div v-else-if="file.type.startsWith('audio/')" class="w-32 h-12 overflow-hidden">
                        <audio :src="getObjectURL(file)" class="w-full h-full" controls />
                    </div>
                    <div v-else class="w-32 h-12 bg-gray-300 text-black flex items-center justify-center">
                        <span>Archivo no soportado</span>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>
