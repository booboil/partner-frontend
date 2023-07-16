import myAxios from "../plugins/myAxios";

export const getCurrentUser = async () => {
    // const currentUser = getCurrentUserState();
    // if(currentUser){
    //     return currentUser
    // }
    const res = await myAxios.get("/user/current");
    // @ts-ignore
    if (res.code === 0) {
        // setCurrentUserState(res.data);
        return res.data;
    }
    return null;

}
