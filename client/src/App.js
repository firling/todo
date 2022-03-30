import React, { useState, useEffect } from 'react';

import { TextInput, Button, Box, Title, Paper, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DragDropContext } from 'react-beautiful-dnd';

import List from './components/List';
import { get, add, remove, changePosition, changeColumn } from './Api';
import './App.css';

function App() {

  const [columns, setColumns] = useState({})

  useEffect(async () => {
    get().then(res => {
      setColumns({
        ["todo"]: {
          name: "To do",
          items: res.filter(elt => elt.type == "todo")
        },
        ["archives"]: {
          name: "Archives",
          items: res.filter(elt => elt.type == "archives") 
        }
      })
    })
  }, [])

  const form = useForm({
    initialValues: {
      todo: '',
    },
  });

  const handleSubmit = async ({todo}) => {
    const newItem = await add(todo);

    form.setFieldValue('todo', '');

    const column = columns["todo"];
    setColumns({
      ...columns,
      ["todo"]: {
        ...column,
        items: [newItem, ...column.items]
      }
    })
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
    remove(id);
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
      const newCol = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      }
      setColumns(newCol);
      changePosition(newCol)
      changeColumn(removed.id, destination.droppableId)
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      const newCol = {
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      }
      setColumns(newCol);
      changePosition(newCol)
    }
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
