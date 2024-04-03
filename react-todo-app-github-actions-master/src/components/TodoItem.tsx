import {
  Card,
  CardHeader,
  Checkbox,
  Heading,
  CardBody,
  Text,
  Stack,
  Box,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ActionIconButton from "./ActionButtons/ActionIconButton";

type TodoItem = {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
};

interface TodoItemProps {
  todoListItem: TodoItem;
  onEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const TodoListItem = ({ todoListItem, onEdit }: TodoItemProps) => {
  return (
    <Card variant="outline" p="4" size="lg">
      <Stack justifyContent="space-between" direction="row">
        <Stack direction="row">
          <Checkbox size="lg" />
          <Box>
            <CardHeader p="0">
              <Heading size="md"> {todoListItem.title}</Heading>
            </CardHeader>
            <CardBody p="0">
              <Text>{todoListItem.createdAt.toDateString()}</Text>
            </CardBody>
          </Box>
        </Stack>
        <Box>
          <ActionIconButton
            onClick={onEdit}
            aria-label="Edit"
            variant="outline"
            size="md"
            icon={<EditIcon id="editTask" />}
            id="editTask"
          />
          <ActionIconButton
            variant="outline"
            aria-label="Delete"
            size="md"
            margin={2}
            icon={<DeleteIcon id="deleteTask" />}
            id="deleteTask"
          />
        </Box>
      </Stack>
    </Card>
  );
};

export default TodoListItem;
