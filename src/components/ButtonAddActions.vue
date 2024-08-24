<script setup>
import { ref } from 'vue';

const selectedOption = ref('publico');
const buttons = ref([
    { icon: 'pi pi-image', label: 'Imagen', type: 'image' },
    { icon: 'pi pi-play-circle', label: 'Video', type: 'video' },
    { icon: 'pi pi-microphone', label: 'Micrófono', type: 'audio' },
    { icon: 'pi pi-tag', label: 'Etiqueta', type: 'tag' }
]);

const emit = defineEmits();

const fileInputs = ref([]);
const handleFileChange = (index, event) => {
    console.log('Botón index:', index);
    const files = Array.from(event.target.files);
    emit('files-selected', files);
};

const registerFileInput = (el, index) => {
    fileInputs.value[index] = el;
};

const handlePostClick = () => {
    emit('post');
};
</script>

<template>
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div
            class="flex justify-center items-center gap-6 px-4 py-1 w-full md:w-auto rounded-full border-2 border-gray-500">
            <span class="text-white cursor-default">Agregar</span>
            <div class="flex">
                <button v-for="(button, index) in buttons" :key="index"
                    class="relative flex items-center justify-center p-2 text-white bg-transparent border-none rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <i :class="button.icon + ' text-xl'"></i>
                    <input type="file" :ref="(el) => registerFileInput(el, index)" multiple
                        class="absolute inset-0 opacity-0 cursor-pointer"
                        @change="(event) => handleFileChange(index, event)" />
                </button>
            </div>
        </div>

        <div class="flex justify-end items-center gap-2 w-full md:w-auto">
            <select v-model="selectedOption"
                class="rounded-full bg-bgSelect text-white p-2 border-none outline-none w-full md:w-auto">
                <option value="publico" selected>Público</option>
                <option value="privado">Privado</option>
                <option value="solo-para-mi">Solo para mí</option>
            </select>
            <button @click="handlePostClick" class="bg-[#1ED760] text-black font-bold rounded-full py-2 px-6 text-base"
                style="width: 86px; height: 40px; border-radius: 22px;">
                Post
            </button>
        </div>
    </div>
</template>
