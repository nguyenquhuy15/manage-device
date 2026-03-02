import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSort,
    faSortUp,
    faSortDown,
} from "@fortawesome/free-solid-svg-icons";

const SortComponent = React.memo((props) => {

    const onClickSortIcon = () => {
        if (props.currentSort.sortField != props.apiField) {
            props.setCurrentSort({ sortField: props.apiField, isAsc: false });
        } else {
            props.setCurrentSort({ sortField: props.apiField, isAsc: !props.currentSort.isAsc });
        }
        if (props.resetPaging) props.resetPaging();
    }

    return (
        <FontAwesomeIcon
            className="ms-2"
            icon={
                props.currentSort.sortField != props.apiField
                    ? faSort
                    : (props.currentSort.isAsc ? faSortUp : faSortDown)

            }
            onClick={onClickSortIcon}
        />
    );
})

export default SortComponent;