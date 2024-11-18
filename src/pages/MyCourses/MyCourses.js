import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./MyCourses.module.css";
import CourseCard from "../../components/CourseCard/CourseCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const MyCourses = () => {
    const navigate = useNavigate();
    const { uid } = useSelector((state) => state.user.value);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (!uid) {
            navigate("/login");
        }

        const getChapters = async () => {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();

            var courseList = [];
            // eslint-disable-next-line array-callback-return
            Object.keys(data.courses).map((key) => {
                courseList.push(data.courses[key]);
            });

            setCourses(courseList);
        };

        getChapters();
    }, [navigate, uid]);

    return (
        <div className={styles.grid}>
            {courses.length > 0 &&
                courses.map((course) => (
                    <CourseCard
                        course={course}
                        key={course.videoID}
                    ></CourseCard>
                ))}
        </div>
    );
};

export default MyCourses;
