<script setup>

</script>

<template>

    <Dialog v-if="showDialog" header="Post Preview" visible modal :closable="true" @hide="showDialog = false">
        <div>
            <p>{{ postContent }}</p>
            <!-- Aquí puedes agregar lógica para mostrar imágenes, videos y audios si se suben -->
        </div>
    </Dialog>
</template>
