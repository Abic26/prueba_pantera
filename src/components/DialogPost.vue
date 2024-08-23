<script setup>
import { defineProps, defineEmits, ref } from 'vue';

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
const selectedOption = ref('publico');
const buttons = ref([
    { icon: 'pi pi-image', label: 'Imagen', type: 'image' },
    { icon: 'pi pi-play-circle', label: 'Video', type: 'video' },
    { icon: 'pi pi-microphone', label: 'Micrófono', type: 'audio' },
    { icon: 'pi pi-tag', label: 'Etiqueta', type: 'tag' }
]);
</script>

<template>
    <Dialog header="Create  Post" visible modal :closable="true" @hide="emit('close')" :style="{ width: '50rem' }">
        <hr>
        <div class="flex flex-col justify-center gap-4">
            <div class="flex gap-4 pt-6">
                <Avatar image="imagen.png" class="object-cover rounded-full" size="large" shape="circle" />
                <div class="flex flex-col gap-2">
                    <div v-if="files.length">
                        <div v-for="(file, index) in files" :key="index" class="mb-2">
                            <div v-if="file.type.startsWith('image/')"
                                class="rounded-xl w-[690px] h-[408px] overflow-hidden">
                                <img :src="getObjectURL(file)" class="w-full h-full object-cover" />
                            </div>
                            <div v-else-if="file.type.startsWith('video/')"
                                class="rounded-xl w-[690px] h-[408px] overflow-hidden">
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
                    <textarea :v-model="postContent" autoResize
                        class="font-montserrat text-lg p-2 bg-bgInput rounded-xl w-full h-[134px] resize-none pr-10"
                        placeholder="This was the best performance of the night! The dancers, Choreography, costumes, stage everything! As busy as she is with her tour and then to put this show was amazing. Love her!😍"></textarea>
                    <i class="pi pi-face-smile absolute bottom-[90px] right-7 text-gray-200"></i>
                    <div class="flex justify-between">
                        <div class="flex justify-center items-center gap-2">
                            <div
                                class="flex justify-center items-center gap-6 px-7 py-4 w-[237px] h-[44px] rounded-full border-2 border-gray-500">
                                <span class="text-white cursor-default">Agregar</span>
                                <div class="flex">
                                    <button v-for="(button, index) in buttons" :key="index"
                                        class="relative flex items-center justify-center p-2 text-white bg-transparent border-none rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        <i :class="button.icon + ' text-xl'"></i>
                                        <input disabled type="file" multiple class="absolute inset-0 opacity-0 cursor-pointer" />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <select v-model="selectedOption"
                                    class="rounded-full bg-bgSelect text-white p-2 border-none outline-none">
                                    <option value="publico" selected>Público</option>
                                    <option value="privado">Privado</option>
                                    <option value="solo-para-mi">Solo para mí</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex justify-end items-center gap-2">
                            <div>
                                <button class="bg-[#1ED760] text-black font-bold rounded-full py-2 px-6 text-base"
                                    style="width: 86px; height: 40px; border-radius: 22px;">
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>
