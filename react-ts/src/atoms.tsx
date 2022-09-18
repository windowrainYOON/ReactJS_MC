import { atom, selector } from "recoil";

export enum Icons {
  Delete = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
}

export interface IToDo {
  id:number;
  text:string;
}

interface IToDoState {
  [key: string] : IToDo[];
}

export const toDoState = atom<IToDoState>({
  key:"toDo",
  default: {
    "활동" : [],
    "비활동" : [],
    "졸업" : [],
  },
})