import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(provided) => 
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(magic) => 
                  <li 
                    ref={magic.innerRef} 
                    {...magic.draggableProps} 
                  >
                    <span {...magic.dragHandleProps}>
                      🔥
                    </span>
                    One
                  </li>
                }
              </Draggable>
            </ul>
          }
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
