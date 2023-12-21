import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  text-align: center;
  padding: 10px 20px;
  background-color: ${(props) =>
    props.isDragging ? "rgba(255, 255, 255, 0.562)" : props.theme.cardColor};
  border-radius: 7px;
  margin-bottom: 5px;
  width: 80%;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 5px 5px rgba(0,0,0,0.1)" : "none"};
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

export function DragabbleCard({
  toDoId,
  toDoText,
  index,
}: IDragabbleCardProps) {
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DragabbleCard);
