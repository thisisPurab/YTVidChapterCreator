import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    setChapters,
    setDetails,
    setInitialState,
    setUrl,
} from "../../redux/playerSlice";
import { Button, Card } from "react-bootstrap";
import styles from "./CourseCard.module.css";

const CourseCard = ({ course }) => {
    // console.log(course);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setInitialState());
        dispatch(setChapters(course.chapters));
        dispatch(setDetails({ title: course.title, channel: course.channel }));
        dispatch(setUrl("https://www.youtube.com/watch?v=" + course.videoID));

        navigate("/course");
    };

    return (
        <Card
            className="m-2"
            style={{ width: "16rem", backgroundColor: "#181a1b" }}
        >
            <Card.Img
                variant="top"
                src={course.thumbnail}
            />
            <Card.Body>
                <Card.Subtitle
                    className="mb-2"
                    style={{ color: "grey" }}
                >
                    {course.title}
                </Card.Subtitle>
                <Card.Text className={styles.channel}>
                    {course.channel}
                </Card.Text>
                <Button
                    variant="primary"
                    className={styles.button}
                    onClick={handleClick}
                >
                    Go to Course
                </Button>
            </Card.Body>
        </Card>
    );
};

export default CourseCard;
