import { Button, Col, Row, Switch } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { TodoDB } from "../../shared/Types";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";

type TodoItemProps = {
  todo: TodoDB;
  onChange: (checked: boolean, todo: TodoDB) => void;
  onDelete: (todo: TodoDB) => void;
};

export const TodoItem = (props: TodoItemProps) => {
  return (
    <Row align="middle">
      <Col span={6}>
        <Switch
          checked={props.todo.done}
          checkedChildren={<CheckOutlined />}
          onChange={(checked: boolean) => props.onChange(checked, props.todo)}
        ></Switch>
      </Col>
      <Col span={16} style={{ textAlign: "left" }}>
        <Title level={3}>{props.todo.text}</Title>
      </Col>
      <Col span={2}>
        <Button
          danger
          onClick={() => props.onDelete(props.todo)}
          icon={<DeleteOutlined />}
        ></Button>
      </Col>
    </Row>
  );
};
