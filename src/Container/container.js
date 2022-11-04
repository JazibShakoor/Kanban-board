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
      const result = Array.from(list);
      const [removed] = result.splice(index, 1);
      return [removed, result];
    };
    
    const addToList = (list, index, element, newId) => {
      const result = Array.from(list);
      console.log(result)
      result.splice(index, 0, element);
      result[index].listId = newId
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
          destinationList[0].listId
        );

        setListItems(listCopy);
    }

    const onUpdatedArrayValue = (items, dataKey, itemid) => {
      const newArray = listItems[dataKey]
      console.log(newArray)
      const newUpdateArray = {...listItems}
  
      const existingItemIndex = newArray.findIndex(
          (item) => item.id === itemid
        );
        console.log(existingItemIndex)
        const existingItem = newArray[existingItemIndex];
    
        if (existingItem) {
          const updatedItem = {
            ...existingItem,
            content: items,
          };
    
          newArray[existingItemIndex] = updatedItem;
          newUpdateArray[existingItem] = newArray;
          console.log(newArray)
          setListItems(newUpdateArray);
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