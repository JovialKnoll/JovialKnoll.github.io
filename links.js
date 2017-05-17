var pages = [
    { link: "/", text: "Home" },
    { link: "/roller", text: "Roller" },
    { link: "/about", text: "About" }
];
var topNav = '<ul class="topnav">';
for (var i = 0; i < pages.length; ++i) {
    var page = pages[i];
    topNav += '<li';
    if (i === pages.length - 1) {
        topNav += ' class="right"';
    }
    topNav += '><a href="';
    topNav += page.link === window.location.pathname.replace('.html', '') && window.location.pathname !== '/.html'
        ? '#" class="active'
        : page.link
        ;
    topNav += '">';
    topNav += page.text;
    topNav += '</a></li>';
}
topNav += '</ul>';
document.write(topNav);
