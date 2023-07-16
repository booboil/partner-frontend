<template>

  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" to="/search"/>
    </template>
  </van-nav-bar>


  <div id="content">
    <router-view/>
  </div>
  <van-tabbar route>
    <van-tabbar-item icon="home-o" name="index" to="/">主页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team" to="/team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user" to="/user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import routes from "../config/route";

const router = useRouter();
const DEFAULT_TITLE = '伙伴匹配';
const title = ref(DEFAULT_TITLE);

router.beforeEach((to, form) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return route.path == toPath;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})

const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push('/search');
}
const active = ref("index");


</script>

<style scoped>
#content {
  padding-bottom: 50px;
}

</style>
