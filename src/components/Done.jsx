import React from "react";
import Cards from "./Cards";
import { Droppable, Draggable } from "react-beautiful-dnd";
export default function Done({ data, addCard, Delete }) {
  return (
    <Droppable droppableId="done" key={"done"}>
      {(provided, snapshot) => (
        <div
          className="done"
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            background: snapshot.isDraggingOver ? "pink" : "purple",
          }}
        >
          <h3>DONE</h3>
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
                    onClick={(event) => Delete("done", data, event)}
                    className="delete"
                  >
                    delete
                  </button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <button onClick={() => addCard("done", data)}> + </button>
        </div>
      )}
    </Droppable>
  );
}
