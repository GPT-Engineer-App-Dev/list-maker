import React, { useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Heading, Input, IconButton, useToast, Container, Text, List, ListItem, ListIcon, Divider } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const addTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No content",
        description: "Can't add an empty todo",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const deleteTodo = (indexToRemove) => {
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="container.md" p={5}>
        <VStack spacing={8}>
          <Heading mb={6}>Todo App</Heading>
          <HStack>
            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Add a new task..." />
            <IconButton colorScheme="blue" aria-label="Add todo" icon={<FaPlus />} onClick={addTodo} />
          </HStack>
          <List spacing={3} w="full">
            {todos.map((todo, index) => (
              <ListItem key={index}>
                <HStack justifyContent="space-between">
                  <Text>{todo}</Text>
                  <IconButton colorScheme="red" aria-label="Delete todo" icon={<FaTrash />} onClick={() => deleteTodo(index)} />
                </HStack>
                {index < todos.length - 1 && <Divider />}
              </ListItem>
            ))}
          </List>
        </VStack>
      </Container>
    </ChakraProvider>
  );
};

export default Index;
