"use client";

import React, { useCallback, useEffect, useState } from "react";
import {IoMdClose} from "react-icons/io";
import Button from "../Button";

interface ModalInterface {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalInterface> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return;
  }

  return (
    <>
      <div
        className={`flex justify-center items-center inset-0 z-50 outline-none overflow-x-hidden overflow-y-auto focus:outline-none bg-neutral-800/70 fixed`}
      >
        <div className={`relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto`}>
            {/* {content} */}
            <div className={`translate duration-300 h-full ${showModal? 'translate-y-0':'translate-y-full'} ${showModal? 'opacity-100':'opacity-0'}`}>
                <div className={`translate flex flex-col h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative bg-white w-full outline-none focus:outline-none`}>
                    {/* {header} */}
                    <div className={`flex items-center justify-center relative border-b-[1px] rounded-t p-6`}>
                        <button onClick={handleClose} className={`p-1 right-9 transition absolute border-0 hover:opacity-70`}>
                           <IoMdClose size={20}/>
                        </button>
                        <div className={`text-lg font-semibold`}> 
                            {title}
                        </div>
                    </div>
                    {/* {body} */}
                    <div className="relative p-6 flex-auto">
                        {body}
                    </div>
                    {/* {footer} */}
                    <div className="flex p-6 flex-col gap-2">
                        <div className="flex flex-row gap-4 w-full items-center">
                            {secondaryAction && secondaryActionLabel && (
                                <Button outline disabled={disabled} onClick={handleSecondaryAction} label={secondaryActionLabel}/>
                            )}
                          <Button disabled={disabled} onClick={handleSubmit} label={actionLabel}/>
                        </div>
                        {footer}
                    </div>
                </div>

            </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
