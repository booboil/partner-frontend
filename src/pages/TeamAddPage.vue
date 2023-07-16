<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-row justify="center">
          <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1"/>
        </van-row>
        <van-field
            v-model="addTeamData.name"
            :rules="[{ required: true, message: '请输入队伍名' }]"
            label="队伍名"
            name="name"
            placeholder="请输入队伍名"
        />
        <van-field
            v-model="addTeamData.description"
            autosize
            label="队伍描述"
            placeholder="请输入队伍描述"
            rows="4"
            type="textarea"
        />
        <van-field
            :placeholder="addTeamData.expireTime ? moment(addTeamData.expireTime).format('lll') :'点击选择过期时间'"
            is-link
            label="过期时间"
            name="datetimePicker"
            readonly
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-datetime-picker
              v-model="addTeamData.expireTime"
              :min-date="minDate"
              title="请选择过期时间"
              type="datetime"
              @confirm="showPicker = false"
          />
        </van-popup>
        <van-field label="最大人数" name="stepper">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>
        <van-field label="队伍状态" name="radio">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            :rules="[{ required: true, message: '请填写密码' }]"
            label="密码"
            name="password"
            placeholder="请输入队伍密码"
            type="password"
        />
      </van-cell-group>

      <div style="margin: 16px;">
        <van-button block native-type="submit" round type="primary">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import moment from "moment";

const router = useRouter();
// 展示日期选择器
const showPicker = ref(false);

const fileList = ref([]);
const avatarUrl = ref('');
const avatar = ref();

const initFormData = {
  "name": "",
  "description": "",
  "expireTime": null,
  "maxNum": 3,
  "password": "",
  "status": 0,
}

const minDate = new Date();

// 需要用户填写的表单数据
const addTeamData = ref({...initFormData})

const afterRead = async (file) => {
  // console.log(file.file);

  const fileFile = file.file;
  avatar.value = fileFile;
  // 此时可以自行将文件上传至服务器
  // console.log(res);
};

// 提交
const onSubmit = async () => {

  Toast.loading("创建队伍中");
  if (avatar.value != null) {
    const uploadRes = await myAxios.post("/fileOss/upload", {
      'file': avatar.value
    }, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
    avatarUrl.value = uploadRes.data;
  }


  const postData = {
    ...addTeamData.value,
    avatarUrl: avatarUrl.value,
    status: Number(addTeamData.value.status)
  }
  // todo 前端参数校验
  const res = await myAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data) {
    Toast.success('添加成功');
    router.push({
      path: '/team',
      replace: true,
    });
  } else {
    Toast.success('添加失败');
  }
}
</script>

<style scoped>
#teamPage {

}
</style>
