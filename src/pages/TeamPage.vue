<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="请输入搜索关键词" @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab name="public" title="公开">
        <template #title>
          <van-icon name="smile-o" size="16px"/>
          公开
        </template>
      </van-tab>
      <van-tab name="secret" title="加密">
        <template #title>
          <van-icon name="lock" size="16px"/>
          加密
        </template>
      </van-tab>
    </van-tabs>
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="!teamList||teamList.length<1" description="数据为空" image="search"/>
    <van-button class="add-button" icon="plus" type="primary" @click="toAddTeam"></van-button>
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";

const router = useRouter();

const searchText = ref('');
const active = ref('public');

const onTabChange = (name) => {
  if (name === 'public') {
    listTeam(searchText.value, 0)
  } else {
    listTeam(searchText.value, 2)

  }
}


// 跳转到加入队伍页
const toAddTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([]);

const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      status: status
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    teamList.value = null;
    Toast.fail(res?.description);
  }
}

// 页面加载时只触发一次
onMounted(
    listTeam()
)


const onSearch = (val) => {
  listTeam(val);
}

</script>

<style scoped>
#teamPage {

}
</style>
