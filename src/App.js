import './App.css';
import { TextInput, Button, Box, Title, Paper, Text, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

function App() {
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
          <Paper sx={{ marginTop: 10}} shadow="md" radius="lg" p="md" withBorder>
            <Group position="right">
              <Button type="submit">Submit</Button>
            </Group>
            <Text>
              Use it to create cards, dropdowns, modals and other components that require background
              with shadow
            </Text>
          </Paper>
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
