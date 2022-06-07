import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { getParamsString } from '../../shared/utils';

export interface IPoseUploadImage {
  path1: string;
  path2?: string;
  path3?: string;
  file?: any;
}
export async function postUploadImage(param: IPoseUploadImage) {
  const { file, ...rest } = param;
  if (!file) {
    return;
  }

  const formedFile = new FormData();
  formedFile.append('file', file);

  const { data } = await axios.post(
    `/uploadImage?${getParamsString({ ...rest, bucket: 'api' })}`,
    formedFile,
    {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    },
  );

  return data;
}
export const defaultUploadParams = {
  path1: 'image_temp',
};
export function useUploadFile(param: IPoseUploadImage = defaultUploadParams) {
  const { data, mutateAsync, isLoading } = useMutation(
    ['useUploadFile'],
    (file: any) => postUploadImage({ ...param, file }),
  );
  return {
    data,
    mutateAsync,
    isLoading,
  };
}
