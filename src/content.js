import style1 from './style.css'
import { addStyle, toggleStyle } from '@icetbr/utils/web';
import { cleanSearchResults } from './cleanSearchResults.js';

const init = () => {
    const toggleNavbar     = () => toggleStyle({ navbar: '#top_nav, #appbar, .rfiSsc {display:none;}' });
    const toggleFiltersbar = () => toggleStyle({ filtersbar: '#filtersBar {display:none;}' });

    toggleNavbar();
    toggleFiltersbar();
    addStyle(style1);
    cleanSearchResults();
    addLinks(toggleNavbar, toggleFiltersbar);
};

init();
