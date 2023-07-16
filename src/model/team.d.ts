import {UserType} from "./user";

/**
 * 队伍类别
 */
export type TeamType = {
    id: number;
    name: string;
    description: string;
    avatarUrl: string;
    expireTime?: Date;
    maxNum: number;
    password?: string,
    userId: number,
    // todo 定义枚举值类型，更规范
    status: number;
    hasJoinNum?: number;
    hasJoin?: boolean;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;

};
