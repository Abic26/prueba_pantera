<script setup>
import { ref, onMounted } from 'vue'
import ButtonAddActions from './ButtonAddActions.vue';
import DialogPost from './DialogPost.vue';

const showTextarea = ref(false)
const files = ref([]);
const postContent = ref('This was the best performance of the night! The dancers, Choreography, costumes, stage everything! As busy as she is with her tour and then to put this show was amazing. Love her!😍');
const showDialog = ref(false);
const postContentView = ref('')
const imageUrl = ref([])

function toggleView() {
    showTextarea.value = !showTextarea.value;
}
const openDialog = () => {
    showDialog.value = true;
};
const handleFilesSelected = (newFiles) => {
    files.value = [...files.value, ...newFiles];
    openDialog();
};

const loadPost = () => {
    // Recuperar el string JSON del localStorage
    const dataString = localStorage.getItem('myData');

    // Verificar si hay datos en localStorage
    if (dataString) {
        // Parsear el JSON de vuelta a un objeto
        const data = JSON.parse(dataString);

        // Acceder al contenido del post y a la URL de la imagen
        postContentView.value = data.post || '';

        // Si tienes un array de archivos, puedes buscar la imagen en él
        if (data.files && data.files.length > 0) {
            const imageFile = data.files.find(file => file.type.startsWith('image/'));
            if (imageFile) {
                // Usar base64 como URL de la imagen
                imageUrl.value = imageFile.base64 || ''; // Asegúrate de que `imageFile.base64` esté disponible
            }
        }
    } else {
        console.log('No data found in localStorage');
    }
}

onMounted(() => {
    loadPost();
});

</script>

<template>
    <div class="relative bg-themePost p-4 rounded-xl w-[721px] flex items-start">
        <Avatar image="imagen.png" class="absolute top-4 left-4 w-12 h-12 object-cover rounded-full" size="large"
            shape="circle" />
        <div class="flex flex-col ml-16 w-full">
            <input @click="toggleView" v-if="!showTextarea" class="p-3 rounded-full text-lg bg-bgInput font-montserrat"
                type="text" placeholder="What are you thinking?" />
            <textarea v-model="postContent" v-if="showTextarea" autoResize
                class="font-montserrat text-lg p-2 bg-bgInput rounded-md w-full h-[134px] resize-none pr-10"
                :placeholder="postContent"></textarea>
            <i v-if="showTextarea" class="pi pi-face-smile absolute bottom-[90px] right-7 text-gray-200"></i>
            <div v-if="showTextarea" class="p-2">
                <ButtonAddActions @files-selected="handleFilesSelected" @post="openDialog" />
            </div>
        </div>
    </div>
    <DialogPost v-model="showDialog" :postContent="postContent" :files="files" @close="showDialog = false" />

    <!-- aca renderizar el post despues de guardado -->

    <section>
        <div  class=" bg-themePost p-4 rounded-xl w-[721px] flex flex-col gap-4">
            <div v-if="postContentView" class="flex justify-between items-center">
                <div class="flex flex-row items-center gap-3">
                    <Avatar image="imagen.png" class="object-cover rounded-full" size="large" shape="circle" />
                    <p class="font-bold">Eleanor Peña</p>
                    <div class="flex items-center gap-2">
                        <span
                            class="flex items-center opacity-55 justify-center w-1 h-1 bg-gray-400 rounded-full"></span>
                        <p class="text-center opacity-55">5 min</p>
                        <i class="pi pi-globe text-gray-200 opacity-55"></i>
                    </div>
                </div>
                <i class="pi pi-ellipsis-v opacity-55 cursor-pointer"></i>
            </div>
            <div class="flex flex-col w-auto gap-4">
                <!-- Mostrar la imagen solo si imageUrl está definido y no vacío -->
                <img v-if="imageUrl && imageUrl.length" class="rounded-xl h-[408px]" :src="imageUrl" alt="Image" />
                <!-- Mostrar un mensaje si postContentView está vacío -->
                <p v-if="postContentView" class="opacity-75">{{ postContentView }}</p>
                <p v-else class="opacity-75">No hay post para mostrar</p>
            </div>
        </div>
    </section>
</template>
