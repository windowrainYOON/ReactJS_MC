import { useForm } from "react-hook-form";
import {Droppable} from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  width: 300px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 8px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  padding: 15px;
  border-radius: 8px 8px 0 0; 
  font-size: 18px;
  color:#323130;
  background-color: #bebdbc;
`;

interface IAreaProps {
  isDraggingOver:boolean;
  isDraggingFromThis:boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${props => props.isDraggingOver ? "#b2bec3" : props.isDraggingFromThis ? "#dfe6e9" : "transparent"};
  flex-grow: 1;
  transition: background-color .3s ease-in-out;
  padding: 10px;
  border-radius: 0 0 5px 5px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
`;

const InputToDo = styled.input`
  width: 100%;
  margin: 10px;
  height: 40px;
  border: solid 3px ${props => props.theme.bgColor};
  border-radius: 5px;
  padding: 8px;
  outline: none;
  font-size: 16px;
`;

interface IBoardProps {
  toDos:IToDo[];
  boardId: string;
};

interface IForm {
  toDo:string;
}

function Board ({toDos, boardId}:IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const {register, setValue, handleSubmit} = useForm<IForm>();
  const onVaild = ({toDo}:IForm) => {
    const newToDo = {
      id:Date.now(),
      text:toDo,
    }
    setToDos(allBoards => {
      return {
        ...allBoards,
        [boardId]:[
          newToDo,
          ...allBoards[boardId]
        ]
      }
    })
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onVaild)}>
        <InputToDo {...register("toDo", {required:true})} type="text" placeholder={`Add task on ${boardId}`}></InputToDo>
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area isDraggingOver={snapshot.isDraggingOver} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} boardId={boardId}/>
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  )
}

export default Board;