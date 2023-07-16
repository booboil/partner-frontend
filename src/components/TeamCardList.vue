<template>
  <div
      id="teamCardList"
  >
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        :thumb=" team.avatarUrl===null || team.avatarUrl === ''  ? teamImgs[Math.round(Math.random()*4)] : team.avatarUrl"
        :title="`${team.name}`"
    >
      <template #tags>
        <van-tag plain style="margin-right: 8px; margin-top: 8px" type="danger">
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
        <van-tag plain style="margin-right: 8px; margin-top: 8px" type="warning">
          队长：{{ team.createUser.planetCode }}-{{ team.createUser.username }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数: ${team.hasJoinNum} / ${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + moment(team.expireTime).format('lll') }}
        </div>
        <div>
          {{ '创建时间: ' + moment(team.createTime).format('lll') }}
        </div>
      </template>
      <template #footer>
        <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin" plain size="small" type="primary"
                    @click="preJoinTeam(team)">加入队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" plain size="small"
                    @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <van-button plain size="small"
                    @click="doTeamDetail(team.id)">查看队伍
        </van-button>
      </template>
    </van-card>
  </div>
  <van-dialog v-model:show="showPasswordDialog" show-cancel-button title="请输入密码" @cancel="doJoinCancel"
              @confirm="doJoinTeam">
    <van-field v-model="password" placeholder="请输入密码" type="password"/>
  </van-dialog>
</template>

<script lang="ts" setup>
import {TeamType} from "../model/team";
import {teamStatusEnum} from "../constants/team";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import {useRouter} from "vue-router";
import teamImgs from "../services/teamImg";
import moment from "moment";


interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});

const currentUser = ref();
const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref();
const router = useRouter();
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})


const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}


const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res?.code === 0) {
    Toast.success('加入成功');
    doJoinCancel();
    window.location.reload();
  } else {
    Toast.fail('加入失败' + (res.description ? `，${res.description}` : ''));
    doJoinCancel();
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

/**
 * 跳转至队伍详情页
 * @param id
 */
const doTeamDetail = (id: number) => {
  router.push({
    path: '/team/detail',
    query: {
      id,
    }
  })
}


</script>


<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>
