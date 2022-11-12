import React, { useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Card from '../Ui/Card';
import Editable from './editContent'
import classes from './context.module.css';

const Context = ({ item, index, updated, listid }) => {
    const inputRef = useRef(); 
    const onUpdate = () => {
        const enteredValue = inputRef?.current.value;
        updated(enteredValue, listid, item.id);
    };
    
    const colorScheams = {
        Request : classes.leftHeading,
        inProgress : classes.middleHeading,
        done : classes.rightHeading
      }
    
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <div className={classes.area} ref={provided.innerRef}
                    snapshot={snapshot}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card>
                        <div className={colorScheams[listid]}></div>
                        <Editable
                            text={item.content}
                            placeholder="Write a task name"
                            childRef={inputRef}
                            type="input"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                name="task"
                                placeholder="Write a task name"
                                defaultValue={item.content}
                                onChange={onUpdate}
                                
                            />
                        </Editable>
                    </Card>
                </div>
            )}
        </Draggable>
    )
};

export default Context;