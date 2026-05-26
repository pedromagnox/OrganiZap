import { getSoundManagerInstance } from './soundManagerInstances';

export default {
    soundManager: null,

    async onLoad(settings) {
        this.soundManager = getSoundManagerInstance(this.id);
    },

    async loadSound({ id, src, options, metadata }) {
        return await this.soundManager.loadSound(id, src, options, metadata);
    },

    async unloadSound({ id }) {
        await this.soundManager.unloadSound(id);
    },

    async playSound({ id }) {
        await this.soundManager.playSound(id);
    },

    async pauseSound({ id }) {
        await this.soundManager.pauseSound(id);
    },

    async stopSound({ id }) {
        await this.soundManager.stopSound(id);
    },

    async seekTo({ id, time }) {
        await this.soundManager.seekTo(id, time);
    },

    async muteSound({ id, mute }) {
        await this.soundManager.muteSound(id, mute);
    },

    async setVolume({ id, volume }) {
        await this.soundManager.setVolume(id, volume);
    },

    async fadeSound({ id, fromVolume, toVolume, duration }) {
        await this.soundManager.fadeSound(id, fromVolume, toVolume, duration);
    },

    async setRate({ id, rate }) {
        await this.soundManager.setRate(id, rate);
    },

    async setLoop({ id, loop }) {
        await this.soundManager.setLoop(id, loop);
    },
};
