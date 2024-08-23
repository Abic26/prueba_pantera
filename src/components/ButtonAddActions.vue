<script setup>
import { ref } from 'vue'

const selectedOption = ref('publico')
const buttons = ref([
    { icon: 'pi pi-image', label: 'Imagen' },
    { icon: 'pi pi-video', label: 'Video' },
    { icon: 'pi pi-microphone', label: 'Micrófono' },
    { icon: 'pi pi-tag', label: 'Etiqueta' }
])
const files = ref([])

</script>

<template>
    <div class="flex justify-between">
        <div
            class="flex justify-center items-center gap-6 px-7 py-4 w-[237px] h-[44px] rounded-full border-2 border-gray-500">
            <span class="text-white cursor-default">Agregar</span>
            <div class="flex">
                <button v-for="(button, index) in buttons" :key="index"
                    class="flex items-center justify-center p-2 text-white bg-transparent border-none rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <i :class="button.icon + ' text-xl'"></i>
                    <input type="file" multiple class="hidden" />
                </button>
            </div>
        </div>

        <div class="flex justify-center items-center gap-2">
            <div>
                <select v-model="selectedOption"
                    class="rounded-full bg-bgSelect text-white p-2 border-none outline-none">
                    <option value="publico" selected>Público</option>
                    <option value="privado">Privado</option>
                    <option value="solo-para-mi">Solo para mí</option>
                </select>
            </div>
            <div>
                <button class="bg-[#1ED760] text-black font-bold rounded-full py-2 px-6 text-base"
                    style="width: 86px; height: 40px; border-radius: 22px;">
                    Post
                </button>
            </div>
        </div>
    </div>

</template>
