import { Stack } from "@chakra-ui/react";
import TodoListItem from "./TodoItem";
import { TodoItem } from "../App";

interface TodoListProps {
  todoList: TodoItem[];
  onEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const TodoList = ({ todoList, onEdit }: TodoListProps) => {
  return (
    <>
      {todoList.map((todoListItem) => (
        <TodoListItem
          todoListItem={todoListItem}
          key={todoListItem.id}
          onEdit={onEdit}
        />
      ))}
    </>
  );
};

export default TodoList;
