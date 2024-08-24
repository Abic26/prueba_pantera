<script setup>
import { ref, watch, onUnmounted } from 'vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const props = defineProps({
    imageSrc: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['image-cropped']);

const imageData = ref(null);
const croppedImage = ref(null);
const cropperInstance = ref(null);
const refImage = ref(null); // Definir la referencia de la imagen

watch(() => props.imageSrc, (newSrc) => {
    imageData.value = newSrc;
}, { immediate: true });

const initializeCropper = () => {
    if (cropperInstance.value) {
        cropperInstance.value.destroy();
    }
    if (refImage.value) {
        cropperInstance.value = new Cropper(refImage.value, {
            aspectRatio: 1, // Cambia esto según tu necesidad
            viewMode: 1,
            autoCropArea: 1,
            scalable: true,
            cropBoxResizable: true,
        });
    }
};

const cropImage = () => {
    if (cropperInstance.value) {
        croppedImage.value = cropperInstance.value.getCroppedCanvas().toDataURL();
        emit('image-cropped', croppedImage.value);
    }
    console.log(croppedImage); //devolver este valor al conmpobnente padre
};

onUnmounted(() => {
    if (cropperInstance.value) {
        cropperInstance.value.destroy();
    }
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <div v-if="imageData">
            <img ref="refImage" :src="imageData" alt="Image to crop" @load="initializeCropper" />
        </div>
        <div class="flex justify-end gap-4">
            <button class="hover:bg-bgHover font-bold rounded-full py-2 px-6 text-base"
                style="width: 86px; height: 40px; border-radius: 22px;">Cancel</button>
            <button v-if="imageData" @click="cropImage"
                class="bg-[#1ED760] hover:bg-green-400 text-black font-bold rounded-full py-2 px-6 text-base"
                style="width: 86px; height: 40px; border-radius: 22px;">
                Save
            </button>
        </div>
        <div v-if="croppedImage" class="cropped-image">
            <h3>Imagen Recortada:</h3>
            <img :src="croppedImage" alt="Cropped Image" />
        </div>
    </div>
</template>
