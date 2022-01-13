import { SearchOutlined } from "@ant-design/icons";
import { Input, Radio, RadioChangeEvent } from "antd";
import React from "react";

type TodoListProps = {
  filterValue: string;
  onStatusFilter: (value: string) => void;
  onTextFilter: (value: string) => void;
};

const options = [
  { label: "All", value: "All" },
  { label: "Done", value: "Done" },
  { label: "Not done", value: "NotDone" },
];

export const FilterBar = (props: TodoListProps) => {
  return (
    <div className="filterbar">
      <Radio.Group
        value={props.filterValue}
        options={options}
        optionType="button"
        onChange={(event: RadioChangeEvent) => {
          props.onStatusFilter(event.target.value);
        }}
      ></Radio.Group>
      <Input
        placeholder="Filter"
        suffix={<SearchOutlined />}
        allowClear
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.onTextFilter(event.target.value)
        }
        style={{ width: 200 }}
      />
    </div>
  );
};
