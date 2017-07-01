var sidePanelOffset = {};
// creates event listener for window scroll and apply animation
function onAppLoad() {
    window.addEventListener("scroll", runOnScroll);
    sidePanelOffset = document.getElementById('sidePanel').getBoundingClientRect();
    if (sidePanelOffset.top < window.scrollY + 200) {
        addAnimation();
    } else {
        removeAnimation();
    }
}
// activate content edit panel and scrolls to input fields
function editContent() {
    document.getElementById('contentTextrea').style.display = 'block';
    smoothScroll('contentTextrea');
}

// changes the element content and scrolls to that element
function changeContent(source, dest, parent) {
    document.getElementById(dest).innerHTML = document.getElementById(source).value;
    smoothScroll(parent);
}

// removes animation
function removeAnimation() {
    document.getElementById('inLeft').classList.remove("slideInLeft");
    document.getElementById('outLeft').classList.remove("slideInRight");
    document.getElementById('outLeftAnimate').classList.remove("slideInRight");
    document.getElementById('side-panel-right').classList.remove("fadeInDown");
}

// adds animation
function addAnimation() {
    document.getElementById('inLeft').classList.add("slideInLeft");
    document.getElementById('outLeft').classList.add("slideInRight");
    document.getElementById('outLeftAnimate').classList.add("slideInRight");
    document.getElementById('side-panel-right').classList.add("fadeInDown");
}

// calls on window scroll, check for scroll position and apllies animation
function runOnScroll(e) {
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPosition + 300 > sidePanelOffset.top) {
        addAnimation();
    } else {
        removeAnimation();
    }
}

// opens modal
function openModal(e) {
    document.getElementById('modal-image').src = e.srcElement.src;
    document.getElementById('modal-backdrop').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
    setTimeout(function () {
        document.getElementById('modal').classList.add("in");
    });
}

// click for each image
function redirectToPage(e) {
    e.preventDefault();
    console.log('click on ', e.srcElement, e.srcElement.alt);
    // return false;
}

// closes modal
function closeModal() {
    document.getElementById('modal').classList.remove("in");
    setTimeout(function () {
        document.getElementById('modal').style.display = 'none';
    });
    document.getElementById('modal-backdrop').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
}

// find element yposition of element
function findCurrentYPosition() {
    if (self.pageYOffset) return self.pageYOffset;
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

// finds element position
function findElmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    }
    return y;
}

// apllies smooth scroll to the target element
function smoothScroll(eID) {
    var startY = findCurrentYPosition();
    var stopY = findElmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        }
        return;
    }
    for (var i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
    }
}