import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";

const TrashWrapper = styled.div<{ $isDraggingOver: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$isDraggingOver ? "#dc3545" : "#6c757d"};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  &:hover {
    transform: translateX(-50%) scale(1.05);
  }

  svg {
    color: white;
    font-size: 24px;
    transition: transform 0.2s ease-in-out;
    transform: ${(props) =>
      props.$isDraggingOver ? "scale(1.2)" : "scale(1)"};
  }
`;

function TrashCan() {
  return (
    <Droppable droppableId="trash">
      {(provided, snapshot) => (
        <TrashWrapper
          ref={provided.innerRef}
          $isDraggingOver={snapshot.isDraggingOver}
          {...provided.droppableProps}
        >
          <FaTrashAlt />
          {provided.placeholder}
        </TrashWrapper>
      )}
    </Droppable>
  );
}

export default TrashCan;
