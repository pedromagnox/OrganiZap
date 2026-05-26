import emitter from 'tiny-emitter/instance';
import services from './services/index.js';
import { useIconsStore } from '@/pinia/icons';

 /* wwFront:start */
// eslint-disable-next-line no-undef
import plugin_832d6f7a_42c3_43f1_a3ce_9a678272f811 from '@/components/plugins/plugin-832d6f7a-42c3-43f1-a3ce-9a678272f811/src/wwPlugin.js';
import plugin_f9ef41c3_1c53_4857_855b_f2f6a40b7186 from '@/components/plugins/plugin-f9ef41c3-1c53-4857-855b-f2f6a40b7186/src/wwPlugin.js';
import plugin_3a407b45_9c63_471d_b09b_15cf797e5566 from '@/components/plugins/plugin-3a407b45-9c63-471d-b09b-15cf797e5566/src/wwPlugin.js';
import plugin_2bd1c688_31c5_443e_ae25_59aa5b6431fb from '@/components/plugins/plugin-2bd1c688-31c5-443e-ae25-59aa5b6431fb/src/wwPlugin.js';
import plugin_1fa0dd68_5069_436c_9a7d_3b54c340f1fa from '@/components/plugins/plugin-1fa0dd68-5069-436c-9a7d-3b54c340f1fa/src/wwPlugin.js';
import plugin_fbf0feec_356b_461b_8738_3b1f44edaf02 from '@/components/plugins/plugin-fbf0feec-356b-461b-8738-3b1f44edaf02/src/wwPlugin.js';
import plugin_9c40819b_4a8f_468f_9ba5_4b9699f3361f from '@/components/plugins/plugin-9c40819b-4a8f-468f-9ba5-4b9699f3361f/src/wwPlugin.js';
/* wwFront:end */

import { computed, reactive } from 'vue';
import { useBackTableViewsStore } from '@/pinia/backTableViews.js';
import { useBackAuthStore } from '@/pinia/backAuth.js';
import { getRuntimeEnvironment } from '@/helpers/frontEnv.js';
import { useEnvVariablesStore } from '@/pinia/envVariables.js';

export default {
    ...services,
     $on(event, fn) {
        emitter.on(event, fn);
    },
    $once(event, fn) {
        emitter.once(event, fn);
    },
    $emit(event, ...args) {
        if (!event) {
            return;
        }
        emitter.emit(event, ...args);
    },
    $off(event, fn) {
        emitter.off(event, fn);
    },
     front: {},
    $focus: null,
    env: process.env.NODE_ENV,
    async initFront({ router, store }) {
 
        this.front.router = router;
        /* wwFront:start */
        this.$store = store;
        /* wwFront:end */

        //Init services
        this.wwLog.init();

 
        await this.wwWebsiteData.init();
        this.wwLang.init(router);

        /* wwFront:start */
        // eslint-disable-next-line no-undef
        wwLib.wwPluginHelper.registerPlugin('plugin-832d6f7a-42c3-43f1-a3ce-9a678272f811', plugin_832d6f7a_42c3_43f1_a3ce_9a678272f811);
wwLib.wwPluginHelper.registerPlugin('plugin-f9ef41c3-1c53-4857-855b-f2f6a40b7186', plugin_f9ef41c3_1c53_4857_855b_f2f6a40b7186);
wwLib.wwPluginHelper.registerPlugin('plugin-3a407b45-9c63-471d-b09b-15cf797e5566', plugin_3a407b45_9c63_471d_b09b_15cf797e5566);
wwLib.wwPluginHelper.registerPlugin('plugin-2bd1c688-31c5-443e-ae25-59aa5b6431fb', plugin_2bd1c688_31c5_443e_ae25_59aa5b6431fb);
wwLib.wwPluginHelper.registerPlugin('plugin-1fa0dd68-5069-436c-9a7d-3b54c340f1fa', plugin_1fa0dd68_5069_436c_9a7d_3b54c340f1fa);
wwLib.wwPluginHelper.registerPlugin('plugin-fbf0feec-356b-461b-8738-3b1f44edaf02', plugin_fbf0feec_356b_461b_8738_3b1f44edaf02);
wwLib.wwPluginHelper.registerPlugin('plugin-9c40819b-4a8f-468f-9ba5-4b9699f3361f', plugin_9c40819b_4a8f_468f_9ba5_4b9699f3361f);
        /* wwFront:end */

 
        services.scrollStore.start();
        services.keyboardEventStore.start();
        services.pwaStore.start();
    },
     // TODO: Verify with Alexis, still uses wwImageMultiLang
    getResponsiveStyleProp({ store, style, uid, states = [], prop }) {
        store = store || wwLib.getFrontWindow().wwLib.$store;
        if (!style && uid) {
            const wwObject = this.$store.getters['websiteData/getWwObjects'][uid];
            if (!wwObject) return '';
            style = (wwObject._state || {}).style || {};
        }

        const screenSizes = store.getters['front/getScreenSizes'];
        const screenSize = store.getters['front/getScreenSize'];

        let value = '';

        for (const media in screenSizes) {
            if (style[media] && typeof style[media][prop] !== 'undefined') {
                value = style[media][prop];
            }
            if (media === screenSize) {
                break;
            }
        }
        for (const state of states) {
            for (const media in screenSizes) {
                if (style[`${state}_${media}`] && style[`${state}_${media}`][prop]) {
                    value = style[`${state}_${media}`][prop];
                }
                if (media === screenSize) {
                    break;
                }
            }
        }

        return value;
    },
    globalContext: reactive({
        auth: computed(() => {
            const backAuthStore = useBackAuthStore(wwLib.$pinia);
            return {
                user: backAuthStore.user,
                session: backAuthStore.session,
                isAuthenticated: backAuthStore.isAuthenticated,
            };
        }),
        env: computed(() => {
            const envVariablesStore = useEnvVariablesStore(wwLib.$pinia);
            let env = wwLib.getEnvironment();
            if (env === 'preview') env = 'production';
            return Object.values(envVariablesStore.values).reduce((acc, envVariable) => {
                acc[envVariable.name] = envVariable[`${env}Value`];
                return acc;
            }, {});
        }),
        tableViews: computed(() => {
            const backTableViewsStore = useBackTableViewsStore(wwLib.$pinia);
            return backTableViewsStore?.data;
        }),
        page: computed(() => {
            const page = wwLib.$store.getters['websiteData/getPage'];
            if (!page) return {};
            else if (!page.cmsDataSetPath) return { ...pageSanitizer(page) };
            return { ...pageSanitizer(page), data: wwLib.$store.getters['data/getPageCollectionData'] };
        }),
        pageParameters: computed(() => {
            const pageParameters = Object.values(wwLib.$store.getters['data/getPageParameterVariables']);
            const pageParametersValueMap = {};
            for (const pageParameter of pageParameters) pageParametersValueMap[pageParameter.id] = pageParameter.value;
            return pageParametersValueMap;
        }),
        pages: computed(() => {
            const pages = wwLib.$store.getters['websiteData/getPages'];
            const pagesValueMap = {};
            for (const page of pages) pagesValueMap[page.id] = pageSanitizer(page);
            return pagesValueMap;
        }),
        colors: computed(() => {
            const theme = wwLib.$store.getters['front/getTheme'];
             /* wwFront:start */
            // eslint-disable-next-line no-unreachable, no-undef
            return theme === 'dark' ? {"45ca03be-37d8-40dd-8f3d-98ed44ff55ff":"#134D37","654a67f0-62cd-4a0e-9939-cc900e7b3680":"#1F272A","af3ec3e1-bad9-4a02-bc92-b0b615d8e483":"#d50000","a70097e5-d1ff-444c-bc4d-02fab0824585":"#171717","aa33408e-e0e2-4726-bbef-5bec54357d1c":"#1f1f1f","1a766c86-8175-4496-8e81-64a769c33595":"#242424","ebbbc0f4-27f6-4b89-8809-c7a49cb99757":"#292929","da2a8a92-a9d4-4de3-aee8-85d6731ba7ee":"#fafafa","fcaab168-2a92-400e-b299-510eed26c40a":"#1AA058","0e4c477d-4f0a-4cb4-86b0-fa31115dec3d":"#85e0ba","00dcb4ab-1378-4b81-8e20-2fec4aa16f79":"#006239","281eb8b2-ba4e-434c-a038-8c330469de07":"#171717","c1b55f59-ee3d-48b6-bf1c-4b6e14b20d4b":"#FAFAFA","38bc022d-c982-4e76-b832-6ee54f89ff31":"#171717","8d7ad462-0a58-468f-8048-64dabc73f75b":"#757575","df33a206-d0b7-43de-8279-ccba4d23d38e":"#1976D2","908b2f9d-d2cd-49ce-80d1-fc21365d5070":"#616161","c4ec2e7b-910a-41f1-b920-6a92e2eab46f":"#424242","45524f7b-0174-40d7-bf15-74f538a131e6":"#212121","ae3ff2ca-bc89-47ce-8652-4f1637c584fd":"#757575","a9704121-3b75-4afa-a32b-39311a5ff46e":"#f57f17","1d928af9-e285-4043-a99f-501350bb73b7":"#64D8A3","e44a345c-e3df-4f3f-9fab-14ca138169bc":"#2DC182","dc3f456a-dee1-47ed-a140-c9d6dbc31f69":"#097C4F"} : {"45ca03be-37d8-40dd-8f3d-98ed44ff55ff":"#D8FDD2","654a67f0-62cd-4a0e-9939-cc900e7b3680":"#FFFFFF","af3ec3e1-bad9-4a02-bc92-b0b615d8e483":"#D50000","a70097e5-d1ff-444c-bc4d-02fab0824585":"#f8f8f8","aa33408e-e0e2-4726-bbef-5bec54357d1c":"#fcfcfc","1a766c86-8175-4496-8e81-64a769c33595":"#f6f6f6","ebbbc0f4-27f6-4b89-8809-c7a49cb99757":"#ededed","da2a8a92-a9d4-4de3-aee8-85d6731ba7ee":"#212121","fcaab168-2a92-400e-b299-510eed26c40a":"#2DC182","0e4c477d-4f0a-4cb4-86b0-fa31115dec3d":"#097c4f","00dcb4ab-1378-4b81-8e20-2fec4aa16f79":"#72E3AD","281eb8b2-ba4e-434c-a038-8c330469de07":"#FAFAFA","c1b55f59-ee3d-48b6-bf1c-4b6e14b20d4b":"#FAFAFA","38bc022d-c982-4e76-b832-6ee54f89ff31":"#212121","8d7ad462-0a58-468f-8048-64dabc73f75b":"#757575","df33a206-d0b7-43de-8279-ccba4d23d38e":"#1976D2","908b2f9d-d2cd-49ce-80d1-fc21365d5070":"#EEEEEE","c4ec2e7b-910a-41f1-b920-6a92e2eab46f":"#F5F5F5","45524f7b-0174-40d7-bf15-74f538a131e6":"#FAFAFA","ae3ff2ca-bc89-47ce-8652-4f1637c584fd":"#E0E0E0","a9704121-3b75-4afa-a32b-39311a5ff46e":"#FFC349","1d928af9-e285-4043-a99f-501350bb73b7":"#64D8A3","e44a345c-e3df-4f3f-9fab-14ca138169bc":"#2DC182","dc3f456a-dee1-47ed-a140-c9d6dbc31f69":"#097C4F"};
            /* wwFront:end */
        }),
        spacings:
         /* wwFront:start */
        // eslint-disable-next-line no-unreachable, no-undef
        {},
        /* wwFront:end */
        typographies:
         /* wwFront:start */
        // eslint-disable-next-line no-unreachable, no-undef
        {"a3751aba-49a8-450e-95bb-c9659e8c4b8d":"400 24px/normal var(--ww-default-font-family, sans-serif)","f45361d8-912f-4989-9cc3-a55e124aabcd":"400 20px/normal var(--ww-default-font-family, sans-serif)","adac3ff4-3545-4bb9-b302-794720892570":"400 14px/normal var(--ww-default-font-family, sans-serif)","93d03071-b778-4056-9bde-ebc280d9b5a1":"400 28px/normal var(--ww-default-font-family, sans-serif)","4aed31e9-926f-47e2-92ee-e501f7fd31c3":"400 16px/normal var(--ww-default-font-family, sans-serif)","75397075-4e68-4734-9019-027b82139925":"400 18px/normal var(--ww-default-font-family, sans-serif)","ef567cc6-1169-4d4f-8b0a-7a9c6d728fee":"400 12px/normal var(--ww-default-font-family, sans-serif)","4bf067fc-1391-4139-bb0c-66cb02726057":"400 17px/normal var(--ww-default-font-family, sans-serif)","f57445b5-1393-47be-a7af-e0f5eed9b6d5":"400 15px/normal var(--ww-default-font-family, sans-serif)","a178dd50-ee50-4987-94f2-118352845554":"400 19px/normal var(--ww-default-font-family, sans-serif)","b95835aa-20f8-48a3-be09-ed84e8742d51":"400 25px/normal var(--ww-default-font-family, sans-serif)"},
        /* wwFront:end */
        browser: computed(() => {
            const router = wwLib.manager ? wwLib.getEditorRouter() : wwLib.getFrontRouter();
            const currentRoute = router.currentRoute.value;
            let currentQueries = currentRoute.query;
             return {
                url: window.location.origin + currentRoute.fullPath,
                path: currentRoute.path,
                // verify if auth plugin
                 /* wwFront:start */
                // eslint-disable-next-line no-dupe-keys
                source: currentQueries._source,
                /* wwFront:end */
                query: currentQueries,
                domain: window.location.hostname,
                baseUrl: window.location.origin,
                breakpoint: wwLib.$store.getters['front/getScreenSize'],
                environment: wwLib.getEnvironment(),
                theme: wwLib.$store.getters['front/getTheme'],
            };
        }),
        pwa: services.pwaStore.pwa,
        screen: services.scrollStore.screen,
        componentPositionInfo: services.scrollStore.componentPositionInfo,
    }),

    pageData: computed(() => {
        const lang = wwLib.$store.getters['front/getLang'];
        const cmsDataSetPath = wwLib.$store.getters['websiteData/getPage'].cmsDataSetPath;
        if (!cmsDataSetPath) {
            return { lang };
        }

        return { lang, data: wwLib.$store.getters['data/getPageCollectionData'] };
    }),

    getEnvironment() {
        return getRuntimeEnvironment();
    },

    useBaseTag() {
        return (
            wwLib.getEnvironment() === 'production' &&
            window.wwg_designInfo.baseTag &&
            window.wwg_designInfo.baseTag.href
        );
    },

    getBaseTag() {
        let baseTag = window.wwg_designInfo.baseTag?.href || '';
        if (!baseTag.startsWith('/')) {
            baseTag = '/' + baseTag;
        }
        if (!baseTag.endsWith('/')) {
            baseTag += '/';
        }
        return baseTag;
    },

    /**
     * @PUBLIC_API
     */
    getFrontWindow() {
        if (document.querySelector('.ww-manager-iframe')) {
            return document.querySelector('.ww-manager-iframe').contentWindow;
        }
        return window;
    },

    /**
     * @PUBLIC_API
     */
    getFrontDocument() {
        return this.getFrontWindow().document;
    },

    /**
     * @PUBLIC_API
     */
    getFrontRouter() {
        return this.front.router;
    },

    /**
     * @PUBLIC_API
     */
    getEditorWindow() {
         // eslint-disable-next-line no-unreachable
        return null;
    },

    /**
     * @PUBLIC_API
     */
    getEditorDocument() {
         // eslint-disable-next-line no-unreachable
        return null;
    },

    /**
     * @PUBLIC_API
     */
    getEditorRouter() {
        return this.editor.router;
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwApp.goTo
     */
    goTo(...args) {
        wwLib.wwLog.warn('wwLib.goTo is DEPRECATED, use wwLib.wwApp.goTo instead');
        wwLib.wwApp.goTo(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.getStyleFromToken
     */
    getStyleFromToken(...args) {
        // wwLib.wwLog.warn('wwLib.getStyleFromToken is DEPRECATED, use wwLib.wwUtils.getStyleFromToken instead');
        return wwLib.wwUtils.getStyleFromToken(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.getTypoFromToken
     */
    getTypoFromToken(...args) {
        // wwLib.wwLog.warn('wwLib.getTypoFromToken is DEPRECATED, use wwLib.wwUtils.getTypoFromToken instead');
        return wwLib.wwUtils.getTypoFromToken(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED
     */
    element(value) {
        wwLib.wwLog.warn('wwLib.element is DEPRECATED');
        if (typeof value === 'object') {
            return { isWwObject: true, ...value };
        } else {
            return { isWwObject: true, type: value };
        }
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.resolveObjectPropertyPath
     */
    resolveObjectPropertyPath(...args) {
        // wwLib.wwLog.warn(
        //     'wwLib.resolveObjectPropertyPath is DEPRECATED, use wwLib.wwUtils.resolveObjectPropertyPath instead'
        // );
        return wwLib.wwUtils.resolveObjectPropertyPath(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwutils.getTextStyleFromContent
     */
    getTextStyleFromContent(...args) {
        // wwLib.wwLog.warn(
        //     'wwLib.getTextStyleFromContent is DEPRECATED, use wwLib.wwUtils.getTextStyleFromContent instead'
        // );
        return wwLib.wwUtils.getTextStyleFromContent(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwWorkflow.executeGlobal
     */
    async executeWorkflow(...args) {
        wwLib.wwLog.warn('wwLib.executeWorkflow is DEPRECATED, use wwLib.wwWorkflow.executeGlobal instead');
        return wwLib.wwWorkflow.executeGlobal(...args);
    },

    /**
     * @PUBLIC_API
     * @EDITOR
     * @DEPRECATED wwLib.wwEditor.findParentUidByFlag
     */
    findParentUidByFlag(...args) {
        wwLib.wwLog.warn('wwLib.wwEditor.findParentUidByFlag is DEPRECATED, use wwLib.findParentUidByFlag instead');
        return wwLib.wwEditor.findParentUidByFlag(...args);
    },

    /**
     * @PUBLIC_API
     * @EDITOR
     * @DEPRECATED wwLib.wwEditor.selectParentByFlag
     */
    selectParentByFlag(...args) {
        wwLib.wwLog.warn('wwLib.wwEditor.selectParentByFlag is DEPRECATED, use wwLib.selectParentByFlag instead');
        return wwLib.wwEditor.selectParentByFlag(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwElement.useCreate
     */
    useCreateElement() {
        wwLib.wwLog.warn('wwLib.useCreateElement is DEPRECATED, use wwLib.wwElement.useCreate instead');
        return this.wwElement.useCreate();
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwElement.useLayoutStyle
     */
    useLayoutStyle() {
        wwLib.wwLog.warn('wwLib.useLayoutStyle is DEPRECATED, use wwLib.wwElement.useLayoutStyle instead');
        return wwLib.wwElement.useLayoutStyle();
    },

    /**
     * @PUBLIC_API
     */
    useIcons() {
        const store = useIconsStore();
        return {
            getIcon: store.getIcon,
        };
    },
};

function pageSanitizer(page) {
    const keysToInclude = [
        'id',
        'name',
        'folder',
        'metaImage',
        'pageLoaded',
        'paths',
        'langs',
        'meta',
        'title',
        'sections',
        'pageUserGroups',
    ];

    const _page = {};
    keysToInclude.forEach(key => {
        _page[key] = page[key];
    });

    _page.meta && delete _page.meta.__typename;
    for (const section of _page.sections || []) {
        delete section.__typename;
    }

    const lang = wwLib.$store.getters['front/getLang'];
    if (_page.paths) _page.path = _page.paths[lang] || _page.paths.default;
    else _page.path = null;

    _page.lang = lang;

    return _page;
}
