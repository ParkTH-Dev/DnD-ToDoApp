import { Droppable } from "react-beautiful-dnd";
import { DragabbleCard } from "./DraggableCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 7px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 1.5rem;
  font-weight: bold;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Tap = styled.div<IAreaProps>`
  padding: 10px 0;
  background-color: ${(props) =>
    props.isDraggingOver ? "pink" : props.isDraggingFromThis ? "tomato" : null};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 10px;

  input {
    width: 100%;
    text-align: center;
    border: none;
    border-radius: 15px;
    padding: 5px 0;
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
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
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
