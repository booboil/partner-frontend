<template>
  <user-card-list :loading="false" :user-list="userList"></user-card-list>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";

const router = useRouter();
const route = useRoute();

const {tags} = route.query;
// const mockUser = {
//   id: 12131,
//   username: 'aaa',
//   userAccount: '123daf',
//   avatarUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
//   gender: 1,
//   phone: '12312312311',
//   profile:'大大大苏打方法祈福祈福发改为让各位给违规给微软个晚饭祈福祈福改为如果个体户我',
//   email: '132313@qeeq.com',
//   userRole: 1,
//   planetCode: '123124',
//   tags: ['java','c','c++','java','c','c++'],
//   createTime: new Date(),
// }

const userList = ref();


onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  }).then(res => {
    console.log("/user/search/tags success" + res);
    // console.log(res.data)
    return res.data;
  }).catch(rea => {
    console.log("/user/search/tags error" + rea);
  })
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})

</script>

<style scoped>

</style>
