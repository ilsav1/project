// Core
import React, { Component } from "react";

// Instruments
import Checkbox from "../../theme/assets/Checkbox";

import Styles from "./styles.m.css";
import TaskActions from "../TaskActions";

export default class Task extends Component {
    constructor (props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            disabled: true,
            ...this.props,
        };
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps.completed) {
            return {
                completed: !nextProps.completed,
            };
        }

        return null;
    }
    _onEdit = () => {
        const { current } = this.myRef;
        const { disabled } = this.state;

        if (disabled) {
            this.setState(
                {
                    disabled: false,
                },
                () => {
                    current.focus();
                }
            );
        } else {
            this.setState({
                disabled: true,
                message:  this.props.message,
            });
        }
    };

    _deleteTask = () => {
        const { id, deleteTask } = this.props;

        deleteTask(id);
    };

    _updateTask = () => {
        const { updateTask } = this.props;

        updateTask(this.state);
    };
    _toggleComplete = () => {
        this.setState(
            {
                ...this.state,
                completed: !this.state.completed,
            },
            () => {
                this._updateTask();
            }
        );
    };
    _toggleFavorite = () => {
        console.log("here");
        this.setState(
            {
                ...this.state,
                favorite: !this.state.favorite,
            },
            () => {
                this._updateTask();
            }
        );
    };
    _handleChange = (e) => {
        this.setState({
            message: e.target.value,
        });
    };
    _handleKeyDown = (e) => {
        const { keyCode } = e;

        if (keyCode === 27) {
            this.setState({
                message:  this.props.message,
                disabled: true,
            });
        }
        if (keyCode === 13) {
            this.setState({
                disabled: true,
            });
            this._updateTask(this.state);
        }
    };

    render () {
        const { completed, favorite } = this.props;
        const { message, disabled } = this.state;

        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this._toggleComplete }
                    />
                    <input
                        disabled = { disabled }
                        onChange = { this._handleChange }
                        onKeyDown = { this._handleKeyDown }
                        ref = { this.myRef }
                        type = 'text'
                        value = { message }
                    />
                </div>
                <TaskActions
                    deleteTask = { this._deleteTask }
                    editable = { !disabled }
                    editHandler = { this._onEdit }
                    favorite = { favorite }
                    toggleFavorite = { this._toggleFavorite }
                />
            </li>
        );
    }
}
