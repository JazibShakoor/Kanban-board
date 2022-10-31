import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Card from '../Ui/Card';
import Cart from './cart';
import classes from './context.module.css';

const Context = ({ item, index, updated }) => {
    const [cartItemShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true) ;
      };
    
      const hideCartHandler = () => {
        setCartIsShown(false);
      };

      const onUpdate = (data, dataKey, itemid) => {
        updated(data, dataKey, itemid);
      };

    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <div className={classes.area} ref={provided.innerRef}
                    snapshot={snapshot}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                        {cartItemShown && <Cart onClose={hideCartHandler} show={item.content} id={item.id} keyIndex={item.listId} updateTitle={onUpdate}/>}
                    <Card>
                        {item.listId && item.listId === 'Request' && <div className={classes.leftHeading}></div>}
                        {item.listId === 'inProgress' && <div className={classes.middleHeading}></div>}
                        {item.listId === 'done' && <div className={classes.rightHeading}></div>}
                        <p onClick={showCartHandler}>{item.content}</p>
                    </Card>
                </div>
            )}
        </Draggable>
    )
};

export default Context;