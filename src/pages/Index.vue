<template>

  <div>
    <van-cell center title="智能匹配">
      <template #icon>
        <van-icon color="#323233" name="friends" size="20px"/>
      </template>
      <template #right-icon>
        <van-switch v-model="isMatchMode" size="24"/>
      </template>
    </van-cell>

    <user-card-list :loading="loading" :user-list="userList"></user-card-list>
    <van-button round type="primary" block style="margin: 10px 0" @click="loadMore">加载更多</van-button>
  </div>

  <van-empty v-if="!userList||userList.length<1" description="数据为空" image="search"/>

</template>

<script lang="ts" setup>
import {ref, watchEffect} from 'vue';
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import UserCardList from "../components/UserCardList.vue";

type ModeType = "default" | "match";

const router = useRouter();
const route = useRoute();
const isMatchMode = ref<boolean>(false);
const {tags} = route.query;
const pageSize = ref(8);
const pageNum = ref(1);

const userList = ref();
const loading = ref(true);

const loadData = async () => {
  let userListData;
  loading.value = true;
  //心动模式，根据标签推荐
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    }).then(res => {
      console.log("/user/match success" + res);
      // console.log(res.data)
      return res.data;
    }).catch(rea => {
      console.log("/user/match error" + rea);
    })
    //普通模式，直接分页查询
  } else {
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: pageSize.value,
        pageNum: pageNum.value
      },
    }).then(res => {
      console.log("/user/recommend success" + res);
      // console.log(res.data)
      return res.data.records;
    }).catch(rea => {
      console.log("/user/recommend error" + rea);
    })
  }

  if (userListData) {
    userListData.forEach((user: { tags: string; }) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

watchEffect(() => {
  loadData();
})
const loadMore = async ()=>{
  pageSize.value += pageSize.value ;
}

</script>

<style scoped>

</style>
