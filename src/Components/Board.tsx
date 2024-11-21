import { Droppable } from "react-beautiful-dnd";
import { DragabbleCard } from "./DraggableCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  width: auto;
  min-width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.12);
`;
const Title = styled.div`
  text-align: center;
  padding: 12px 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a73e8;
  letter-spacing: -0.5px;
  margin-bottom: 10px;
`;

const Tap = styled.div<{
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}>`
  padding: 20px 10px;
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "rgba(26, 115, 232, 0.08)"
      : props.$isDraggingFromThis
      ? "rgba(66, 133, 244, 0.05)"
      : "#ffffff"};
  flex-grow: 1;
  transition: background-color 0.3s ease;
  min-height: 200px;
  border-radius: 12px;
  border: 2px dashed
    ${(props) => (props.$isDraggingOver ? "#1a73e8" : "rgba(0, 0, 0, 0.12)")};
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;

  input {
    width: 90%;
    text-align: center;
    border: 2px solid #e8eaed;
    border-radius: 25px;
    padding: 12px 20px;
    font-size: 0.95rem;
    transition: all 0.2s ease-in-out;
    background-color: white;

    &:focus {
      outline: none;
      border-color: #1a73e8;
      box-shadow: 0 0 0 4px rgba(26, 115, 232, 0.1);
    }

    &::placeholder {
      color: #9aa0a6;
      font-size: 0.9rem;
    }
  }
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValue = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValue)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`${boardId}:`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Tap
            $isDraggingOver={snapshot.isDraggingOver}
            $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Tap>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
