// Core
import React, { PureComponent } from "react";

// Instruments
import Edit from "../../theme/assets/Edit";
import Remove from "../../theme/assets/Remove";
import Star from "../../theme/assets/Star";

import Styles from "../Task/styles.m.css";

export default class TaskActions extends PureComponent {
    render () {
        const {
            editable,
            completed,
            favorite,
            editHandler,
            deleteTask,
            toggleFavorite,
        } = this.props;

        return (
            <div className = { Styles.actions }>
                <Star
                    inlineBlock
                    checked = { favorite }
                    className = { Styles.toggleTaskFavoriteState }
                    color1 = '#3B8EF3'
                    onClick = { toggleFavorite }
                />
                <Edit
                    inlineBlock
                    checked = { editable }
                    className = { Styles.updateTaskMessageOnClick }
                    color1 = '#3B8EF3'
                    onClick = { editHandler }
                />
                <Remove
                    inlineBlock
                    checked = { completed }
                    className = { Styles.toggleTaskCompletedState }
                    color1 = '#3B8EF3'
                    onClick = { deleteTask }
                />
            </div>
        );
    }
}
