var project = require("./json/project.json");

project = project
  .sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  })
  .reverse();

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];
  var stopDelete = true;

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML =
    '<span class="border-r-2 border-black" id="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    stopDelete =
      this.toRotate[this.toRotate.length - 1] === fullTxt ? false : true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }
  if (this.loopNum < this.toRotate.length && stopDelete) {
    setTimeout(function () {
      that.tick();
    }, delta);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const btn_nav = document.querySelector("button.mobile-menu-button");
  const menu_nav = document.querySelector(".mobile-menu");
  btn_nav.addEventListener("click", () => {
    menu_nav.classList.toggle("hidden");
  });
  window.addEventListener("resize", function (event) {
    if (document.body.clientWidth >= 768) {
      menu_nav.classList.add("hidden");
    }
  });
  if (document.getElementById("typewrite")) {
    var elements = document.getElementById("typewrite");
    var toRotate = elements.getAttribute("data-type");
    var period = elements.getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements, JSON.parse(toRotate), period);
    }
  }
  var recentUpdates = document.getElementById("recentUpdates");
  if (recentUpdates) {
    for (let index = 0; index < 2; index++) {
      recentUpdates.innerHTML += `
        <a href="${project[index].url}" class="card">
            <h2>${project[index].title}</h2>
            <p>${project[index].subtitle}</p>
            <h3>${project[index].type}</h3>
        </a>
        `;
    }
  }
  var recentProjects = document.getElementById("recentProjects");
  if (recentProjects) {
    for (let index = 0; index < project.length; index++) {
      recentProjects.innerHTML += `
        <a href="${project[index].url}" class="m-2">
            <div class="w-full h-full overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-2xl zoom">
                <picture class="w-full">
                    <img src="${project[index].image}" class="w-full" alt="${project[index].title}">
                </picture>
                <div class="px-6 py-4 h-full">
                    <div class="font-bold text-xl mb-2 leading-tight">${project[index].title}</div>
                    <p class="text-gray-700 text-base">
                        ${project[index].subtitle}
                    </p>
                </div>
            </div>
        </a>
        `;
    }
  }
});
