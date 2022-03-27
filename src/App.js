import React, { useState } from 'react';

import moment from 'moment';
import 'moment/locale/fr'

import { TextInput, Button, Box, Title, Paper, Text, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

import './App.css';

function App() {
  const [todos, setTodos] = useState(
    [
      {
        text: "Use it to create cards, dropdowns, modals and other components that require background",
        date: Date.now()
      }
    ]
  );

  const form = useForm({
    initialValues: {
      todo: '',
    },
  });

  const handleSubmit = (values) => console.log(values);

  return (
    <div className="App">
      <Title order={1}>Todolist Siu et Ju</Title>
      <Box sx={{ marginTop: 20 }} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)} className="box">
          <TextInput
            sx={{ width: '50vw' }}
            required
            placeholder="Nouveau todo"
            {...form.getInputProps('todo')}
          />

          <Button type="submit">Ajouter</Button>
        </form>
      </Box>
      <Box sx={{ marginTop: 20}} max="auto" className="box">
        <Paper shadow="xl" radius="md" p="xl" sx={{ marginRight: 20}} className="card" withBorder>
          <Title order={3}>Todo</Title>
          {
            todos.map(todo => (
              <Paper sx={{ marginTop: 10}} shadow="md" radius="lg" p="md" withBorder>
                <Group position="right" >
                  <Text color="gray" size="sm">
                    Créé le : {moment(todo.date).format('lll')}
                  </Text>
                  <Button type="submit">Submit</Button>
                </Group>
                <Text>
                  {todo.text}
                </Text>
              </Paper>
            ))
          }
        </Paper>
        <Paper shadow="xl" radius="md" p="xl" className="card" withBorder >
          <Title order={3}>Archives</Title>
          <Paper sx={{ marginTop: 10}} shadow="md" radius="lg" p="md" withBorder>
            <Text>Paper is the most basic ui component</Text>
            <Text>
              Use it to create cards, dropdowns, modals and other components that require background
              with shadow
            </Text>
          </Paper>
        </Paper>
      </Box>
    </div>
  );
}

export default App;
