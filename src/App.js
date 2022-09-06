import React, { useState } from "react";
import Doing from "./components/Doing";
import Done from "./components/Done";
import ToDo from "./components/ToDo";

import { DragDropContext } from "react-beautiful-dnd";

const datas = {
  todo: [
    {
      id: 0,
      cevap: " dosya hazılardım ",
    },
    {
      id: 1,
      cevap: " component hazırlayacağım ",
    },
  ],

  doing: [
    {
      id: 2,
      cevap: " dosya hazılardım ",
    },
    {
      id: 3,
      cevap: " component hazırlayacağım ",
    },
    {
      id: 4,
      cevap: " backend'i bekliyorum",
    },
  ],
  done: [
    {
      id: 5,
      cevap: " dosya hazılardım ",
    },
    {
      id: 6,
      cevap: " component hazırlayacağım ",
    },
    {
      id: 7,
      cevap: " backend'i bekliyorum",
    },
  ],
};

export default function App() {
  const addCard = (attribute, backData) => {
    const sampleTodo = [...backData];
    const text = prompt("Ekleyeceğiniz açıklamayı giriniz : ");
    if (text !== null) {
      sampleTodo.push({
        id: Date.now(),
        cevap: text,
      });

      setData({
        ...data,
        [attribute]: sampleTodo,
      });
    }
  };

  const Delete = (attribute, deleteData, event) => {
    const { id } = event.target;
    const filtredTodo = deleteData.filter((veri) => veri.id !== Number(id));

    setData({
      ...data,
      [attribute]: filtredTodo,
    });
  };

  const [data, setData] = useState(datas);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) {
      const cloneData = { ...data };
      const destinationTask = [...cloneData[source.droppableId]];
      const [removed] = destinationTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);
      cloneData[source.droppableId] = destinationTask;
      setData(cloneData);
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceCol = source.droppableId;
      const destinationCol = destination.droppableId;
      const cloneData = { ...data };
      const sourceTask = [...cloneData[sourceCol]];
      const destinationTask = [...cloneData[destinationCol]];
      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);
      cloneData[sourceCol] = sourceTask;
      cloneData[destinationCol] = destinationTask;

      setData(cloneData);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <ToDo data={data.todo} addCard={addCard} Delete={Delete} />
        <Doing data={data.doing} addCard={addCard} Delete={Delete} />
        <Done data={data.done} addCard={addCard} Delete={Delete} />
      </div>
    </DragDropContext>
  );
}
