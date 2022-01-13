import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

type ModalProps = {
  show: boolean;
  text: string;
  onCancel: () => void;
  onOk: () => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TodoCreate = (props: ModalProps) => {
  return (
    <Modal
      title="Create new todo"
      visible={props.show}
      onOk={props.onOk}
      onCancel={props.onCancel}
    >
      <TextArea
        placeholder="Todo text"
        allowClear
        autoSize
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          props.onChange(event)
        }
        value={props.text}
      ></TextArea>
    </Modal>
  );
};
