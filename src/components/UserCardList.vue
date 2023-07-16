<template>
  <div>
    <van-skeleton v-for="user in userList" :loading="props.loading" :row="3" avatar title
    >
      <van-card
          v-if="user.tags?.length !== Number(0)"
          :desc=user.profile
          :thumb=user.avatarUrl
          :title="`${user.username}`"
      >
        <template #tags>
          <van-tag v-for="tag in user.tags" plain style="margin-right: 8px;margin-top: 8px" type="danger">{{
              tag
            }}
          </van-tag>
        </template>
        <template #footer>

          <van-button size="mini" @click="showUserDetail(user)">联系我</van-button>
        </template>
      </van-card>
      <van-empty v-if="!userList||userList.length<1" description="数据为空" image="search"/>
    </van-skeleton>
    <van-popup v-model:show="show">

      <van-image :src="clickUser.avatarUrl"/>
      <van-divider/>
      <van-cell :value="clickUser.planetCode" center title="伙伴编号:"/>

      <van-cell :value="clickUser.profile" center title="伙伴简介:"/>
      <van-cell :value="popupText" center/>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {UserType} from "../model/user";

interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}

const show = ref(false);
const popupText = ref('暂无联系方式');
const clickUser = ref<UserType>();

onMounted(() => {
  const userList = props.userList;
  if (userList) {
    userList.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
  }
})

const showUserDetail = (user: UserType) => {
  clickUser.value = user;
  if (user.contactInfo) {
    popupText.value = '联系方式：' + user.contactInfo;
  } else {
    popupText.value = '暂无联系方式';
  }
  show.value = true;
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  userList: [] as UserType[],
});
</script>

<style scoped>

</style>
