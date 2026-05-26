<template>
    <wwEditorInputRow
        label="Sound ID"
        type="select"
        :model-value="id"
        :options="soundOptions"
        bindable
        @update:modelValue="setId"
    />
    <div class="content-primary p-2 mb-4 border-stale-100 rounded-02">
        <span class="label-md mb-2 text-stale-600">Be careful</span>
        <p class="body-sm">
            Make sure you properly load your sound using the "Load Sound" action before using it in any other action of
            this plugin.
        </p>
    </div>
    <wwEditorFormRow label="Volume">
        <div class="flex items-center">
            <wwEditorInput type="number" :model-value="volume" bindable @update:modelValue="setVolume" />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="volumeHelp" />
        </div>
    </wwEditorFormRow>
    <div class="content-primary p-2 m4-4 border-stale-100 rounded-02">
        <span class="label-md mb-2 text-stale-600">Mobile Limitation</span>
        <p class="body-sm">
            Please note that dynamic (through workflows) volume adjustment is unavailable on mobile devices due to
            technical limitations beyond our control, in compliance with web standards.
        </p>
    </div>
</template>

<script>
import { computed } from 'vue';
import { getSoundManagerInstance } from '../../soundManagerInstances';

export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Object, required: true },
    },
    emits: ['update:args'],
    setup(props) {
        const { sounds } = getSoundManagerInstance(props.plugin.id);

        const soundOptions = computed(() =>
            Object.values(sounds.value).map(sound => ({
                label: sound.id,
                value: sound.id,
            }))
        );

        return { soundOptions };
    },
    data() {
        return {
            volumeHelp: `The volume is a number between 0 and 1. 0 is silent, 0.5 is half volume, 1 is full volume.`,
        };
    },
    computed: {
        id() {
            return this.args.id;
        },
        volume() {
            return this.args.volume;
        },
    },
    methods: {
        setId(id) {
            this.$emit('update:args', { ...this.args, id });
        },
        setVolume(volume) {
            this.$emit('update:args', { ...this.args, volume });
        },
    },
};
</script>
