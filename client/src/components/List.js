import React from 'react';

import moment from 'moment';
import 'moment/locale/fr'

import { Paper, Text, Group, Button } from '@mantine/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';

function List({items, columnId, handleDelete}) {
  const itemMap = items.map((item, index) => (
    <Draggable key={`${item.id}`} index={index} draggableId={`${item.id}`}>
      {(provided) => (
        <Paper 
          sx={{ marginTop: 10, width: '100%'}}
          shadow="md" radius="lg" p="md" 
          withBorder
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
        <Group position="right" >
          <Text color="gray" size="xs">
            Créé le : {moment(+item.created).format('lll')}
          </Text>
          {columnId === 'archives' && (
            <>
              <Text color="gray" size="xs">
                  Et archivé le : {moment(+item.edited).format('lll')}
              </Text>
              <Button variant="outline" color="red" radius="xl" size="xs" onClick={() => handleDelete(item.id)}>
                Supprimer
              </Button>
            </>
          )}
        </Group>
        <Text>
          {item.text}
        </Text>
        </Paper>
      )}
    </Draggable>
  ));

  return (
        <Droppable droppableId={columnId} key={columnId} direction="vertical">
            {(provided) => (
            <div style={{ width: '100%', minHeight: '20vh' }} {...provided.droppableProps} ref={provided.innerRef} >
                {itemMap}
                {provided.placeholder}
            </div>
            )}
        </Droppable>
  );
}

export default List;
