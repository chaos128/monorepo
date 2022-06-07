import { useAtomValue } from "jotai/utils";
import { useEffect, useState } from "react";
import {
  clickedReviewAtom,
  clickedReviewModalAtom,
  useMobileReivews,
} from "./mobileReivewHooks";

const NosearchMobileReview = () => {
  // const { open, close } = useModal();
  const clickedReviewModal = useAtomValue(clickedReviewModalAtom);
  const clickedReview = useAtomValue(clickedReviewAtom);
  const { onResetReviewModal } = useMobileReivews();
  const [reviewType, setReviewType] = useState<string>("store");

  useEffect(() => {
    if (
      clickedReview.point &&
      clickedReview.writer &&
      clickedReview.createdAt
    ) {
      setReviewType("store");
    } else {
      setReviewType("crawling");
    }
  }, [clickedReview]);

  const onOpenModal = () => {
    if (!clickedReviewModal) {
      return;
    }
    open();
    onResetReviewModal();
  };

  const onCloseModal = () => {
    close();
  };

  useEffect(() => {
    onOpenModal();
  }, [clickedReviewModal]);

  return (
    <div>
      {/* <Modal drawer drawerDirection="bottom">
        <ModalHeader>
          <div className="flex items-center justify-between p-[1rem] pb-0">
            <Heading level={5} className="text-gray-10">
              구매후기
            </Heading>
            <div
              onClick={() => {
                onCloseModal();
              }}
            >
              <Image
                src="/static/images/close.png"
                width={24}
                height={24}
                alt="구매후기 닫기"
              />
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="p-[1rem] pt-0 ">
            {clickedReview.images?.map((image, index) => {
              return (
                <div
                  key={`reviewImage_${index}`}
                  className="mb-[1.6rem] text-center"
                >
                  <Image
                    src={image}
                    alt={`후기 이미지 ${index}`}
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="cover"
                    className="rounded-[10px]"
                  />
                </div>
              );
            })}

            {reviewType === "store" && (
              <div className="mb-[1.6rem] flex items-center justify-between">
                <div className="flex items-center">
                  <StarRating
                    rating={clickedReview.point ? clickedReview.point : 0}
                    styleFor={{
                      size: 1.6,
                      starColor: "#FF9900",
                    }}
                  />
                  <div className="mx-[0.6rem] h-[1rem] w-[1px] bg-gray-3"></div>
                  <Text type="B9" className="text-gray-10">
                    {clickedReview.writer}
                  </Text>
                </div>
                <Text type="D3" className="text-gray-6">
                  {clickedReview.createdAt &&
                    clickedReview.createdAt.substring(0, 10).replace(/-/g, ".")}
                </Text>
              </div>
            )}

            <p
              className="text-body-7 text-gray-10"
              dangerouslySetInnerHTML={{
                __html: clickedReview.content,
              }}
              aria-label="리뷰"
            />

            {reviewType === "crawling" && (
              <Text type="D3" className="mt-[1.6rem] text-gray-6">
                {clickedReview.createdAt &&
                  clickedReview.createdAt.substring(0, 10).replace(/-/g, ".")}
              </Text>
            )}
          </div>
        </ModalBody>
      </Modal> */}
    </div>
  );
};

export default NosearchMobileReview;
