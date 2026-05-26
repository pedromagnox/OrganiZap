export default {
    editor: {
        label: {
            en: 'Navigation menu',
            fr: 'Menu de navigation',
        },
    },
    options: {
        displayAllowedValues: ['flex', 'inline-flex'],
    },
    properties: {
        horizontalAlignement: {
            label: { en: 'Horizontal alignment', fr: 'Alignement horizontal' },
            type: 'TextRadioGroup',
            options: {
                choices: [
                    {
                        value: 'flex-start',
                        title: { en: 'Start', fr: 'Début' },
                        icon: 'align-x-start',
                    },
                    {
                        value: 'center',
                        title: { en: 'Center', fr: 'Milieu' },
                        icon: 'align-x-center',
                    },
                    { value: 'flex-end', title: { en: 'End', fr: 'Fin' }, icon: 'align-x-end' },
                    {
                        value: 'space-around',
                        title: { en: 'Space around', fr: 'Space around' },
                        icon: 'align-x-space-around',
                    },
                    {
                        value: 'space-between',
                        title: { en: 'Space between', fr: 'Space between' },
                        icon: 'align-x-space-between',
                    },
                ],
            },
            defaultValue: 'flex-start',
            classes: true,
            states: true,
        },
        verticalAlignement: {
            label: { en: 'Vertical alignment', fr: 'Alignement vertical' },
            type: 'TextRadioGroup',
            options: {
                choices: [
                    { value: 'flex-start', title: { en: 'Start', fr: 'Début' }, icon: 'align-y-start' },
                    { value: 'center', title: { en: 'Center', fr: 'Milieu' }, icon: 'align-y-center' },
                    { value: 'flex-end', title: { en: 'End', fr: 'Fin' }, icon: 'align-y-end' },
                    {
                        value: 'stretch',
                        title: { en: 'Stretch', fr: 'Stretch' },
                        icon: 'align-y-stretch',
                    },
                    {
                        value: 'baseline',
                        title: { en: 'Baseline', fr: 'Baseline' },
                        icon: 'align-y-baseline',
                    },
                ],
            },
            defaultValue: 'center',
            classes: true,
            states: true,
        },
        pushLast: {
            label: { en: 'Push last to the end', fr: 'Push last to the end' },
            type: 'OnOff',
            defaultValue: false,
            classes: true,
            states: true,
        },
        fullHeight: {
            label: { en: 'Menu fills page height', fr: 'Menu fills page height' },
            type: 'OnOff',
            responsive: true,
            defaultValue: true,
            classes: true,
            states: true,
        },
        backgroundColor: {
            label: { en: 'Background color' },
            type: 'Color',
            responsive: true,
            classes: true,
            states: true,
            bindable: true,
        },
        backdropColor: {
            label: { en: 'Backdrop color' },
            type: 'Color',
            responsive: true,
            classes: true,
            states: true,
            bindable: true,
        },

        // Settings
        menuBreakpoint: {
            label: { en: 'Mobile menu starting at' },
            type: 'TextRadioGroup',
            options: {
                choices: [
                    { value: '16/desktop', title: { en: 'Laptop' }, icon: 'monitor' },
                    { value: '16/tablet', title: { en: 'Tablet' }, icon: 'tablet' },
                    { value: '16/mobile', title: { en: 'Mobile' }, icon: 'mobile' },
                ],
            },
            section: 'settings',
            defaultValue: 'mobile',
            classes: true,
            states: true,
        },
        menuType: {
            label: { en: 'Menu type', fr: 'Type de menu' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'dropdown', label: { en: 'Dropdown' } },
                    { value: 'left', label: { en: 'Hover from left' } },
                    { value: 'right', label: { en: 'Hover from right' } },
                ],
            },
            section: 'settings',
            defaultValue: 'right',
            responsive: true,
            classes: true,
            states: true,
            bindable: true,
        },
        menuSize: {
            hidden: content => content.menuType == 'right' || content.menuType == 'left',
            type: 'Length',
            label: {
                en: 'Menu size',
                fr: 'Menu size',
            },
            options: {
                unitChoices: [{ value: '%', label: '%', min: 20, max: 100 }],
            },
            section: 'settings',
            responsive: true,
            classes: true,
            states: true,
            bindable: true,
        },
        topOrigin: {
            label: { en: 'Top origin', fr: 'Top origin' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'top', label: { en: 'Top' } },
                    { value: 'under-navbar', label: { en: 'Under the navbar' } },
                ],
            },
            section: 'settings',
            responsive: true,
            classes: true,
            states: true,
            bindable: true,
            defaultValue: 'under-navbar',
        },
        triggerType: {
            label: {
                en: 'Trigger type',
                fr: 'Trigger type',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'button', label: { en: 'Button', fr: 'Bouton' } },
                    { value: 'icon', label: { en: 'Icon', fr: 'Icône' } },
                    { value: 'image', label: { en: 'Image', fr: 'Image' } },
                ],
            },
            section: 'settings',
            responsive: true,
            defaultValue: 'button',
        },
        closeTrigger: {
            label: {
                en: 'Different element for closing',
                fr: 'Element different pour fermer',
            },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
        },
        toggle: {
            type: 'Button',
            options: {
                text: { en: 'Toggle mobile menu' },
                action: 'toggleMenu',
            },
            section: 'settings',
        },
        elements: {
            hidden: true,
            defaultValue: [
                { isWwObject: true, type: 'ww-text', content: { text: { en: 'Lien 1' } } },
                { isWwObject: true, type: 'ww-text', content: { text: { en: 'Lien 2' } } },
                { isWwObject: true, type: 'ww-text', content: { text: { en: 'Lien 3' } } },
            ],
        },
        button: {
            // It's called button to ensure backward compatibility
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-button' },
        },
        closeElement: {
            hidden: true,
            defaultValue: null,
        },
    },
};
