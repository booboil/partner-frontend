// 定义一些路由
import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import TeamDetailPage from "../pages/TeamDetailPage.vue";
import UserPage from "../pages/UserPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import SearchPage from "../pages/SearchPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import UserTagsEditPage from "../pages/UserTagsEditPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import UserRegisterPage from "../pages/UserRegisterPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";


const routes = [
    {path: '/', component: Index},
    {path: '/team', title: '找队伍', component: Team},
    {path: '/team/detail', title: '队伍详情', component: TeamDetailPage},
    {path: '/team/add', title: '创建队伍', component: TeamAddPage},
    {path: '/team/update', title: '更新队伍', component: TeamUpdatePage},
    {path: '/user', title: '用户信息', component: UserPage},
    {path: '/search', title: '搜索伙伴', component: SearchPage},
    {path: '/user/list', title: '用户列表', component: SearchResultPage},
    {path: '/user/edit', title: '更新信息', component: UserEditPage},
    {path: '/user/editTags', title: '更新信息', component: UserTagsEditPage},
    {path: '/user/login', title: '登录', component: UserLoginPage},
    {path: '/user/register', title: '注册', component: UserRegisterPage},
    {path: '/user/update', title: '当前信息', component: UserUpdatePage},
    {path: '/user/team/join', title: '我加入的队伍', component: UserTeamJoinPage},
    {path: '/user/team/create', title: '我创建的队伍', component: UserTeamCreatePage},
]

export default routes;
