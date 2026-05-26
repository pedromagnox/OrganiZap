<template>
    <wwEditorFormRow label="Sound ID">
        <div class="flex items-center">
            <wwEditorInput
                placeholder="Enter an unique ID for the sound"
                type="query"
                :model-value="id"
                @update:modelValue="setid"
                bindable
            />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="soundIdHelp" />
        </div>
    </wwEditorFormRow>
    <wwEditorInputRow label="Source" type="query" :model-value="src" bindable @update:modelValue="setsrc" />
    <wwEditorInputRow
        label="Options"
        type="array"
        :model-value="options"
        bindable
        @update:modelValue="setOptions"
        @add-item="setOptions([...options, {}])"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                type="query"
                :model-value="item.key"
                label="Key"
                placeholder="Option key"
                bindable
                small
                @update:modelValue="setItem({ ...item, key: $event })"
            />
            <wwEditorInputRow
                type="query"
                :model-value="item.value"
                label="Value"
                placeholder="Value"
                bindable
                small
                @update:modelValue="setItem({ ...item, value: $event })"
            />
        </template>
    </wwEditorInputRow>
    <wwEditorInputRow
        label="Metadata"
        type="array"
        :model-value="metadata"
        bindable
        @update:modelValue="setMetadata"
        @add-item="setMetadata([...metadata, {}])"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                type="query"
                :model-value="item.key"
                label="Key"
                placeholder="Metadata key"
                bindable
                small
                @update:modelValue="setItem({ ...item, key: $event })"
            />
            <wwEditorInputRow
                type="query"
                :model-value="item.value"
                label="Value"
                placeholder="Value"
                bindable
                small
                @update:modelValue="setItem({ ...item, value: $event })"
            />
        </template>
    </wwEditorInputRow>
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
    data() {
        return {
            soundIdHelp: `The sound ID need to be unique for each loaded sound.`,
        };
    },
    setup(props) {
        const { sounds } = getSoundManagerInstance(props.plugin.id);

        const id = computed(() => props.args.id);

        const idNotValid = computed(() =>
            Object.values(sounds.value)
                .map(sound => sound.id)
                .includes(id.value)
        );

        return {
            id,
            idNotValid,
        };
    },
    computed: {
        src() {
            return this.args.src;
        },
        options() {
            return this.args.options || [];
        },
        metadata() {
            return this.args.metadata || [];
        },
    },
    methods: {
        setid(id) {
            this.$emit('update:args', { ...this.args, id });
        },
        setsrc(src) {
            this.$emit('update:args', { ...this.args, src });
        },
        setOptions(options) {
            this.$emit('update:args', { ...this.args, options });
        },
        setMetadata(metadata) {
            this.$emit('update:args', { ...this.args, metadata });
        },
    },
};
</script>
