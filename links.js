var pages = [
    { link: "/", text: "Home" },
    { link: "/roller", text: "Roller" },
    { link: "/about", text: "About" }
];

var sideNav = '<ul class="sidenav">';
for (var i = 0; i < pages.length; ++i) {
    var page = pages[i];
    sideNav += '<li><a href="';
    sideNav += page.link === window.location.pathname
        ? '#" class="active'
        : ('.' + page.link)
        ;
    sideNav += '">';
    sideNav += page.text;
    sideNav += '</a></li>';
}
sideNav += '</ul>';
document.write(sideNav);
