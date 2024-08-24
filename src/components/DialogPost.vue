<script setup>
import { ref, watch } from 'vue';
import Cropperjs from './Cropperjs.vue'
const props = defineProps({
    postContent: {
        type: String,
        required: true
    },
    files: {
        type: Array,
        required: true
    },
    modelValue: {
        type: Boolean,
        required: true
    }
});
const emit = defineEmits(['close', 'update:modelValue', 'update:postContent', 'postSaved']);
const getObjectURL = (file) => {
    if (typeof window !== 'undefined' && file) {
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
const visible = ref(props.modelValue);
watch(() => props.modelValue, (newValue) => {
    visible.value = newValue;
});
watch(visible, (newValue) => {
    emit('update:modelValue', newValue);
});
const updateContent = (newContent) => {
    emit('update:postContent', newContent);
};
const fileInput = ref(null);
const files = ref([]);
watch(() => props.files, (newFiles) => {
    files.value = newFiles;
});

const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            console.log('Image file detected:', file);
            props.files.push(file);
        } else {
            console.warn('Unsupported file type:', file.type);
        }
    });
};

const triggerFileInput = () => {
    fileInput.value.click();
};
const removeFile = (index) => {
    props.files.splice(index, 1);
}
const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const savePost = async () => {
    console.log('se guardo');
    console.log(props.postContent);

    const fileBase64s = await Promise.all(
        files.value.map(async file => ({
            name: file.name,
            type: file.type,
            base64: await getBase64(file)
        }))
    );

    const dataToStore = {
        post: props.postContent,
        files: fileBase64s
    };

    const dataString = JSON.stringify(dataToStore);
    console.log(dataString);
    localStorage.setItem('myData', dataString);

    emit('post-saved');
    emit('close');
}
const cropperModal = ref(false)
const dataimagen = ref('')

const handlerCropperModal = () => {
    if (files.value.length > 0) {
        cropperModal.value = true;
        // Obtener el primer archivo de la lista de archivos
        const firstFile = files.value[0];
        dataimagen.value = getObjectURL(firstFile);
    } else {
        console.warn('No files available for cropping');
    }
}
// Manejar el evento 'image-cropped'
const handleImageCropped = (croppedImage) => {
    if (files.value.length > 0) {
        const firstFile = files.value[0];
        const updatedFile = new File([dataURLtoBlob(croppedImage)], firstFile.name, { type: firstFile.type });
        files.value[0] = updatedFile;
    }
    cropperModal.value = false;
}

const dataURLtoBlob = (dataURL) => {
    const [header, data] = dataURL.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const binStr = atob(data);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type: mime });
}

</script>

<template>
    <Dialog v-model:visible="visible" header="Create Post" visible modal :closable="true" @hide="emit('close')"
        :style="{ width: '90%', maxWidth: '50rem' }">
        <hr>
        <div class="flex flex-col justify-center gap-4">
            <div class="flex flex-col md:flex-row gap-4 pt-6">
                <Avatar image="imagen.png" class="object-cover rounded-full" size="large" shape="circle" />
                <div class="flex flex-col gap-2 w-full">
                    <div v-if="files.length">
                        <div class="flex flex-wrap gap-2 w-full h-auto overflow-hidden relative">
                            <div v-for="(file, index) in files" :key="index"
                                class="flex-grow flex-shrink-0 w-full md:w-[calc(33%-8px)] h-auto rounded-xl overflow-hidden relative">
                                <div v-if="file.type.startsWith('image/')" class="w-full h-[450px] relative">
                                    <Image preview width="750" :src="getObjectURL(file)"
                                        class="w-full h-full object-cover" />
                                    <button @click="removeFile(index)"
                                        class="absolute top-2 right-2 text-white p-1 w-10 h-10 rounded-full backdrop-blur-sm bg-white/30">
                                        <i class="pi pi-times"></i>
                                    </button>
                                </div>
                                <div v-else-if="file.type.startsWith('video/')" class="w-full h-[150px] relative">
                                    <video :src="getObjectURL(file)" class="w-full h-full object-cover" controls />
                                    <button @click="removeFile(index)"
                                        class="absolute top-2 right-2 text-white p-1 w-10 h-10 rounded-full backdrop-blur-sm bg-white/30">
                                        <i class="pi pi-times"></i>
                                    </button>
                                </div>
                                <div v-else-if="file.type.startsWith('audio/')" class="w-full h-full relative">
                                    <audio :src="getObjectURL(file)" class="w-full h-full" controls />
                                    <button @click="removeFile(index)"
                                        class="absolute top-2 right-2 text-white p-1 w-10 h-10 rounded-full backdrop-blur-sm bg-white/30">
                                        <i class="pi pi-times"></i>
                                    </button>
                                </div>
                                <div v-else
                                    class="w-full h-full bg-gray-300 text-black flex items-center justify-center">
                                    <span>Archivo no soportado</span>
                                </div>
                            </div>
                            <div class="flex gap-2 w-full absolute top-4 left-2 z-50">
                                <Button @click="triggerFileInput" class="backdrop-blur-sm bg-white/30" icon="pi pi-plus"
                                    text raised rounded aria-label="add" severity="secondary" />
                                <Button @click="handlerCropperModal" class="backdrop-blur-sm bg-white/30"
                                    icon="pi pi-pen-to-square" text raised rounded aria-label="Filter"
                                    severity="secondary" label="Edit" />
                            </div>
                        </div>
                    </div>

                    <textarea disabled v-model="props.postContent" @input="updateContent($event.target.value)"
                        class="font-montserrat text-lg p-2 bg-bgInput rounded-xl w-full h-[134px] resize-none pr-10"
                        placeholder="This was the best performance of the night! The dancers, Choreography, costumes, stage everything! As busy as she is with her tour and then to put this show was amazing. Love her!😍"></textarea>
                    <i class="pi pi-face-smile absolute bottom-[85px] right-9 text-gray-200"></i>

                    <div class="flex justify-between pt-">
                        <div class="flex justify-center items-center gap-2">
                            <div
                                class="flex justify-center items-center gap-6 px-7 py-4 w-[237px] h-[44px] rounded-full border-2 border-gray-500">
                                <span class="text-white cursor-default">Agregar</span>
                                <div class="flex">
                                    <button @click="triggerFileInput" v-for="(button, index) in buttons" :key="index"
                                        class="relative flex items-center justify-center p-2 text-white bg-transparent border-none rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        <i :class="button.icon + ' text-xl'"></i>
                                        <input type="file" multiple class="absolute inset-0 opacity-0 cursor-pointer" />
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
                                <button @click="savePost"
                                    class="bg-[#1ED760] text-black font-bold rounded-full py-2 px-6 text-base"
                                    style="width: 86px; height: 40px; border-radius: 22px;">
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <input ref="fileInput" type="file" @change="handleFileChange" multiple style="display: none" />
    </Dialog>
    <Dialog header="Edit photo" v-model:visible="cropperModal" :style="{ width: '90%', maxWidth: '50rem' }">
        <Cropperjs :imageSrc="dataimagen" @image-cropped="handleImageCropped" />
    </Dialog>
</template>
