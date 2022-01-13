import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { Filter, Todo, TodoDB } from "../../shared/Types";
import sampleData from "../../database/todoDB.json";
import { TodoList } from "../todo/TodoList";
import { FilterBar } from "../filter/FilterBar";
import { Button, Col, Divider, Row } from "antd";
import { TodoCreate } from "../todo/TodoCreate";

export const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoDB[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<TodoDB[]>(todos);
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [filterValue, setFilterValue] = useState<Filter>({
    text: "",
    status: "All",
  });

  useEffect(() => {
    getAllTodos();
  }, []);

  const modifyTodos = (todos: TodoDB[]) => {
    setTodos(todos);
    filterTodos(filterValue, todos);
  };

  const filterTodos = (filter: Filter, todoList: TodoDB[]) => {
    let toShow: TodoDB[] = [];
    console.log("filterValue", todos);

    switch (filter.status) {
      case "Done":
        toShow = todoList.filter((item) => item.done);
        break;
      case "NotDone":
        toShow = todoList.filter((item) => !item.done);
        break;
      case "All":
      default:
        toShow = todoList;
    }

    toShow = toShow.filter((item) => item.text.includes(filter.text));

    setFilteredTodos(toShow);
  };

  const getAllTodos = () => {
    // GET all todos from server here
    const todoList: TodoDB[] = sampleData.todos;
    modifyTodos(todoList);
  };

  const onChangeStatus = (checked: boolean, todo: TodoDB) => {
    // PUT change of todo to server here
    todo = { ...todo, done: checked };

    const index = todos.findIndex((item) => item.id === todo.id);
    todos[index] = todo;
    modifyTodos([...todos]);
  };

  const onDeleteItem = (todo: TodoDB) => {
    // DELETE todo from server here
    const filteredTodos = todos.filter((item) => item.id !== todo.id);
    modifyTodos(filteredTodos);
  };

  const createNewTodo = () => {
    // CREATE new todo and send to server here
    const newTodo: Todo = {
      text: newTodoText,
      done: false,
    };

    // Generate a new id (which should be done on the server)
    const id = todos[todos.length - 1].id + 1;
    const newTodoDB: TodoDB = { ...newTodo, id };
    modifyTodos([...todos, newTodoDB]);
    handleCancel();
  };

  const onStatusFilter = (value: string) => {
    const newFilter = { ...filterValue, status: value };
    setFilterValue(newFilter);
    filterTodos(newFilter, todos);
  };

  const onTextFilter = (value: string) => {
    const newFilter = { ...filterValue, text: value };
    setFilterValue(newFilter);
    filterTodos(newFilter, todos);
  };

  const handleCancel = () => {
    setNewTodoText("");
    setIsModalVisible(false);
  };

  const onNewTodoTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewTodoText(event.target.value);
  };

  return (
    <>
      <Title> TODO list</Title>
      <Row justify="center" align="middle">
        <Col>
          <Button
            type="primary"
            title="New Todo"
            onClick={() => setIsModalVisible(true)}
          >
            New Todo
          </Button>
        </Col>
        <Divider type="vertical" />
        <Col>
          <FilterBar
            filterValue={filterValue.status}
            onStatusFilter={(value: string) => {
              onStatusFilter(value);
            }}
            onTextFilter={onTextFilter}
          ></FilterBar>
        </Col>
      </Row>
      <TodoList
        todos={filteredTodos}
        onChange={onChangeStatus}
        onDelete={onDeleteItem}
      ></TodoList>
      <TodoCreate
        show={isModalVisible}
        text={newTodoText}
        onOk={createNewTodo}
        onCancel={handleCancel}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          onNewTodoTextChange(event)
        }
      ></TodoCreate>
    </>
  );
};
