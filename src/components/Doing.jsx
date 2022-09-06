import React from "react";
import Cards from "./Cards";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function Doing({ data, addCard, Delete }) {
  return (
    <Droppable droppableId="doing" key={"doing"}>
      {(provided, snapshot) => (
        <div
          className="doing"
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            background: snapshot.isDraggingOver ? "lightgreen" : "green",
          }}
        >
          <h3>DOING</h3>
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
                    onClick={(event) => Delete("doing", data, event)}
                    className="delete"
                  >
                    delete
                  </button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <button onClick={() => addCard("doing", data)}> + </button>
        </div>
      )}
    </Droppable>
  );
}
