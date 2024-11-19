import React from "react";
import styles from "./Navbar.module.css";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Topbar = () => {
    const navigate = useNavigate();
    const { name } = useSelector((state) => state.user.value);
    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            className={`bg-body-tertiary ${styles.topbar}`}
        >
            <Navbar.Brand
                className={`${styles.topbarname}`}
                onClick={() => {
                    navigate("/");
                }}
            >
                <b style={{ color: "rgb(216, 212, 207)" }}>Chapterize</b>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link
                        style={{ color: "#e8e6e3" }}
                        onClick={() => {
                            navigate("/mycourses");
                        }}
                    >
                        My Courses
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link
                        eventKey={2}
                        style={{ color: "#e8e6e3" }}
                    >
                        {name}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Topbar;
