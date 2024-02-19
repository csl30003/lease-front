<template>
    <view class="form-container">
        <view class="form-item">
            <text class="label">名称</text>
            <input class="input" @input="onNameInput" placeholder="请输入商品名称" />
        </view>
        <view class="form-item">
            <text class="label">详情</text>
            <textarea class="textarea" @input="onDetailsInput" placeholder="请输入商品详情"></textarea>
        </view>
        <view class="form-item">
            <text class="label">价格（天）</text>
            <input class="input" type="number" @input="onPriceInput" placeholder="请输入商品价格" />
        </view>
        <view class="form-item">
            <text class="label">数量</text>
            <input class="input" type="number" @input="onQuantityInput" placeholder="请输入商品数量" />
        </view>
        <view class="form-item">
            <text class="label">配送方式</text>
            <picker class="picker" mode="selector" :range="deliveryMethods" @change="onDeliveryMethodChange">
                <view class="picker-container">
                    <text v-if="!isDeliveryMethodSelected">点击选择配送方式</text>
                    <text class="selected-option">{{ deliveryMethods[deliveryMethod] }}</text>
                </view>
            </picker>
        </view>
        <view class="form-item">
            <text class="label">成色</text>
            <picker class="picker" mode="selector" :range="conditions" @change="onConditionChange">
                <view class="picker-container">
                    <text v-if="!isConditionSelected">点击选择成色</text>
                    <text class="selected-option">{{ conditions[condition] }}</text>
                </view>
            </picker>
        </view>
        <view class="form-item">
            <text class="label">已用年限</text>
            <input class="input" type="number" @input="onUsedYearsInput" placeholder="请输入已用年限" />
        </view>
    </view>

    <view class="container">
        <view class="header">
            <view class="upload-section">
                <!-- <view class="upload-btn" @tap="uploadImages">图片上传</view> -->
                <text class="label">上传图片</text>
                <view class="file-count">{{ files.length }}/6</view>
            </view>
        </view>
        <view class="image-section">
            <view class="image-gallery" id="image-gallery">
                <view v-for="(item, index) in files" :key="index" class="image-item" @tap="previewImage(index)">
                    <image class="preview-image" :src="item" mode="aspectFill"></image>
                </view>
                <view v-if="gallery !== -1" class="image-popup" @tap="close">
                    <view class="image-index">{{ gallery + 1 }}/{{ files.length }}</view>
                    <view class="image-wrapper">
                        <image mode="aspectFit" class="popup-image" :src="files[gallery]"></image>
                    </view>
                    <view class="delete-btn">
                        <view class="delete-icon" @tap="deleteImg(gallery)">删除图片</view>
                    </view>
                </view>
            </view>
            <view class="upload-btn-section" v-if="showUpload">
                <view class="add-btn" @tap="chooseImage">添加图片</view>
            </view>
        </view>

        <view class="btn-container">
            <button class="btn" @click="submitForm">发布</button>
        </view>
    </view>
</template>

<script setup>
import { ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { addProductAPI, updateProductStatusAPI } from "@/api/product"

const categoryId = ref('')
const addressId = ref('')
const name = ref('');
const details = ref('');
const price = ref(0);
const quantity = ref(0);
const deliveryMethod = ref('');
const condition = ref('');
const usedYears = ref(0);

const deliveryMethods = ref(['邮寄', '自提']);
const conditions = ref(['全新', '几乎全新', '轻微使用痕迹', '明显使用痕迹']);

const isDeliveryMethodSelected = ref(false);
const isConditionSelected = ref(false);

const showUpload = ref(true);
const files = ref([]);
const gallery = ref(-1);

// 监听图片数量变化
watch(files, (newFiles) => {
    if (newFiles.length > 5) {
        showUpload.value = false;
    } else {
        showUpload.value = true;
    }
});

// 获取种类id和地址id
onLoad(async (options) => {
    categoryId.value = options.categoryId
    addressId.value = options.addressId
})

const onNameInput = (e) => {
    name.value = e.detail.value;
}

const onDetailsInput = (e) => {
    details.value = e.detail.value;
}

const onPriceInput = (e) => {
    price.value = Number(e.detail.value);
}

const onQuantityInput = (e) => {
    quantity.value = Number(e.detail.value);
}

const onDeliveryMethodChange = (e) => {
    deliveryMethod.value = e.detail.value;
    isDeliveryMethodSelected.value = true;
};

const onConditionChange = (e) => {
    condition.value = e.detail.value;
    isConditionSelected.value = true;
};

const onUsedYearsInput = (e) => {
    usedYears.value = Number(e.detail.value);
}

const submitForm = async () => {
    const nameParam = name.value
    const detailsParam = details.value
    const priceParam = price.value
    const quantityParam = quantity.value
    const deliveryMethodParam = deliveryMethod.value
    const conditionParam = condition.value
    const usedYearsParam = usedYears.value
    const tempFilePaths = files.value;

    if (!nameParam.trim()) {
        name.value = ''
        uni.showToast({
            title: '请输入商品名称',
            icon: 'none'
        })
        return
    }

    if (!detailsParam.trim()) {
        details.value = ''
        uni.showToast({
            title: '请输入商品详情',
            icon: 'none'
        })
        return
    }

    if (!priceParam) {
        price.value = 0
        uni.showToast({
            title: '请输入商品价格',
            icon: 'none'
        })
        return
    }

    if (!quantityParam) {
        quantity.value = 0
        uni.showToast({
            title: '请输入商品数量',
            icon: 'none'
        })
        return
    }

    if (!deliveryMethodParam) {
        uni.showToast({
            title: '请选择配送方式',
            icon: 'none'
        })
        return
    }

    if (!conditionParam) {
        uni.showToast({
            title: '请选择成色',
            icon: 'none'
        })
        return
    }

    if (!usedYearsParam) {
        usedYears.value = 0
        uni.showToast({
            title: '请输入已用年限',
            icon: 'none'
        })
        return
    }

    // 判断tempFilePaths的长度，如果为0则不上传图片
    if (tempFilePaths.length === 0) {
        uni.showToast({
            title: '请上传图片',
            icon: 'none'
        })
        return
    }

    // 先调用addProductAPI
    let res = await addProductAPI({
        category_id: parseInt(categoryId.value),
        address_id: parseInt(addressId.value),
        name: name.value,
        detail: details.value,
        price: price.value,
        stock: quantity.value,
        delivery: parseInt(deliveryMethod.value),
        condition: parseInt(condition.value),
        used_years: usedYears.value,
        freight: 0,
        status: 0, // 0表示未发布，等图片都上传完再改为1
    })

    if (res.code === 200) {
        const productId = res.data

        // 先上传主图
        let header = {
            'Content-Type': 'application/json'
        }
        // 获取本地token
        if (uni.getStorageSync("token")) {
            header['Cookie'] = 'token=' + uni.getStorageSync("token");
        }

        const tempFilePaths = files.value;
        uni.uploadFile({
            url: 'http://localhost:8080/index/product/mainImage/' + productId,
            filePath: tempFilePaths[0],
            name: 'productMainImage',
            method: 'POST',
            header: header,
            formData: {},
            success: async (res) => {
                const resTemp = JSON.parse(res.data);
                if (resTemp.code == 200) {
                    // 如果tempFilePaths长度大于1，则上传副图
                    if (tempFilePaths.length > 1) {
                        for (let i = 1; i < tempFilePaths.length; i++) {
                            uni.uploadFile({
                                url: 'http://localhost:8080/index/product/image/' + productId,
                                filePath: tempFilePaths[i],
                                name: 'productImage',
                                method: 'POST',
                                header: header,
                                formData: {},
                                success: async (res) => {
                                    const resTemp = JSON.parse(res.data);
                                    console.log(resTemp.code);
                                    if (resTemp.code == 200) {
                                        // 设置商品状态为已发布
                                        await updateProductStatusAPI({
                                            id: productId,
                                            status: 1
                                        })
                                        uni.showToast({
                                            title: '发布成功',
                                            icon: "success",
                                            duration: 1000,
                                        })
                                        setTimeout(() => {
                                            wx.switchTab({
                                                url: '/pages/user/user'
                                            })
                                        }, 500)
                                    } else {
                                        uni.showToast({
                                            title: '发布失败',
                                            icon: "none",
                                            duration: 1000,
                                        })
                                    }
                                }
                            })
                        }
                    } else {
                        // 设置商品状态为已发布
                        await updateProductStatusAPI({
                            id: productId,
                            status: 1
                        })
                        uni.showToast({
                            title: '发布成功',
                            icon: "success",
                            duration: 1000,
                        })
                        setTimeout(() => {
                            wx.switchTab({
                                url: '/pages/user/user'
                            })
                        }, 500)
                    }

                } else {
                    console.log("主图上传失败");
                }
            }
        })


    } else {
        uni.showToast({
            title: '发布失败',
            icon: "none",
            duration: 1000,
        })
    }
}

const chooseImage = () => {
    uni.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
            files.value = [...files.value, res.tempFilePaths[0]];
        }
    });
};

const previewImage = (index) => {
    gallery.value = index;
};

const deleteImg = (index) => {
    files.value.splice(index, 1);
    if (gallery.value === index) {
        gallery.value = -1;
    }
};

const close = () => {
    gallery.value = -1;
};
</script>

<style scoped lang="scss">
@import "./fillInformation.scss";
</style>
