const pages = [
    { pageLink: '/', pageText: "Home" },
    { pageLink: '/games', pageText: "Games" },
    { pageLink: '/links', pageText: "Links" },
    { pageLink: '/about', pageText: "About" }
];
let topNav = '<nav><ul class="topnav">';
for (let i = 0; i < pages.length; ++i) {
    const page = pages[i];
    topNav += '<li';
    if (i === pages.length - 1) {
        topNav += ' class="right"';
    }
    topNav += '><a href="';
    topNav += page.pageLink === window.location.pathname.replace('.html', '') && window.location.pathname !== '/.html'
        ? '#" class="active'
        : page.pageLink
        ;
    topNav += '">';
    topNav += page.pageText;
    topNav += '</a></li>';
}
topNav += '</ul></nav>';
document.write(topNav);
