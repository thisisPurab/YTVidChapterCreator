import Player from "../../components/Player/Player";
import ChapterList from "../../components/ChapterList/ChapterList";
import styles from "./Course.module.css";
import { Col, Row } from "react-bootstrap";

function Course() {
    return (
        <Row className={styles.coursepageWrapper}>
            <Col
                xs
                lg="8"
                className={styles.player}
            >
                <Player />
            </Col>
            <Col className={styles.chapterList}>
                <ChapterList />
            </Col>
        </Row>
    );
}

export default Course;
