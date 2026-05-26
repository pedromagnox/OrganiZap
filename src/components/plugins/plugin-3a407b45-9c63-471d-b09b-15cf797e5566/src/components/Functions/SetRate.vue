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
    <wwEditorFormRow label="Playback Rate">
        <div class="flex items-center">
            <wwEditorInput type="number" :model-value="rate" bindable @update:modelValue="setRate" />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="playRateHelp" />
        </div>
    </wwEditorFormRow>
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
            playRateHelp: `The playback rate is the speed at which the sound is played. 1 is the normal speed, 0.5 is half the normal speed, 2 is twice the normal speed, etc.`,
        };
    },
    computed: {
        id() {
            return this.args.id;
        },
        rate() {
            return this.args.rate;
        },
    },
    methods: {
        setId(id) {
            this.$emit('update:args', { ...this.args, id });
        },
        setRate(rate) {
            this.$emit('update:args', { ...this.args, rate });
        },
    },
};
</script>
