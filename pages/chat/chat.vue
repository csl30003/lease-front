<template>
    <Upload ref="upLoad" :count="1" />
    <button @click="Submit">提交</button>
</template>

<script setup>
import Upload from '@/components/Upload/Upload.vue';
import { ref } from 'vue';

const upLoad = ref(null);

function Submit() {
    upLoad.value.UploadImg().then((res) => {
        console.log(res);
    });
}
</script>

<style></style>
