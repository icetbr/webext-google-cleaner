import style1 from './style.css'
import { addStyle, style, el } from '@icetbr/utils/web';

const head = document.querySelectorAll('head')[0];

const createLink = (attrs, onclick, parent) => {
    if (!parent) return null;

    const link = el('div', attrs);
    link.addEventListener('click', onclick, false);
    parent.append(link);
    return link;
};

const doLink = tbsParameter => {
    const parameters = new window.URLSearchParams(window.location.search);
    parameters.set('tbs', tbsParameter);
    document.location.href = `?${parameters.toString()}`;
};

let isBarVisible = false;
const hideNavBarStyle = style('#top_nav, #appbar {display:none;}');
const toggleNavBar = () => {
    if (isBarVisible) {
        hideNavBarStyle.remove();
    } else {
        head.append(hideNavBarStyle);
    }

    isBarVisible = !isBarVisible;
};

let isFiltersBarVisible = false;
const hideFiltersBarStyle = style('#filtersBar {display:none;}');
const toggleFiltersBar = () => {
    if (isFiltersBarVisible) {
        hideFiltersBarStyle.remove();
    } else {
        head.append(hideFiltersBarStyle);
    }

    isFiltersBarVisible = !isFiltersBarVisible;
};

const toggleEnglishOnly = () => {
    const parameters = new window.URLSearchParams(window.location.search);
    parameters.has('gl') ? parameters.delete('gl') : parameters.set('gl', 'us');
    document.location.href = `?${parameters.toString()}`;
};

const showPastYearPosts         = () => doLink('qdr:y');
const showAnyTimePosts          = () => doLink('qdr:');
const showPastHourPosts         = () => doLink('qdr:h');
const showPast24HoursPosts      = () => doLink('qdr:d');
const showPastWeekPosts         = () => doLink('qdr:w');
const showPastMonthPosts        = () => doLink('qdr:m');

const ensureNavBar = () => {
    if (!isBarVisible) return;

    hideNavBarStyle.remove();
    isBarVisible = !isBarVisible;
};

// This keeps breaking, maybe use parent with jsowner=ow86?
const showCustomRangePosts = () => {
    ensureNavBar();
    document.querySelectorAll('[jsaction="EEGHee"]')[0].click();
    // Document.getElementsByClassName('n5Ug4b')[0].style.display = 'block';
};

const needsHiding = text =>
    text.startsWith('Images') ||
    text.startsWith('Videos') ||
    text.startsWith('People also ask') ||
    text.startsWith('Twitter results') ||
    text.startsWith('Top stories') ||
    text.startsWith('Related searches') ||
    text.trim().split('\n')[0].endsWith(' - YouTube');

let hiddenSections;
const hideUndesiredSections = section => {
    if (!needsHiding(section.innerText)) return;

    hiddenSections.push(section);
    section.style.display = 'none';
};

const jsCleanGoogle = () => {
    hiddenSections = [];
    const bres = document.querySelector('#bres');
    if (bres.innerText.includes('Related searches')) {
        bres.style.display = 'none';
    }

    document.querySelectorAll('.cLjAic.TzHB6b').forEach(hideUndesiredSections);
    document.querySelectorAll('.ULSxyf').forEach(hideUndesiredSections);
};

const addLinks = () => {
    const parent = document.querySelector('#rcnt');

    createLink({ id: 'bartoggle', style: 'font-size: 11px; top: 95px; left: 23px; position: absolute; z-index: 999', textContent: 'Toggle topbar' }, toggleNavBar, parent);

    createLink({ style: 'font-size: 11px; top: 119px; left: 12px; position: absolute; z-index: 999', textContent: 'Toggle english only' }, toggleEnglishOnly, parent);
    createLink({ style: 'font-size: 11px; top: 140px; left: 33px; position: absolute; z-index: 999', textContent: 'Past year' }, showPastYearPosts, parent);
    createLink({ style: 'font-size: 11px; top: 161px; left: 53px; position: absolute; z-index: 999', textContent: '+' }, toggleFiltersBar, parent);

    const filtersBar = createLink({ id: 'filtersBar', style: 'font-size: 11px; top: 178px; left: 34px; position: absolute; line-height: 18px; z-index: 999' }, null, parent);

    createLink({ textContent: 'Past year' }, showPastYearPosts, filtersBar);
    createLink({ textContent: 'Any time' }, showAnyTimePosts, filtersBar);
    createLink({ textContent: 'Past hour' }, showPastHourPosts, filtersBar);
    createLink({ textContent: 'Past 24 hours' }, showPast24HoursPosts, filtersBar);
    createLink({ textContent: 'Past week' }, showPastWeekPosts, filtersBar);
    createLink({ textContent: 'Past month' }, showPastMonthPosts, filtersBar);
    createLink({ textContent: 'Custom range' }, showCustomRangePosts, filtersBar);
};

const init = () => {
    toggleNavBar();
    toggleFiltersBar();
    addStyle(style1);
    jsCleanGoogle();
    addLinks();
};

init();
