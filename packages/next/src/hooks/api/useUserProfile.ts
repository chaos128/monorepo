import axios from "axios";
import {IUserProfile} from "ns-ts-interfaces";
import { useQuery } from "react-query";
import { useLogin } from "../useLogin";

async function getUserProfile() {
  const { data } = await axios.get<IUserProfile>('/user/profile');

  return data;
}

function generateProfileFetchKey(accessToken: string) {
  return ["profileFetchKey", accessToken];
};

function useUserProfile() {
  const {accessToken} = useLogin();
  const key = generateProfileFetchKey(accessToken);
  const { data, isLoading, isSuccess, isError } = useQuery(key, () => {
    return getUserProfile();
  });

  return {
    userProfile: data ? data : null,
    isLoading,
    isSuccess,
    isError,
  };
};

export {
  getUserProfile,
  generateProfileFetchKey,
  useUserProfile,
}