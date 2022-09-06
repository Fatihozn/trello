import React from "react";
import Cards from "./Cards";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function ToDo({ data, addCard, Delete }) {
  return (
    <Droppable droppableId="todo" key={"todo"}>
      {(provided, snapshot) => (
        <div
          className="todo"
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            background: snapshot.isDraggingOver
              ? "rgb(25, 41, 255)"
              : "rgb(0, 11, 165)",
          }}
        >
          <h3>TODO</h3>
          {data.map((veri, index) => (
            <Draggable
              key={veri.id}
              draggableId={veri.id.toString()}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    opacity: snapshot.isDragging ? "0.5" : "1",
                    ...provided.draggableProps.style,
                  }}
                  className="card"
                  id={veri.id}
                >
                  <Cards id={veri.id}> {veri.cevap}</Cards>
                  <button
                    id={veri.id}
                    onClick={(event) => Delete("todo", data, event)}
                    className="delete"
                  >
                    delete
                  </button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <button onClick={() => addCard("todo", data)}> + </button>
        </div>
      )}
    </Droppable>
  );
}
