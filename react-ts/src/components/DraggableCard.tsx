import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

const Card = styled.div<{isDragging: boolean}>`
  background-color: ${props => props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  border-radius: 5px;
  padding: 15px;
  margin-top: 5px;
  margin-bottom: 10px;
  transition: background-color .3s ease-in-out;
  box-shadow: ${props => props.isDragging ? "0px 2px 15xp rgba(0,0,0,0.05)" : "none"};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DeleteBtn = styled.button` 
  height: 15px;
  color: #888;
  background-image: url("../icons/close.png");
  background-size: cover;
  background-color: transparent;
  border: none;
  display: flex;
  cursor: pointer;
`;

interface IDraggableCardProps {
  toDoId:number;
  toDoText:string;
  index:number;
  boardId:string;
}

function DraggableCard ({toDoId, index, toDoText, boardId}:IDraggableCardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = () => {
    setToDos((allBoards) => {
      const boardCopy = [...allBoards[boardId]];
      boardCopy.splice(index, 1);
      console.log(boardCopy);
      return {
        ...allBoards,
        [boardId]:boardCopy
      }
    })
    };
  return (
    <Draggable draggableId={toDoId+""} index={index}>
      {(magic, snapshot) => (
        <Card 
          isDragging={snapshot.isDragging}
          ref={magic.innerRef} 
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
          <DeleteBtn onClick={onClick}>Delete</DeleteBtn>
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DraggableCard);