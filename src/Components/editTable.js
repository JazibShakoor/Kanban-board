import React, { useState } from "react";
import { X } from "react-feather";
import classes from './editTable.module.css';



const Editable = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState(props.defaultValue || "");

  const submission = (e) => {
    e.preventDefault();
    if (inputText && props.onSubmit) {
      setInputText("");
      props.onSubmit(inputText);
    }
    setIsEditable(false);
  };

  return (
    <div className={classes.editable}>
      {isEditable ? (
        <form
          className={`${classes['editable_edit']} ${props.editClass ? props.editClass : ""}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={props.placeholder || props.text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className={classes["editable_edit_footer"]}>
            <button type="submit">{props.buttonText || "Add"}</button>
            <X onClick={() => setIsEditable(false)} className={classes.closeIcon} />
          </div>
        </form>
      ) : (
        <p
          className={`${classes['editable_display']} ${
            props.displayClass ? props.displayClass : ""
          }`}
          onClick={() => setIsEditable(true)}
        >
          {props.text}
        </p>
      )}
    </div>
  );
}

export default Editable;