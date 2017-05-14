var pages = [
    { link: "/", text: "Home" },
    { link: "/roller", text: "Roller" },
    { link: "/about", text: "About" }
];

var topNav = '<ul class="topnav">';
for (var i = 0; i < pages.length; ++i) {
    var page = pages[i];
    topNav += '<li><a href="';
    topNav += page.link === window.location.pathname
        ? '#'
        : ('.' + page.link)
        ;
    topNav += '" class="toplink';
    if (page.link === window.location.pathname) {
        topNav += ' active'
    }
    if (i === pages.length - 1) {
        topNav += ' right'
    }
    topNav += '">';
    topNav += page.text;
    topNav += '</a></li>';
}
topNav += '</ul>';
document.write(topNav);
