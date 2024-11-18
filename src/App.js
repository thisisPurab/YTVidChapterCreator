import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Course from "./pages/Course/Course";
import MyCourses from "./pages/MyCourses/MyCourses";
import Topbar from "./components/Navbar/Navbar";
import LinkInput from "./components/LinkInput/LinkInput";

function App() {
    return (
        <Container className="app">
            <BrowserRouter>
                <Topbar />
                <Routes>
                    <Route
                        path="/"
                        element={<LinkInput />}
                    />
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/signup"
                        element={<SignUp />}
                    />
                    <Route
                        path="/course"
                        element={<Course />}
                    />
                    <Route
                        path="/mycourses"
                        element={<MyCourses />}
                    />
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;
