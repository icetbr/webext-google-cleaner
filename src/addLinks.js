import { $, $$, createLink } from '@icetbr/utils/web';

const doLink = tbsParameter => {
    const parameters = new window.URLSearchParams(window.location.search);
    parameters.set('tbs', tbsParameter);
    document.location.href = `?${parameters.toString()}`;
};

const toggleEnglishOnly = () => {
    const parameters = new window.URLSearchParams(window.location.search);
    parameters.has('gl') ? parameters.delete('gl') : parameters.set('gl', 'us');
    document.location.href = `?${parameters.toString()}`;
};

const prependLink = qParameter => {
    const parameters = new window.URLSearchParams(window.location.search);
    const query =
       parameters.get('q')
       .replace(/\s*site:.*\s*/, '')
       .concat(' ' + qParameter)

    parameters.set('q', query);
    document.location.href = `?${parameters.toString()}`;
};

const showCustomRangePosts = () => {
    const hideNavBar = () => $('#navbarStyle')?.remove();
    hideNavBar();
    $$('[jsaction="EEGHee"]')[0].click();
};

const showPastYearPosts    = () => doLink('qdr:y');
const showHackernewsPosts  = () => prependLink('site:news.ycombinator.com');
const showRedditPosts      = () => prependLink('site:reddit.com');
const showAnyTimePosts     = () => doLink('qdr:');
const showPastHourPosts    = () => doLink('qdr:h');
const showPast24HoursPosts = () => doLink('qdr:d');
const showPastWeekPosts    = () => doLink('qdr:w');
const showPastMonthPosts   = () => doLink('qdr:m');


export const addLinks = (toggleNavbar, toggleFiltersbar) => {
    const parent = $('#rcnt');

    createLink(parent, toggleNavbar       , { textContent: 'Toggle topbar'      , style: 'font-size: 11px; top:  95px; left: 23px; position: absolute; z-index: 999' });
    createLink(parent, toggleEnglishOnly  , { textContent: 'Toggle english only', style: 'font-size: 11px; top: 119px; left: 12px; position: absolute; z-index: 999' });
    createLink(parent, showPastYearPosts  , { textContent: 'Past year'          , style: 'font-size: 11px; top: 140px; left: 33px; position: absolute; z-index: 999' });
    createLink(parent, showHackernewsPosts, { textContent: 'Hackernews'         , style: 'font-size: 11px; top: 161px; left: 25px; position: absolute; z-index: 999' });
    createLink(parent, showRedditPosts    , { textContent: 'Reddit'             , style: 'font-size: 11px; top: 183px; left: 40px; position: absolute; z-index: 999' });
    createLink(parent, toggleFiltersbar   , { textContent: '+'                  , style: 'font-size: 11px; top: 204px; left: 53px; position: absolute; z-index: 999' });

    const filtersBar = createLink(parent, null, { style: 'font-size: 11px; top: 221px; left: 34px; position: absolute; line-height: 18px; z-index: 999' });

    createLink(filtersBar, showPastYearPosts   , { textContent: 'Past year'     } );
    createLink(filtersBar, showAnyTimePosts    , { textContent: 'Any time'      } );
    createLink(filtersBar, showPastHourPosts   , { textContent: 'Past hour'     } );
    createLink(filtersBar, showPast24HoursPosts, { textContent: 'Past 24 hours' } );
    createLink(filtersBar, showPastWeekPosts   , { textContent: 'Past week'     } );
    createLink(filtersBar, showPastMonthPosts  , { textContent: 'Past month'    } );
    createLink(filtersBar, showCustomRangePosts, { textContent: 'Custom range'  } );
};


