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
    const dataString = localStorage.getItem('myData');
    if (dataString) {
        const data = JSON.parse(dataString);
        postContentView.value = data.post || '';
        if (data.files && data.files.length > 0) {
            imageUrl.value = data.files
                .filter(file => file.type.startsWith('image/'))
                .map(file => file.base64);
        }
    } else {
        console.log('No data found in localStorage');
    }
}
const handlePostSaved = () => {
    showDialog.value = false;
    showTextarea.value = false;
    loadPost();
};

onMounted(() => {
    loadPost();
});
</script>

<template>
    <div class="relative bg-themePost p-4 rounded-xl max-w-full w-full md:w-[721px] flex items-center">
        <Avatar size="large" shape="circle" image="imagen.png"
            class="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 object-cover rounded-full" />
        <div class="flex flex-col ml-14 md:ml-16 w-full">
            <input @click="toggleView" v-if="!showTextarea"
                class="p-3 rounded-full text-lg bg-bgInput font-montserrat w-full" type="text"
                placeholder="What are you thinking?" />
            <textarea v-model="postContent" v-if="showTextarea" autoResize
                class="font-montserrat text-lg p-2 bg-bgInput rounded-md w-full h-[120px] md:h-[134px] resize-none pr-10"
                :placeholder="postContent"></textarea>
            <i v-if="showTextarea"
                class="pi pi-face-smile absolute bottom-[90px] md:bottom-[90px] right-7 text-gray-200"></i>
            <div v-if="showTextarea" class="p-2">
                <ButtonAddActions @files-selected="handleFilesSelected" @post="openDialog" />
            </div>
        </div>
    </div>

    <DialogPost v-model="showDialog" :postContent="postContent" :files="files" @post-saved="handlePostSaved" />

    <section class="mt-4">
        <div class="bg-themePost p-4 rounded-xl max-w-full w-full md:w-[721px] flex flex-col gap-4">
            <div v-if="postContentView" class="flex flex-col sm:flex-row justify-between items-center gap-3">
                <div class="flex flex-row items-center gap-3">
                    <Avatar shape="circle" image="imagen.png"
                        class="object-cover rounded-full w-10 h-10 md:w-12 md:h-12" />
                    <div class="flex justify-center items-center gap-2">
                        <p class="font-bold text-base md:text-lg">Eleanor Peña</p>
                        <div class="bg-white rounded-full p-[2px] w-4 h-4 flex items-center justify-center">
                            <font-awesome-icon icon="music" class="text-themePost w-2 h-2" />
                        </div>

                        <font-awesome-icon icon="circle-check" />
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <span
                            class="flex items-center opacity-55 justify-center w-1 h-1 bg-gray-400 rounded-full"></span>
                        <p class="text-center opacity-55">5 min</p>
                        <font-awesome-icon class="text-gray-200 opacity-55" icon="earth-americas" />
                    </div>
                </div>
                <i class="pi pi-ellipsis-v opacity-55 cursor-pointer"></i>
            </div>
            <div class="flex flex-col gap-4">
                <div v-if="imageUrl.length > 1" class="flex flex-wrap gap-4">
                    <img v-for="(url, index) in imageUrl" :key="index"
                        class="rounded-xl w-full max-h-[300px] md:max-h-[408px] object-cover flex-1" :src="url"
                        alt="Image" />
                </div>
                <div v-else-if="imageUrl.length === 1" class="w-full">
                    <img v-if="imageUrl.length === 1"
                        class="rounded-xl w-full max-h-[300px] md:max-h-[408px] object-cover" :src="imageUrl[0]"
                        alt="Image" />
                </div>
                <p v-if="postContentView" class="opacity-75 text-sm md:text-base">{{ postContentView }}</p>
                <p v-else class="opacity-75 text-sm md:text-base">No hay post para mostrar</p>
            </div>
            <hr v-if="postContentView" class="opacity-25">
            <div v-if="postContentView" class="flex justify-between">
                <button
                    class="w-full flex justify-center items-center hover:text-white gap-2 hover:opacity-100 hover:bg-bgHover font-bold p-2 rounded-full">
                    <img src="/hand-horns.png" class="w-4" alt="">
                    <span class="cursor-pointer" for="">444 Likes</span>
                </button>
                <button
                    class="w-full flex justify-center items-center hover:text-white gap-2 hover:opacity-100 hover:bg-bgHover font-bold p-2 rounded-full">
                    <i class="pi pi-comment"></i>
                    <span class="cursor-pointer" for="">111 Comments</span>
                </button>
                <button
                    class="w-full flex justify-center items-center hover:text-white gap-2 hover:opacity-100 hover:bg-bgHover font-bold p-2 rounded-full">
                    <font-awesome-icon icon="share" />
                    <span class="cursor-pointer" for="">42 Shares</span>
                </button>
            </div>
        </div>
    </section>
</template>
