import { Heading, HeadingProps } from "@chakra-ui/react";

interface AppHeaderProps extends HeadingProps {
  content: string;
}

const AppHeader = ({ content, ...restProps }: AppHeaderProps) => {
  return <Heading {...restProps}>{content}</Heading>;
};

export default AppHeader;
