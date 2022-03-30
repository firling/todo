import React, { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { TextInput, Button, Box, Title, Paper, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useListState } from '@mantine/hooks';
import { DragDropContext } from 'react-beautiful-dnd';

import List from './components/List';
import Api from './Api';
import './App.css';

function App() {
  const [todos, todosHandlers] = useListState(
    [
      {
        id: uuidv4(),
        text: "Premier todo test",
        type: "todo",
        created: Date.now(),
        edited: null,
      },
      {
        id: uuidv4(),
        text: "deuxieme todo test",
        type: "archives",
        created: Date.now(),
        edited: Date.now(),
      }
    ]
  );

  const [columns, setColumns] = useState({})

  useEffect(() => {
    setColumns({
      ["todo"]: {
        name: "To do",
        items: todos.filter(elt => elt.type == "todo")
      },
      ["archives"]: {
        name: "Archives",
        items: todos.filter(elt => elt.type == "archives")
      }
    })
  }, [])

  const form = useForm({
    initialValues: {
      todo: '',
    },
  });

  const handleSubmit = ({todo}) => {
    const newItem = {
      id: uuidv4(), 
      text: todo, 
      created: Date.now(),
      edited: null,
    }

    form.setFieldValue('todo', '');

    const column = columns["todo"];
    setColumns({
      ...columns,
      ["todo"]: {
        ...column,
        items: [newItem, ...column.items]
      }
    })

    Api.add();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Supprimer cet élément?")) return;
    const column = columns["archives"];
    const index = column.items.findIndex((elem) => elem.id === id);
    column.items.splice(index, 1);
    setColumns({
      ...columns,
      ['archives']: {
        ...column,
        items: column.items
      }
    })
    Api.remove();
  }

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      removed.edited = Date.now();
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
      Api.changeColumn()
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
    Api.changePosition()
  };

  return (
    <div className="App">
      <Title order={1}>Todolist Siu et Ju</Title>
      <Box sx={{ marginTop: 20 }} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)} className="form">
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
        <DragDropContext
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => (
            <Paper key={columnId} shadow="xl" radius="md" p="xl" className="card" withBorder>
              <Title order={3}>{column.name}</Title>
              <List items={column.items} columnId={columnId} handleDelete={handleDelete}/>
            </Paper>
          ))}
        </DragDropContext>
      </Box>
    </div>
  );
}

export default App;
