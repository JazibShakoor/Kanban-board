import { Droppable } from "react-beautiful-dnd";
import React from "react";
import classes from './container.module.css'
import Context from "../Components/context";
import Editable from "../Components/editTable";

const DraggableElement = (props) => {

    const addItem = (name) => {
        props.item({name: name, id: props.id});
    };

    const onUpdatedData = (updatedArray, dataKey, itemid) => {
        props.array(updatedArray, dataKey, itemid);
        console.log(updatedArray)
    };

    const colorScheams = () => {
        if (props.id === 'Request') {
          return classes.mainHeading;
        } else if (props.id === 'inProgress') {
          return classes.middleHeading;
        } else if (props.id === 'done') {
          return classes.sideHeading;
        }
      }


    return (
        <div className={classes.innerBox}>
            
                <div className={colorScheams()}>
                <h3>{props.id}</h3>
                </div>
            
        <Editable
              displayClass="app_boards_add-board"
              editClass="app_boards_add-board_edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addItem}
            />
        <Droppable droppableId={`${props.id}`}>
            {(provided) => (
                <div className={`${classes.Card} ${classes['custom-scrollbar']}`} {...provided.droppableProps} ref={provided.innerRef}>
                    {props.elements.map((item, index) => (
                        <Context key={item.id} item={item} index={index} updated={onUpdatedData} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
    )
};

export default DraggableElement;
