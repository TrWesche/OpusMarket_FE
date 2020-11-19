import UserLoginFrom from "../components/User/UserLoginForm";
import NewUserForm from "../components/User/NewUserForm";
import UserProfile from "../components/User/UserProfile";
import UpdateUserForm from "../components/User/UpdateUserForm";
import UpdateUserPasswordForm from "../components/User/UpdateUserPasswordForm";

import {
    USER_ACCOUNT_LOGIN_PATH, 
    USER_ACCOUNT_NEW_PATH, 
    USER_ACCOUNT_PROFILE_PATH, 
    USER_ACCOUNT_UPDATE_PROFILE_PATH, 
    USER_ACCOUNT_UPDATE_PASSWORD_PATH  } from './_pathDict';

const UserAccountRoutes = [
    {
        'component': UserLoginFrom,
        'path': USER_ACCOUNT_LOGIN_PATH,
        'exact': true
    },
    {
        'component': NewUserForm,
        'path': USER_ACCOUNT_NEW_PATH,
        'exact': true
    },
    {
        'component': UserProfile,
        'path': USER_ACCOUNT_PROFILE_PATH,
        'exact': true
    },
    {
        'component': UpdateUserForm,
        'path': USER_ACCOUNT_UPDATE_PROFILE_PATH,
        'exact': true
    },
    {
        'component': UpdateUserPasswordForm,
        'path': USER_ACCOUNT_UPDATE_PASSWORD_PATH,
        'exact': true
    }
];

export default UserAccountRoutes;