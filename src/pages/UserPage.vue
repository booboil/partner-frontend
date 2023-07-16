<template>
  <template v-if="user">
    <van-cell-group inset>
      <van-cell to="/user/update">
        <van-card
            :desc="user.profile"
            :thumb="user.avatarUrl"
            :title="user?.username"
        >

          <template #tags>
            <van-tag v-for="tag in user.tags" plain style="margin-right: 8px;margin-top: 8px" type="danger">{{
                tag
              }}
            </van-tag>
          </template>
        </van-card>
      </van-cell>
      <van-divider/>

      <van-cell :value="user.planetCode" center title="编号">
        <template #icon>
          <van-icon name="manager-o" size="18"/>
        </template>
      </van-cell>
      <van-divider/>
      <van-cell center is-link title="我创建的队伍" to="/user/team/create">
        <template #icon>
          <van-icon name="cluster-o" size="18"/>
        </template>
      </van-cell>
      <van-divider/>
      <van-cell center is-link title="我加入的队伍" to="/user/team/join">
        <template #icon>
          <van-icon name="friends-o" size="18"/>
        </template>
      </van-cell>

      <van-divider/>

      <van-cell :value="moment(user.createTime).format('lll')" center title="注册时间">
        <template #icon>
          <van-icon name="clock-o" size="18"/>
        </template>
      </van-cell>
      <van-divider/>
      <van-cell center title="退出登录" @click="quit">
        <template #icon>
          <van-icon name="close" size="18"/>
        </template>
      </van-cell>
    </van-cell-group>
  </template>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import moment from "moment";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
// const user = {
//
//   id: 1,
//   username: 'niuma',
//   userAccount: '123',
//   avatarUrl: 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/359/morentoux.png',
//   gender: '男',
//   phone: '123123',
//   email: '123123123@qwqe.com',
//   planetCode: '123',
//   createTime: new Date(),
// }

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
  if (user.value.tags) {
    user.value.tags = JSON.parse(user.value.tags);
  }
})

const router = useRouter();

const quit = async () => {
  const res = await myAxios.post("/user/logout");
  if (res.code === 0) {
    Toast.success("退出成功");
    router.push({
      path: '/user/login',
    })
  }
}

</script>

<style scoped>
:root {
  --van-card-font-size: 10px;
}
</style>
