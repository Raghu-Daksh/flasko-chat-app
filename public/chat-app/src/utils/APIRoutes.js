export const host = process.env.REACT_APP_BASE_URL

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/avatar`;
export const allUserRoute = `${host}/api/auth/allusers`;
export const sendMessageRouter = `${host}/api/message/addmsg`;
export const getAllMessageRoute = `${host}/api/message/getmsg`;
