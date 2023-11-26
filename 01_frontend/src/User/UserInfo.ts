interface UserInfo {
    id: string | undefined;
    username: string | undefined;
    email: string | undefined;
};

export function createUser(userInfo: UserInfo) {
    const newUser = {
        id: userInfo.id,
        username: userInfo.username,
        email: userInfo.email
    };

    return newUser;
};