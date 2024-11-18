import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "../ListItem/ListItem";
import { handleSeekChange } from "../../redux/playerSlice";

const ChapterList = () => {
    const { chapters } = useSelector((state) => state.player.value);
    const dispatch = useDispatch();

    const playOnSeek = (key) => {
        dispatch(
            handleSeekChange({
                playAt: chapters[key]["time"],
                index: key,
            })
        );
    };

    return (
        <div>
            {Object.keys(chapters).map((key) => {
                return (
                    <ListItem
                        key={key}
                        id={key}
                        title={chapters[key]["title"]}
                        played={chapters[key]["played"]}
                        playOnSeek={() => playOnSeek(key)}
                    />
                );
            })}
        </div>
    );
};

export default ChapterList;
