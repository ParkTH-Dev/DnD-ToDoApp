import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import TrashCan from "./Components/TrashCan";
import Title from "./Components/Title";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.bgColor} 0%,
    ${(props) => props.theme.boardColor} 100%
  );
  padding: 40px 20px;
`;

const Boards = styled.div`
  width: 100%;
  max-width: 1500px;
  min-height: 200px;
  gap: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  align-items: flex-start;
  padding: 20px;
`;

const Container = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at top right,
      ${(props) => `${props.theme.accentColor}08`} 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination.droppableId === "trash") {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        sourceBoard.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
        };
      });
      return;
    }
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  const onDragStart = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Container>
        <Wrapper>
          <Title />
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
        <TrashCan />
      </Container>
    </DragDropContext>
  );
}
export default App;
