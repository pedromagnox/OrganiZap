<template>
    <wwEditorInputRow
        label="Sound"
        type="select"
        :model-value="id"
        placeholder="Select a sound"
        :options="soundInstancesOptions"
        bindable
        @update:modelValue="setid"
    />
    <div class="content-primary p-2 mb-4 border-stale-100 rounded-02">
        <span class="label-md mb-2 text-stale-600">Be careful</span>
        <p class="body-sm">
            Make sure you properly load your sound using the "Load Sound" action before using it in any other action of
            this plugin.
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

        const soundInstancesOptions = computed(() =>
            Object.values(sounds.value).map(sound => ({
                label: sound.id,
                value: sound.id,
            }))
        );

        return {
            sounds,
            soundInstancesOptions,
        };
    },
    computed: {
        id() {
            return this.args.id;
        },
    },
    methods: {
        setid(id) {
            this.$emit('update:args', { ...this.args, id });
        },
    },
};
</script>
