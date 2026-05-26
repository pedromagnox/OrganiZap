<template>
    <div
        class="navigation-menu"
        :style="navigationStyle"
        ww-responsive="navigation-menu"
        :class="{ editing: isEditing }"
    >
        <wwLayout
            class="navigation-menu__items"
            :class="{ '-pushLast': !!content.pushLast }"
            path="elements"
            ww-responsive="menu-layout"
            :style="layoutStyle"
            direction="row"
        ></wwLayout>
        <button
            v-if="content.triggerType !== 'button' && displayOpenTrigger"
            class="navigation-menu__trigger"
            ww-responsive="menu-button"
            :style="iconStyle"
            @click="triggerToggle"
        >
            <wwElement v-bind="content.button"></wwElement>
        </button>
        <div
            v-else-if="content.triggerType === 'button' && displayOpenTrigger"
            class="navigation-menu__trigger"
            ww-responsive="menu-button"
            :style="iconStyle"
            @click="triggerToggle"
        >
            <wwElement v-bind="content.button"></wwElement>
        </div>

        <button
            v-if="content.triggerType !== 'button' && displayCloseTrigger"
            class="navigation-menu__trigger"
            ww-responsive="menu-button-close"
            :style="iconStyle"
            @click="triggerToggle"
        >
            <wwElement class="closeElement" :class="{ editing: isEditing }" v-bind="content.closeElement"></wwElement>
        </button>
        <div
            v-else-if="content.triggerType === 'button' && displayCloseTrigger"
            class="navigation-menu__trigger"
            ww-responsive="menu-button-close"
            :style="iconStyle"
            @click="triggerToggle"
        >
            <wwElement class="closeElement" :class="{ editing: isEditing }" v-bind="content.closeElement"></wwElement>
        </div>

        <div
            v-show="isMenuDisplayed"
            class="navigation-menu__backdrop"
            :class="{ open: isOpen }"
            ww-responsive="backdrop"
            :style="{ backgroundColor: content.backdropColor }"
            @click.prevent.stop="triggerToggle"
        ></div>
        <div v-show="isMenuDisplayed" class="navigation-menu__container" :class="{ open: isOpen }">
            <div
                class="navigation-menu__panel"
                :class="[content.menuType, { full: content.fullHeight }]"
                ww-responsive="panel"
                :style="navigationPanelStyle"
            >
                <wwLayout
                    class="navigation-menu__panel-items"
                    :class="{ '-pushLast': !!content.pushLast }"
                    path="elements"
                >
                </wwLayout>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
        wwFrontState: { type: Object, required: true },
    },
    emits: ['update:content'],
    data() {
        return {
            isOpen: false,
            menuTop: 0,
            menuMaxHeight: '',
        };
    },
    computed: {
        isMenuDisplayed() {
            if (this.content.menuBreakpoint === 'laptop') return true;
            if (this.content.menuBreakpoint === 'tablet')
                return this.wwFrontState.screenSize === 'mobile' || this.wwFrontState.screenSize === 'tablet';
            return this.wwFrontState.screenSize === 'mobile';
        },
        navigationStyle() {
            if (this.isMenuDisplayed) return { 'justify-content': 'flex-end' };
            else return { 'justify-content': 'unset' };
        },
        layoutStyle() {
            return {
                justifyContent: this.content.horizontalAlignement,
                alignItems: this.content.verticalAlignement,
                display: this.isMenuDisplayed ? 'none' : 'flex',
            };
        },
        iconStyle() {
            return {
                display: this.isMenuDisplayed ? 'block' : 'none',
            };
        },
        navigationPanelStyle() {
            return {
                '--menu-size': this.content.menuType === 'dropdown' ? '100%' : this.content.menuSize,
                top: `${this.menuTop}px`,
                'max-height': this.menuMaxHeight,
                'background-color': this.content.backgroundColor,
            };
        },
        isEditing() {
            // eslint-disable-next-line no-unreachable
            return false;
        },
        displayOpenTrigger() {
            if (!this.content.closeTrigger) {
                return true;
            } else if (this.content.closeTrigger && !this.isOpen) {
                return true;
            } else {
                return false;
            }
        },
        displayCloseTrigger() {
            return this.content.closeTrigger && this.isOpen;
        },
    },
    watch: {
        'content.topOrigin'() {
            if (this.isOpen) this.computeMenuValues();
        },
    },
    mounted() {
        wwLib.$on('wwLink:clicked', this.closeMenu);

        if (this.content.closeTrigger) {
            wwLib.$on('wwLink:closePopup', this.closeMenu);
        }
    },
    unmounted() {
        wwLib.$off('wwLink:clicked', this.closeMenu);
        wwLib.$off('wwLink:closePopup', this.closeMenu);
    },
    methods: {
        triggerToggle() {
            this.toggleMenu();
        },
        toggleMenu() {
            this.isOpen = !this.isOpen;
            if (this.isOpen) this.computeMenuValues();
        },
        computeMenuValues() {
            this.menuTop =
                this.content.topOrigin === 'top'
                    ? this.$el.getBoundingClientRect().top
                    : this.$el.getBoundingClientRect().bottom;
            this.menuMaxHeight = `calc(100vh - ${this.menuTop}px)`;
        },
        closeMenu() {
            this.isOpen = false;
        },

    },
};
</script>

<style lang="scss" scoped>
:root {
    --menu-size: '60%';
}

.navigation-menu {
    position: relative;
    &__trigger {
        min-width: 10px;
        min-height: 10px;

        .closeElement {
            &.editing {
                z-index: 11;
            }
        }
    }

    &__items {
        display: flex;
        flex: 1;
    }

    &__panel-items {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    &__panel {
        overflow: visible;
        pointer-events: all;
        z-index: 10;
        width: var(--menu-size);
        &.right,
        &.left {
            position: fixed;
            top: 0;
            transition: transform 0.3s ease;
            &.full {
                height: 100vh;
                overflow-y: auto;
            }
        }
        &.right {
            right: 0;
            transform: translate(100%, 0);
        }
        &.left {
            left: 0;
            transform: translate(-100%, 0);
        }
        &.dropdown {
            position: absolute;
            right: 0;
            left: 0;
            top: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            visibility: hidden;
        }
        min-width: 30px;
        background: white;

        overflow-y: auto;
        overflow: -moz-scrollbars-none;
        &::-webkit-scrollbar {
            width: 0 !important;
        }
    }

    &__backdrop {
        z-index: 10;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        opacity: 0;
        height: 100vh;

        &.open {
            opacity: 1;
            pointer-events: all;
        }
    }

    &__container {
        z-index: 11;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        opacity: 0;
        height: 100vh;

        &.open {
            opacity: 1;

            & .dropdown {
                pointer-events: all;
                visibility: visible;
            }
            & .right {
                transform: translate(0, 0);
            }
            & .left {
                transform: translate(0, 0);
            }
        }
    }
}
.navigation-menu__items.-pushLast:last-child {
    margin-left: auto !important;
}

.navigation-menu__panel-items.-pushLast:last-child {
    margin-top: auto !important;
}
</style>
