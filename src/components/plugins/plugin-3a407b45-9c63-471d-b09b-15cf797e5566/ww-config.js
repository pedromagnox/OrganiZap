export default {
    editor: {
        designSystemId: '034f28c4-972a-4951-9abc-7a411412a8f2',
    },
    variables: [{ name: 'sounds', value: 'sounds', type: 'object', defaultValue: null }],
    actions: [
        {
            name: 'Load sound',
            code: 'loadSound',
            isAsync: true,
        },
        {
            name: 'Unload sound',
            code: 'unloadSound',
            isAsync: true,
        },
        {
            name: 'Play sound',
            code: 'playSound',
            isAsync: true,
        },
        {
            name: 'Pause sound',
            code: 'pauseSound',
            isAsync: true,
        },
        {
            name: 'Stop sound',
            code: 'stopSound',
            isAsync: true,
        },
        {
            name: 'Seek to time',
            code: 'seekTo',
            isAsync: true,
        },
        {
            name: 'Set volume',
            code: 'setVolume',
            isAsync: true,
        },
        {
            name: 'Mute sound',
            code: 'muteSound',
            isAsync: true,
        },
        {
            name: 'Fade sound',
            code: 'fadeSound',
            isAsync: true,
        },
        {
            name: 'Set playback rate',
            code: 'setRate',
            isAsync: true,
        },
        {
            name: 'Set loop',
            code: 'setLoop',
            isAsync: true,
        },
    ],
};
