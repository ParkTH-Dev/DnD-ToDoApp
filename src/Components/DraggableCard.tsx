import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ $isDragging: boolean }>`
  text-align: center;
  padding: 16px 20px;
  background-color: ${(props) => (props.$isDragging ? "#f8f9fa" : "white")};
  border-radius: 12px;
  margin-bottom: 10px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: ${(props) =>
    props.$isDragging
      ? "0 8px 20px rgba(0, 0, 0, 0.15)"
      : "0 2px 8px rgba(0, 0, 0, 0.08)"};
  transition: all 0.2s ease-in-out;
  border: 1px solid
    ${(props) => (props.$isDragging ? "#1a73e8" : "rgba(0, 0, 0, 0.12)")};
  font-weight: 500;
  color: #3c4043;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    border-color: #1a73e8;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  }
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
          $isDragging={snapshot.isDragging}
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
