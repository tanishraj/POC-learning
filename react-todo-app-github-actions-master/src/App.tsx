import { Box, Stack, Text, theme } from "@chakra-ui/react";

import AppHeader from "./components/AppHeader";
import TaskModal from "./components/TaskModal";
import DropDown from "./components/DropDown";
import TodoList from "./components/TodoList";
import AddTask from "./components/ActionButtons/AddTask";
import useToggle from "./hooks/useToggle";
import { useState } from "react";

export type TodoItem = {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
};

const dropDownOptions = [
  { optionName: "all", optionValue: "" },
  { optionName: "completed", optionValue: "completed" },
  { optionName: "pending", optionValue: "pending" },
];

const todoListData: TodoItem[] = [
  {
    id: "1",
    title: "Task 1",
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Task 2",
    status: "completed",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Task 3",
    status: "completed",
    createdAt: new Date(),
  },
];

export const App = () => {
  const [todoList, setTodoList] = useState(todoListData);
  const [filterData, setFilterData] = useState<Array<TodoItem>>(todoList);
  const { isOpen, onOpen, onClose, isEdit } = useToggle();

  const getSelectedOption = (option: React.RefObject<HTMLSelectElement>) => {
    console.log(option?.current?.value);
    if (option?.current?.value !== "") {
      let filter = todoList.filter(
        (item, index) => item.status === option?.current?.value
      );
      setFilterData([...filter]);
    } else {
      setFilterData([...todoList]);
    }
  };

  return (
    <Box margin="20px auto" maxWidth="xl">
      <Stack>
        <AppHeader
          content="Todo App"
          size="2xl"
          textAlign="center"
          color={theme.colors.gray[300]}
          backgroundColor={theme.colors.gray[100]}
          p={3}
        />
        <Stack direction="row" justifyContent="space-between">
          <AddTask onClick={onOpen} id="addTask" />
          <TaskModal isOpen={isOpen} onClose={onClose} isEdit={isEdit} />
          <DropDown
            options={dropDownOptions}
            onOptionChange={getSelectedOption}
          />
        </Stack>
        <Stack
          spacing="4"
          background="gray.100"
          borderRadius="lg"
          p={4}
          display="block"
        >
          {filterData?.length > 0 ? (
            <TodoList todoList={filterData} onEdit={onOpen} />
          ) : (
            <Text textAlign="center">No Records</Text>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
