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
    <wwEditorInputRow label="Mute" type="onoff" :model-value="mute" bindable @update:modelValue="setMute" />
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
    computed: {
        id() {
            return this.args.id;
        },
        mute() {
            return this.args.mute;
        },
    },
    methods: {
        setId(id) {
            this.$emit('update:args', { ...this.args, id });
        },
        setMute(mute) {
            this.$emit('update:args', { ...this.args, mute });
        },
    },
};
</script>
