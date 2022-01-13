import { Col, List, Row } from "antd";
import React from "react";
import { TodoDB } from "../../shared/Types";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: TodoDB[];
  onChange: (checked: boolean, todo: TodoDB) => void;
  onDelete: (todo: TodoDB) => void;
};

export const TodoList = (props: TodoListProps) => {
  return (
    <Row>
      <Col offset={8} span={8}>
        <List
          locale={{ emptyText: "Everything is done, go have fun" }}
          dataSource={props.todos}
          renderItem={(item) => (
            <TodoItem
              key={item.id}
              todo={item}
              onChange={props.onChange}
              onDelete={props.onDelete}
            />
          )}
        ></List>
      </Col>
    </Row>
  );
};
