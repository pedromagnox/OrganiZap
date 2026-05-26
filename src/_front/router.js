import { createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import {
    initializeData,
    initializePlugins,
    initializeIntegrationInstances,
    onPageUnload,
} from '@/_common/helpers/data';
import { convertPathToRouterFormat } from '@/_common/helpers/urlParametersParsing';
import { getRuntimeEnvironment } from '@/helpers/frontEnv.js';
import { useBackAuthStore } from '@/pinia/backAuth.js';

/**
 * @typedef {import('vue-router').Router} Router
 * @typedef {import('vue-router').RouteRecordRaw} RouteRecordRaw
 * @typedef {import('vue-router').RouterOptions} RouterOptions
 * @typedef {import('vue-router').RouterScrollBehavior} RouterScrollBehavior
 */

/**
 * @typedef {Object} Lang
 * @property {string} lang
 * @property {boolean} [default]
 * @property {boolean} [isDefaultPath]
 */

/**
 * @typedef {Object} PageSecurity
 * @property {'authenticated' | string} [accessRule]
 * @property {string[]} [accessRoles]
 * @property {'AND' | 'OR'} [accessRolesCondition]
 */

/**
 * @typedef {Object} Page
 * @property {string} id
 * @property {Record<string, string> & { default: string }} paths
 * @property {string[]} langs
 * @property {PageSecurity} [security]
 * @property {{ userGroup: string }[]} [pageUserGroups]
 */

/**
 * @typedef {Object} DesignInfo
 * @property {string} homePageId
 * @property {Page[]} pages
 * @property {Lang[]} langs
 * @property {unknown} [auth]
 * @property {{ href?: string }} [baseTag]
 */

/** @type {Router} */
let router;
/** @type {RouteRecordRaw[]} */
const routes = [];

/** @type {RouterScrollBehavior} */
const scrollBehavior = to => {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
};

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

window.wwg_designInfo = {"id":"0e49b376-70bf-4921-b852-76d0df281265","homePageId":"25adc973-17b2-4d89-a56a-89e645bec36b","authPluginId":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","baseTag":{},"defaultTheme":"light","langs":[{"lang":"pt","default":true,"isDefaultPath":false}],"background":{"backgroundColor":"var(--87ae6218-02f5-47d8-bc0e-3635f4fb7632,#F7F8FC)"},"workflows":[],"back":{"isServerSetup":{"staging":false,"production":false}},"auth":null,"pages":[{"id":"4bee5161-9193-4369-9f44-34e90ffc97b8","linkId":"4bee5161-9193-4369-9f44-34e90ffc97b8","name":"system","folder":null,"paths":{"en":"","pt":"sistema","default":"sistema"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"faab487f-753b-4682-b2c6-87e9f631e65f","sectionTitle":"configuracoes","linkId":"8c817924-43e9-40d0-9caa-9425d6dfe338"},{"uid":"d426666f-9af9-4907-8228-11a5637cc09b","sectionTitle":"painel","linkId":"d35dc197-5820-45e0-ad1f-36c914be3b91"},{"uid":"786a7268-8fad-4e5a-9841-673bdb46df42","sectionTitle":"Modal Nova Conexão","linkId":"b7e8870a-bcfe-40b3-a2d9-45631a6ca1db"},{"uid":"97c60b5f-9529-49f7-bfd0-fd4648437800","sectionTitle":"popup_select_field","linkId":"f49f282b-7b39-4b49-9254-b0dd9cf532e1"},{"uid":"0027c462-18f1-4bbe-a072-e4afd20a5521","sectionTitle":"Modal QR Code","linkId":"e3b37ec3-7d17-47a6-8814-bfc8bd117a0e"},{"uid":"9db82aea-9a32-4582-a784-9412770a1962","sectionTitle":"Alert","linkId":"e02e6bb8-34d2-4eca-9bdf-9c8235696dc0"},{"uid":"41208229-82a5-43e1-b383-717b4d5c9894","sectionTitle":"Modal","linkId":"1c9cdd91-3a49-422c-bd5a-1840cc8fede5"},{"uid":"73a63a1f-3344-461c-841d-0320888621f2","sectionTitle":"Modal","linkId":"cb81204d-093a-4bdf-a0ea-7a2c227dc829"},{"uid":"1002ac2a-9f74-42f1-afc5-e1132365b5ac","sectionTitle":"modal_create_library","linkId":"7d80fa6a-0578-4a4e-b35e-f01aaebb9f29"},{"uid":"5fa18377-d35b-489f-ae7d-8cbc889ea4a8","sectionTitle":"modal_subscribe","linkId":"c5cc5fe0-b256-4e88-a371-08908ae5b54b"},{"uid":"fc6eea8e-e00a-4aed-9287-2966370ce740","sectionTitle":"modal_cupon","linkId":"d327c790-8597-4fb8-a51e-40b6d6e31bab"},{"uid":"79b8dc54-c01a-46c4-9a5b-4be342b63820","sectionTitle":"Alert","linkId":"7f87a7f4-70fe-456b-8a1f-be180b6f67ac"},{"uid":"59c78d11-ba02-4905-97c8-3eb8b444bc56","sectionTitle":"modal_messages","linkId":"f9f5e5be-768f-4f8a-b14c-24cb327c34d4"}],"pageUserGroups":[{}],"title":{"en":"","fr":"Vide | Commencer à partir de zéro","pt":"OrganiZap"},"meta":{"desc":{"pt":"Automatize a Maior Ferramenta\nde Conversas do Mundo!"},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"images/01_Prancheta_1.png?_wwcv=450","security":{}},{"id":"143f9ac4-5b8a-4e80-9c9c-ddb7f23cd2e1","linkId":"143f9ac4-5b8a-4e80-9c9c-ddb7f23cd2e1","name":"lgtest","folder":null,"paths":{"pt":"lgtest","default":"lgtest"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"26dabc75-fe1e-4b48-8582-6e2eeec52a56","sectionTitle":"Section","linkId":"48cecf9f-ffa4-4723-85c6-b86ce4e54c22"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"5fa5f88d-f26c-45ca-b173-bb095ed4f3b6","linkId":"5fa5f88d-f26c-45ca-b173-bb095ed4f3b6","name":"privacy","folder":null,"paths":{"pt":"privacy","default":"privacy"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"331bd50f-aac4-4bdd-b159-a059a64b1804","sectionTitle":"Section","linkId":"a8236f17-0dd0-43f8-8c44-f4445163ac5e"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"65f1db9e-22af-4ed4-a3da-09d3d44f9549","linkId":"65f1db9e-22af-4ed4-a3da-09d3d44f9549","name":"terms","folder":null,"paths":{"pt":"privacy-copy","default":"privacy-copy"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"e090b365-3ed5-43fa-a777-2ac9578e6a87","sectionTitle":"Section","linkId":"b8e1d852-0fb9-48f0-b68c-e223daee77dd"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"4a06d199-091e-4a81-900e-314ced25f14b","linkId":"4a06d199-091e-4a81-900e-314ced25f14b","name":"singup","folder":"user/","paths":{"en":"singup","es":"registrarse","pt":"cadastrar","default":"cadastrar"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"9fc49e9b-4137-4e5f-8175-f811168cbf6a","sectionTitle":"section","linkId":"ec6ef396-d69a-493c-8cc6-67f5e4634ce8"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"c9b2f465-a582-4b87-8a25-75af72bf353b","linkId":"c9b2f465-a582-4b87-8a25-75af72bf353b","name":"form","folder":"tools/","paths":{"pt":"form/{{id|}}","default":"form/{{id|}}"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"e3044b5d-ac47-4730-8ebf-e6722ae79f47","sectionTitle":"Section","linkId":"d37c2cd6-a994-4c43-ac28-899d1bf6d7a0"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"614e15f6-fe8b-4747-8405-0f421cf9e6b0","linkId":"614e15f6-fe8b-4747-8405-0f421cf9e6b0","name":"redirect","folder":null,"paths":{"pt":"redirect/{{trackable_link_id|00201de1-1c3d-4294-8811-1fa3d27bbfa1}}","default":"redirect/{{trackable_link_id|00201de1-1c3d-4294-8811-1fa3d27bbfa1}}"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"3a7b7308-75c8-4c11-b9b8-85873eee4569","sectionTitle":"Section","linkId":"7e49bec8-65d1-4809-b1ff-afcba0c4cd72"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"25adc973-17b2-4d89-a56a-89e645bec36b","linkId":"25adc973-17b2-4d89-a56a-89e645bec36b","name":"home","folder":null,"paths":{"pt":"home","default":"home"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"4628e8e4-231b-4833-a2d2-a8709bd544cb","sectionTitle":"Section","linkId":"d23c8dd6-cff9-42f6-abdc-9a2dd5977188"}],"pageUserGroups":[],"title":{"pt":"OrganiZap"},"meta":{"desc":{"pt":"Automatize a Maior Ferramenta de Conversas do Mundo!"},"keywords":{},"socialDesc":{"pt":"Automatize a Maior Ferramenta de Conversas do Mundo!"},"socialTitle":{"pt":"OrganiZap"},"structuredData":{}},"metaImage":"images/01_Prancheta_1.png?_wwcv=450","security":{}},{"id":"c58c3de2-aa15-4b4c-b2bb-31e48bb81bca","linkId":"c58c3de2-aa15-4b4c-b2bb-31e48bb81bca","name":"tarefas","folder":"tools/","paths":{"pt":"tarefas","default":"tarefas"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"b75299a0-a2c0-4fea-8d4a-af628b3bedd9","sectionTitle":"Section","linkId":"6216cdb3-882d-4bba-ae27-d14562d47229"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"2f52d4a7-0cad-421e-b2ed-0ab296ebd261","linkId":"2f52d4a7-0cad-421e-b2ed-0ab296ebd261","name":"gy7ft6","folder":null,"paths":{"pt":"pix","default":"pix"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"be342ca0-5f82-4274-b2a9-3e7b83ddc965","sectionTitle":"Section","linkId":"8dc815b1-7d32-45b7-b3df-53f10ae5aaf2"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"72e95720-d180-4eac-930a-5e7f95836c1a","linkId":"72e95720-d180-4eac-930a-5e7f95836c1a","name":"realtime","folder":null,"paths":{"pt":"realtime","default":"realtime"},"langs":["pt"],"cmsDataSetPath":null,"sections":[],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"d800d40f-9332-4e45-bc14-aeee968ba309","linkId":"d800d40f-9332-4e45-bc14-aeee968ba309","name":"link","folder":"tools/","paths":{"pt":"link/{{link|ylyx5}}","default":"link/{{link|ylyx5}}"},"langs":["pt"],"cmsDataSetPath":null,"sections":[],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"268d07bf-6387-4b47-82e9-08d66587ca19","linkId":"268d07bf-6387-4b47-82e9-08d66587ca19","name":"new_password","folder":"user/","paths":{"pt":"nova_senha","default":"nova_senha"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"5674e525-ce57-421d-b145-4f96c692c5bd","sectionTitle":"section","linkId":"4717649f-6853-4ecd-8746-f6a4b1d335ae"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"eeeeb2a4-4e78-44e6-b743-8d421cfc93af","linkId":"eeeeb2a4-4e78-44e6-b743-8d421cfc93af","name":"agendamento","folder":"tools/","paths":{"pt":"agendamento/{{sent_event_id|2545ab23-3ff3-4a4f-93a7-803d551b4f1d}}","default":"agendamento/{{sent_event_id|2545ab23-3ff3-4a4f-93a7-803d551b4f1d}}"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"2866b7a2-ee90-46ad-b4a8-b7c83481804f","sectionTitle":"Section","linkId":"cea47710-e827-4ab9-8397-101675a2d3b3"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"7c984893-2ed3-41ac-8ce2-4abe051b8bf5","linkId":"7c984893-2ed3-41ac-8ce2-4abe051b8bf5","name":"login","folder":"user/","paths":{"en":"login","pt":"entrar","default":"entrar"},"langs":["pt"],"cmsDataSetPath":null,"sections":[{"uid":"2182e21b-e051-4eee-a3c2-cbffa84a0ffa","sectionTitle":"section","linkId":"cb759d42-2677-47f1-ae5b-36cce2aaef8f"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}}],"plugins":[{"id":"f9ef41c3-1c53-4857-855b-f2f6a40b7186","name":"Supabase","namespace":"supabase"},{"id":"3a407b45-9c63-471d-b09b-15cf797e5566","name":"Sound","namespace":"sound"},{"id":"fbf0feec-356b-461b-8738-3b1f44edaf02","name":"Google GTM","namespace":"gtm"},{"id":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","name":"Supabase Auth","namespace":"supabaseAuth"},{"id":"9c40819b-4a8f-468f-9ba5-4b9699f3361f","name":"Charts","namespace":"chartjs"},{"id":"832d6f7a-42c3-43f1-a3ce-9a678272f811","name":"Date","namespace":"dayjs"},{"id":"2bd1c688-31c5-443e-ae25-59aa5b6431fb","name":"REST API","namespace":"restApi"}]};
window.wwg_cacheVersion = 450;
window.wwg_pluginsSettings = pluginsSettings;
window.wwg_disableManifest = true;

/** @type {Lang} */
const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {
    lang: 'en',
    default: true,
};

/**
 * @param {Page} page
 * @param {Lang} lang
 * @param {string} [forcedPath]
 */
const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    path = convertPathToRouterFormat(path);

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            const backAuthStore = useBackAuthStore(wwLib.$pinia);
            if (!wwLib.wwAuth.plugin) {
                if (!backAuthStore.projectAuth && window.wwg_designInfo.auth) {
                    backAuthStore.setProjectAuth(window.wwg_designInfo.auth);
                }
            }

            //Init plugins
            await initializePlugins();

            //Init integration instances
            await initializeIntegrationInstances();

            if (!wwLib.wwAuth.plugin) {
                await backAuthStore.refresh();
                const projectAuth = backAuthStore.projectAuth || {};

                //Check if private page
                if (page.security?.accessRule === 'authenticated') {
                    if (!backAuthStore.isAuthenticated) {
                        window.location.href = `${wwLib.wwPageHelper.getPagePath(
                            projectAuth.unauthenticatedPageId
                        )}?_source=${to.path}`;
                        return null;
                    } else if (page.security?.accessRoles?.length) {
                        const hasAccess =
                            page.security.accessRolesCondition === 'AND'
                                ? backAuthStore.matchAllRoles(page.security.accessRoles)
                                : backAuthStore.matchAnyRoles(page.security.accessRoles);
                        if (!hasAccess) {
                            window.location.href = `${wwLib.wwPageHelper.getPagePath(
                                projectAuth.unauthorizedPageId
                            )}?_source=${to.path}`;
                            return null;
                        }
                    }
                }
            } else {
                // Deprecated legacy auth plugins, to remove in the future
                if (page.pageUserGroups?.length) {
                    await wwLib.wwAuth.init();

                    // Redirect to not sign in page if not logged
                    if (!wwLib.wwAuth.getIsAuthenticated()) {
                        window.location.href = `${wwLib.wwPageHelper.getPagePath(
                            wwLib.wwAuth.getUnauthenticatedPageId()
                        )}?_source=${to.path}`;

                        return null;
                    }

                    //Check roles are required
                    if (
                        page.pageUserGroups.length > 1 &&
                        !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
                    ) {
                        window.location.href = `${wwLib.wwPageHelper.getPagePath(
                            wwLib.wwAuth.getUnauthorizedPageId()
                        )}?_source=${to.path}`;

                        return null;
                    }
                }
            }

            try {
                await import(`@/pages/${page.id.split('_')[0]}.js`);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        redirect: null,
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

/** @type {RouterOptions} */
let routerOptions;

const isProd = getRuntimeEnvironment() === 'production';

if (isProd && window.wwg_designInfo.baseTag?.href) {
    let baseTag = window.wwg_designInfo.baseTag.href;
    if (!baseTag.startsWith('/')) {
        baseTag = '/' + baseTag;
    }
    if (!baseTag.endsWith('/')) {
        baseTag += '/';
    }

    routerOptions = {
        history: createWebHistory(baseTag),
        routes,
    };
} else {
    routerOptions = {
        history: createWebHistory(),
        routes,
    };
}

router = createRouter({
    ...routerOptions,
    scrollBehavior,
});

//Trigger on page unload
let isFirstNavigation = true;
router.beforeEach(async (to, from) => {
    if (to.name === from.name) return;
    if (!isFirstNavigation) await onPageUnload();
    isFirstNavigation = false;
    wwLib.globalVariables._navigationId++;
    return;
});

//Init page
router.afterEach((to, from, failure) => {
    wwLib.$store.dispatch('front/showPageLoadProgress', false);
    let fromPath = from.path;
    let toPath = to.path;
    if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
    if (!toPath.endsWith('/')) toPath = toPath + '/';
    if (failure || (from.name && toPath === fromPath)) return;
    initializeData(to);
});
/* wwFront:end */

export default router;
