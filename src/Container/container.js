import React, { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import classes from '../Container/container.module.css';
import DraggableElement from "./draggableElement";
import demoData from "../demoData/demoData";

  const lists = ["Request", "inProgress", "done"];

const Container = () => {
    const [listItems, setListItems] = useState(JSON.parse(localStorage.getItem("data")) || demoData);

    useEffect(() => {
      // Check browser support
    if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem("data", JSON.stringify(listItems));
      }
    }, [listItems])

    const removeFromList = (list, index) => {
      // Array.from is a JavaScript method
      const result = Array.from(list);
      const [removed] = result.splice(index, 1);
      return [removed, result];
    };
    
    const addToList = (list, index, element) => {
      // Array.from is a JavaScript method
      const result = Array.from(list);
      result.splice(index, 0, element);
      return result;
    };

    const storeItem = ({name, id}) => {
      const newArray = {...listItems}
      newArray[id].push({
        id: String(Date.now() + Math.random() * 2),
        listId: id,
        content: name,
      });
      setListItems(newArray)
    };

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const listCopy = {...listItems} ;
       
        const sourceList = listCopy[result.source.droppableId];
        const [removedElement, newSourceList] = removeFromList(
          sourceList,
          result.source.index
        );
        listCopy[result.source.droppableId] = newSourceList;
        const destinationList = listCopy[result.destination.droppableId];
         
        listCopy[result.destination.droppableId] = addToList(
          destinationList,
          result.destination.index,
          removedElement,
        );

        setListItems(listCopy);
    }

    const onUpdatedArrayValue = (items, dataKey, itemid) => {
      const newObj = listItems[dataKey]
      
      const newUpdateObj = {...listItems}
  
      const existingItemIndex = newObj.findIndex(
          (item) => item.id === itemid
        );
        
        const existingItem = newObj[existingItemIndex];
    
        if (existingItem) {
          const updatedItem = {
            ...existingItem,
            content: items,
          };
    
          newObj[existingItemIndex] = updatedItem;
          newUpdateObj[existingItem] = newObj;
          setListItems(newUpdateObj);
        }    
    };

    return (
        <div className={classes.flexbox}>
            <DragDropContext onDragEnd={handleOnDragEnd} onBeforeDragStart={handleOnDragEnd}>
               {lists.map((listKey) => (
                <DraggableElement 
                   elements={listItems[listKey]}
                   key={listKey}
                   id={listKey}
                   item={storeItem}
                   array={onUpdatedArrayValue}
                />
               ))}
            </DragDropContext>
        </div>
    )
};

export default Container;