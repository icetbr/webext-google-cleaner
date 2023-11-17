import { $, $$ } from '@icetbr/utils/web';

const needsHiding = text =>
    text.startsWith('Images') ||
    text.startsWith('Videos') ||
    text.startsWith('People also ask') ||
    text.startsWith('Twitter results') ||
    text.startsWith('Top stories') ||
    text.startsWith('Related searches') ||
    text.trim().split('\n')[0].endsWith(' - YouTube');

const hideUndesiredSections = section => {
    if (!needsHiding(section.innerText)) return;
    section.style.display = 'none';
};

export const cleanSearchResults = () => {
    hideUndesiredSections($('#bres'));
    $$('.cLjAic.TzHB6b').forEach(hideUndesiredSections);
    $$('.ULSxyf').forEach(hideUndesiredSections);
    $$('.cUnQKe').forEach(hideUndesiredSections);
};

