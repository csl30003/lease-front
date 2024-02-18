<template>
    <Upload ref="upLoad" :count="1" />
    <button class="submit-button" @click="Submit">提交</button>
</template>

<script setup>
import Upload from '@/components/Upload/Upload.vue';
import { ref } from 'vue';

const upLoad = ref(null);

function Submit() {
    upLoad.value.UploadImg().then((res) => {
    });

    uni.navigateBack({
        delta: 1
    })
}
</script>

<style scoped lang="scss">
@use './editUserAvarar.scss';
</style>
