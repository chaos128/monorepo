import React, { useEffect, useState } from "react";
import NsImage from "../shared/ns-image";
import StarRating from "../StarRating";
import Heading from "../UI/Heading";
import { Close } from "../UI/Icon";
import Modal, { ModalBody, ModalHeader } from "../UI/Modal";
import Text from "../UI/Text";
import { IReviewData } from "./NosearchPick.types";

interface IMobileReviewModal {
  clickedReviewModal: boolean;
  clickedReview: IReviewData;
  onResetReviewModal: () => void;
}

const MobileReviewModal = (props: IMobileReviewModal) => {
  const { clickedReviewModal, clickedReview, onResetReviewModal } = props;

  const [reviewType, setReviewType] = useState<string>("store");
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (
      clickedReview &&
      clickedReview?.point &&
      clickedReview?.writer &&
      clickedReview?.createdAt
    )
      setReviewType("store");
    else setReviewType("crawling");
  }, [clickedReview]);

  const onOpenModal = () => {
    if (!clickedReviewModal) return;
    setModalVisible(true);
    onResetReviewModal();
  };

  const onCloseModal = () => {
    close();
  };

  useEffect(() => {
    onOpenModal();
  }, [clickedReviewModal]);

  if (!clickedReview) return null;

  return (
    <div>
      <Modal
        drawer
        drawerDirection="bottom"
        visible={modalVisible}
        onClose={closeModal}
      >
        <ModalHeader>
          <div className="p-[1rem] pb-0 flex justify-between items-center">
            <Heading level={5} className="text-gray-10">
              구매후기
            </Heading>
            <div
              className=" cursor-pointer"
              onClick={() => {
                closeModal();
              }}
            >
              <Close size={20} />
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="p-[1rem] pt-0 ">
            {clickedReview.images &&
              clickedReview.images?.length > 0 &&
              clickedReview.images?.map((image, index) => {
                return (
                  <div
                    key={`reviewImage_${index}`}
                    className="mb-[1.6rem] text-center"
                  >
                    <NsImage
                      imageUrl={image}
                      className="w-full h-full rounded-[10px]"
                    />
                  </div>
                );
              })}

            {reviewType === "store" && (
              <div className="flex justify-between items-center mb-[1.6rem]">
                <div className="flex items-center">
                  <StarRating
                    rating={clickedReview?.point ? clickedReview?.point : 0}
                    styleFor={{
                      size: 1.6,
                      starColor: "#FF9900",
                    }}
                  />
                  <div className="w-[1px] h-[1rem] bg-gray-3 mx-[0.6rem]"></div>
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
              <Text type="D3" className="text-gray-6 mt-[1.6rem]">
                {clickedReview.createdAt &&
                  clickedReview.createdAt.substring(0, 10).replace(/-/g, ".")}
              </Text>
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MobileReviewModal;
