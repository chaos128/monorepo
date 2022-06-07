import axios from 'axios';
import { useMutation } from 'react-query';

function useAdminManage() {
  const saveBannerMutation = useMutation(
    (isRollback?: boolean) => putBannerSaveApi(isRollback),
    {
      // 아래 로직을 사용하는 요청이 3개 이상으로 늘어나면 함수를 분리합니다.
      onSuccess: (message, isRollback) => {
        let alertMsg = isRollback ? `되돌렸습니다!` : `저장했습니다!`;
        if (message !== 'success') {
          alertMsg = message;
        }
        alert(alertMsg);
      },
      onError: () => {
        alert('실패했습니다!');
      },
    },
  );

  const savePickMutation = useMutation(
    (isRollback?: boolean) => putStorePickSaveApi(isRollback),
    {
      onSuccess: (message, isRollback) => {
        let alertMsg = isRollback ? `되돌렸습니다!` : `저장했습니다!`;
        if (message !== 'success') {
          alertMsg = message;
        }
        alert(alertMsg);
      },
      onError: () => {
        alert('실패했습니다!');
      },
    },
  );

  const saveManageTargetEventMutation = useMutation(
    (isRollback?: boolean) => putEventApi(isRollback),
    {
      onSuccess: (message, isRollback) => {
        let alertMsg = isRollback ? `되돌렸습니다!` : `저장했습니다!`;
        if (message !== 'success') {
          alertMsg = message;
        }
        alert(alertMsg);
      },
      onError: () => {
        alert('실패했습니다!');
      },
    },
  );

  const saveNoseacrhDealMutation = useMutation(
    (isRollback?: boolean) => putNosearchDealApi(isRollback),
    {
      onSuccess: (message, isRollback) => {
        let alertMsg = isRollback ? `되돌렸습니다!` : `저장했습니다!`;
        if (message !== 'success') {
          alertMsg = message;
        }
        alert(alertMsg);
      },
      onError: () => {
        alert('실패했습니다!');
      },
    },
  );

  const saveNosearchDealPopupMutation = useMutation(
    (isRollback?: boolean) => putNosearchDealPopupApi(isRollback),
    {
      onSuccess: (message, isRollback) => {
        let alertMsg = isRollback ? `되돌렸습니다!` : `저장했습니다!`;
        if (message !== 'success') {
          alertMsg = message;
        }
        alert(alertMsg);
      },
      onError: () => {
        alert('실패했습니다!');
      },
    },
  );

  const saveEmailContentMutation = useMutation(
    (isRollback?: boolean) => putMailSenderContentApi(isRollback),
    {
      onSuccess: (message, isRollback) => {
        let alertMsg = isRollback ? `되돌렸습니다!` : `저장했습니다!`;
        if (message !== 'success') {
          alertMsg = message;
        }
        alert(alertMsg);
      },
      onError: () => {
        alert('실패했습니다!');
      },
    },
  );

  const saveExhibitionsMutation = useMutation(
    (isRollback?: boolean) => putExhibitions(isRollback),
    {
      onSuccess: (message, isRollback) => {
        let alertMsg = isRollback ? `되돌렸습니다!` : `저장했습니다!`;
        if (message !== 'success') {
          alertMsg = message;
        }
        alert(alertMsg);
      },
      onError: () => {
        alert('실패했습니다!');
      },
    },
  );

  return {
    saveBanner: saveBannerMutation.mutateAsync,
    savePick: savePickMutation.mutateAsync,
    saveEvent: saveManageTargetEventMutation.mutateAsync,
    saveNosearchDeal: saveNoseacrhDealMutation.mutateAsync,
    saveNosearchDealPopup: saveNosearchDealPopupMutation.mutateAsync,
    saveEmailContent: saveEmailContentMutation.mutateAsync,
    saveExhibitons: saveExhibitionsMutation.mutateAsync,
    isLoading:
      savePickMutation.isLoading ||
      saveBannerMutation.isLoading ||
      saveManageTargetEventMutation.isLoading ||
      saveNoseacrhDealMutation.isLoading ||
      saveNosearchDealPopupMutation.isLoading ||
      saveEmailContentMutation.isLoading ||
      saveExhibitionsMutation.isLoading,
  };
}

export {
  useAdminManage
}

async function putBannerSaveApi(isRollback?: boolean) {
  const { data } = await axios.put(`/banners${isRollback ? `/rollback` : ''}`);
  return data;
}

async function putEventApi(isRollback?: boolean) {
  const { data } = await axios.put(`/events${isRollback ? `/rollback` : ''}`);
  return data;
}

async function putExhibitions(isRollback?: boolean) {
  const { data } = await axios.put(
    `/exhibitions${isRollback ? '/rollback' : ''}`,
  );
  return data;
}

async function putMailSenderContentApi(isRollback?: boolean) {
  const { data } = await axios.put(
    `/mailSenderContent${isRollback ? '/rollback' : ''}`,
  );
  return data;
}
async function putNosearchDealApi(isRollback?: boolean) {
  const { data } = await axios.put(
    `/nosearchDeal${isRollback ? '/rollback' : ''}`,
  );
  return data;
}

async function putNosearchDealPopupApi(isRollback?: boolean) {
  const { data } = await axios.put(`/popup${isRollback ? '/rollback' : ''}`);
  return data;
}

async function putStorePickSaveApi(isRollback?: boolean) {
  const { data } = await axios.put(
    `/store-admin-picks${isRollback ? `/rollback` : ''}`,
  );
  return data;
}
