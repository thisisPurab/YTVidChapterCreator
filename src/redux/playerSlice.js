import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        url: "",
        pip: false,
        playing: false,
        controls: true,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playBackRate: 1.0,
        loop: false,
        playAt: 0,
        chapters: null,
        numChapters: 0,
        index: 0,
    },
    title: "",
    channel: "",
};

export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setInitialState: (state) => {
            state = {
                value: {
                    url: "",
                    pip: false,
                    playing: false,
                    controls: false,
                    light: false,
                    volume: 0.8,
                    muted: false,
                    played: 0,
                    loaded: 0,
                    duration: 0,
                    playBackRate: 1.0,
                    loop: false,
                    playAt: 0,
                    chapters: null,
                    numChapters: 0,
                    index: 0,
                },
                title: "",
                channel: "",
            };
        },
        handlePlayPause: (state) => {
            state.value.playing = !state.value.playing;
        },
        handleStop: (state) => {
            state.value.playing = false;
        },
        handlePause: (state) => {
            state.value.playing = false;
        },
        handlePlay: (state) => {
            state.value.playing = true;
        },
        handleSeekChange: (state, action) => {
            state.value.playAt = action.payload.playAt;
            state.value.index = action.payload.index;
        },
        setUrl: (state, action) => {
            state.value.url = action.payload;
        },
        setChapters: (state, action) => {
            state.value.chapters = action.payload;
            state.value.numChapters = Object.keys(action.payload).length;
        },
        setDetails: (state, action) => {
            state.title = action.payload.title;
            state.channel = action.payload.channel;
        },
        setChapterDone: (state, action) => {
            state.value.chapters[action.payload].played = true;
            state.value.index = action.payload + 1;
        },
    },
});

export const {
    handlePlayPause,
    handleStop,
    handlePause,
    handlePlay,
    handleSeekChange,
    setUrl,
    setChapters,
    setDetails,
    setChapterDone,
    setInitialState,
} = playerSlice.actions;

export default playerSlice.reducer;
