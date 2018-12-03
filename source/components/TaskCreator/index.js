// Core
import React, { PureComponent } from "react";

// Instruments
// import Styles from "./styles.m.css";

export default class TaskCreator extends PureComponent {
    constructor (props) {
        super(props);
        this.myRef = React.createRef();
    }
    _handleClick = (e) => {
        e.preventDefault();
        const { current } = this.myRef;
        const { createTask } = this.props;

        if (current.value) {
            createTask(current.value);
            current.value = "";
        }
    };
    render () {
        const { createTask } = this.props;

        console.log(createTask);

        return (
            <form onSubmit = { (e) => this._handleClick(e) }>
                <input
                    maxLength = '50'
                    placeholder = 'Описaние моей новой задачи'
                    ref = { this.myRef }
                    type = 'text'
                />
                <button>Добавить задачу</button>
            </form>
        );
    }
}
