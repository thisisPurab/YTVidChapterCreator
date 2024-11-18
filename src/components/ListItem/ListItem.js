import React from "react";
import styles from "./ListItem.module.css";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPlay } from "@fortawesome/free-solid-svg-icons";

const ListItem = ({ id, title, playOnSeek, played }) => {
    const { chapters } = useSelector((state) => state.player.value);

    const handleClick = (e) => {
        e.preventDefault();
        playOnSeek(id);
    };

    return (
        <Row>
            <button
                className={styles.button}
                key={id}
                value={id}
                onClick={handleClick}
            >
                {chapters[id]["played"] ? (
                    <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={styles.doneIcon}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faPlay}
                        className={styles.icon}
                    />
                )}
                {title}
            </button>
        </Row>
    );
};

export default ListItem;
