<template>
  <van-form @submit="onSubmit">
    <van-field
        v-if="isShow"
        v-model="editUser.currentValue"
        :label="editUser.editName"
        :name="editUser.editKey"
        :placeholder="`请输入${editUser.editName}`"
    />
    <van-row v-if="editUser.editName==='头像'" justify="center">
      <van-cell center title="头像">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #value>
          <van-uploader v-model="fileList" :after-read="afterRead" max-count="1" multiple/>
        </template>
      </van-cell>

    </van-row>

    <div style="margin: 16px;">
      <van-button block native-type="submit" round type="primary">
        修改
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";

const router = useRouter();
const route = useRoute();
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName
})
const isShow = ref(true);

const fileList = ref([
  {url: editUser.value.currentValue, isImage: true},
]);

onMounted(async () => {
  if (editUser.value.editName === '头像') {
    isShow.value = false;
  }
});

const afterRead = async (file) => {
  // console.log(file.file);

  const fileFile = file.file
  const res = await myAxios.post("/fileOss/upload", {
    'file': fileFile
  }, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
  editUser.value.currentValue = res.data;
  // 此时可以自行将文件上传至服务器
  // console.log(res);
  // console.log(editUser.value.currentValue);
};


const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    Toast.fail("用户未登录")
    return;
  }
  const res = await myAxios.post("/user/update", {
    'id': currentUser.id,
    [editUser.value.editKey as string]: editUser.value.currentValue,
  })
  if (res.code === 0 && res.data > 0) {
    Toast.success("修改成功！");
    router.back();
  } else {
    Toast.fail("更新失败！");
    Toast.fail(res.description);
  }
};
</script>

<style scoped>

</style>
