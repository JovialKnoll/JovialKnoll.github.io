var pages = [
    { pageLink: '/', pageText: "Home" },
    { pageLink: '/games', pageText: "Games" },
    { pageLink: '/roller', pageText: "Roller" },
    { pageLink: '/about', pageText: "About" }
];
var topNav = '<nav><ul class="topnav">';
for (var i = 0; i < pages.length; ++i) {
    var page = pages[i];
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
