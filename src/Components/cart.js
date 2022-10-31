import React, { useRef } from 'react';
import Modal from '../Ui/Modal';

const Cart = (props) => {
    const enterValue = useRef();

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        const title = enterValue.current.value;
        props.updateTitle(title, props.keyIndex, props.id)     
    };

    return (
        <Modal onClose={props.onClose}>
            <form onSubmit={onSubmitHandler}>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' defaultValue={props.show} ref={enterValue}></input>
                <button type='submit'>Update Title</button>
                <button onClick={props.onClose}>Close</button>
            </form>
        </Modal>
    )
};

export default Cart;