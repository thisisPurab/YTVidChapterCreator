import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./LinkInput.module.css";
import axios from "axios";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { setCourses } from "../../redux/userSLice";
import {
    setChapters,
    setDetails,
    setInitialState,
    setUrl,
} from "../../redux/playerSlice";

const LinkInput = () => {
    const { uid, name, courses } = useSelector((state) => state.user.value);
    const linkRef = useRef(null);
    const navigate = useNavigate();
    const baseURL = "https://www.googleapis.com/youtube/v3/videos";
    const key = process.env.REACT_APP_YOUTUBE_API_KEY;
    const dispatch = useDispatch();
    const [chapters, setchapters] = useState(null);
    const [title, setTitle] = useState("");
    const [channel, setChannel] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    function getVideoId(url) {
        let regex = /https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

        const id = url.match(regex)[1];
        return id;
    }

    const getDescription = async () => {
        const url = linkRef.current.value;
        const videoID = getVideoId(url);

        if (!videoID) {
            console.error("Invalid YouTube URL");
            return;
        }

        if (courses.includes(videoID)) {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            dispatch(setChapters(data.courses[videoID].chapters));
            dispatch(
                setDetails({
                    title: data.courses[videoID].title,
                    channel: data.courses[videoID].channel,
                })
            );
            navigate("/course");
            return;
        }

        dispatch(setCourses(videoID));

        try {
            const response = await axios.get("http://localhost:5000/proxy", {
                params: {
                    baseURL,
                    part: "snippet",
                    key,
                    id: videoID,
                },
            });

            const snippet = response.data.items[0].snippet;
            const parsedChapters = parseDescription(snippet.description);

            const chaptersList = {};
            parsedChapters.forEach((chapter, index) => {
                const timeParts = chapter[0].split(":").map(Number);
                const seconds =
                    timeParts.length === 2
                        ? timeParts[0] * 60 + timeParts[1]
                        : timeParts[0] * 3600 +
                          timeParts[1] * 60 +
                          timeParts[2];

                chaptersList[index] = {
                    time: seconds,
                    title: chapter[1],
                    played: false,
                };

                if (index > 0) {
                    chaptersList[index - 1].end = seconds;
                }
            });

            // Finalize the last chapter's end time as null
            if (Object.keys(chaptersList).length > 0) {
                const lastIndex = Object.keys(chaptersList).length - 1;
                chaptersList[lastIndex].end = null;
            }

            // Update local state and Redux store
            setchapters(chaptersList);
            dispatch(setChapters(chaptersList));
            dispatch(
                setDetails({
                    title: snippet.title,
                    channel: snippet.channelTitle,
                })
            );
            setTitle(snippet.title);
            setChannel(snippet.channelTitle);
            setThumbnail(snippet.thumbnails.high.url);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    const parseDescription = (description) => {
        var list_of_chapters = [];
        var file = [];

        file = description.split("\n");
        for (var l in file) {
            var line = file[l].trim();
            var result = "";
            var chapter = "";

            result = line.match(/\(?(\d+[:]\d+[:]\d+)\)?/);

            if (result === null) {
                result = line.match(/\(?(\d+[:]\d+)\)?/);
            }

            if (result === null) continue;
            chapter = line.split(result[1]);
            list_of_chapters.push([result[1], chapter[1]]);
        }

        return list_of_chapters;
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch(setInitialState());
        dispatch(setUrl(linkRef.current.value));
        await getDescription();
    };

    useEffect(() => {
        if (chapters != null) {
            var url = linkRef.current.value;
            let videoID = getVideoId(url);

            async function sendData() {
                console.log("hello world");
                console.log(chapters);
                await updateDoc(doc(db, "users", uid), {
                    [`courses.${videoID}`]: {
                        videoID: videoID,
                        chapters: chapters,
                        title: title,
                        channel: channel,
                        thumbnail: thumbnail,
                    },
                });
                navigate("/course");
            }
            sendData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chapters]);

    useEffect(() => {
        if (!uid) {
            navigate("/login");
        }
    }, [uid, navigate]);

    return (
        <div>
            <form className={styles.linkinput}>
                <h1>Welcome {name}</h1>
                <input
                    style={{ color: "rgb(216, 212, 207)" }}
                    type="text"
                    name="url"
                    ref={linkRef}
                    placeholder="Paste the YouTube url"
                />
                <button
                    onClick={handleClick}
                    style={{ color: "rgb(216, 212, 207)" }}
                >
                    Create
                </button>
            </form>
        </div>
    );
};

export default LinkInput;
