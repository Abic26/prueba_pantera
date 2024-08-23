<script setup>
import { ref } from 'vue'
import ButtonAddActions from './ButtonAddActions.vue';
import DialogPost from './DialogPost.vue';

const showTextarea = ref(false)
const files = ref([]);
const postContent = ref('This was the best performance of the night! The dancers, Choreography, costumes, stage everything! As busy as she is with her tour and then to put this show was amazing. Love her!😍');
const showDialog = ref(false);

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
                :placeholder={postContent}></textarea>
            <i v-if="showTextarea" class="pi pi-face-smile absolute bottom-[90px] right-7 text-gray-200"></i>
            <div v-if="showTextarea" class="p-2">
                <ButtonAddActions @files-selected="handleFilesSelected" @post="openDialog" />
            </div>
        </div>
    </div>
    <DialogPost v-model="showDialog" :postContent="postContent" :files="files" @close="showDialog = false" />
</template>
