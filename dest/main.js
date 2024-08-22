/* 
TODO1: Spinning logo
TODO2: Expand header width
TODO3: Drop language
TODO4: Hero slider
TODO5: Selected project slider
TODO6: Carousel Testimonial 
TODO7: Handle Button controls padding
TODO8: Validate Form Advise
TODO9: Handle Navbar
TODO10: Handle show more nav menu
*/

// TODO1: Spinning logo
function handleSpinLogo() {
  const spinLogo = document.querySelector(".schero .textbox .logo");
}
handleSpinLogo();

// TODO2: Expand header
function handleHeader() {
  // Listen scroll
  window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    const header = document.querySelector(".header");
    // Add class active if scrollY > headerHeight
    if (scrollY >= header.scrollHeight) {
      header.classList.add("--active");
    } else {
      header.classList.remove("--active");
    }
  });
}
handleHeader();

// TODO3: Drop language
function handleDropDownLanguage() {
  const ctaLang = document.querySelector(".header__cta-lang ");
  const currentLang = ctaLang.querySelector(" .currentlang");
  const dropDownLang = ctaLang.querySelectorAll(
    ".dropdownlang .dropdownlang__item"
  );
  currentLang.addEventListener("click", (e) => {
    e.stopPropagation();
    ctaLang.classList.toggle("--active");
  });
  dropDownLang.forEach((lang) => {
    lang.addEventListener("click", () => {
      let prevLang = currentLang.innerText;
      currentLang.innerText = lang.innerText;
      lang.innerText = prevLang;
      ctaLang.classList.remove("--active");
    });
  });
  document.addEventListener("click", () => {
    ctaLang.classList.remove("--active");
  });
}
handleDropDownLanguage();

// TODO4: Hero slider
function handleHeroSlider() {
  const heroSlider = document.querySelector(".schero__slider-imglist");
  if (heroSlider !== null && typeof heroSlider !== "undefined") {
    const flickityDots = heroSlider.querySelector(".flickity-page-dots");
    const nextBtn = document.querySelector(
      ".schero__slider-controls .btncontrolgroup .--arrowright"
    );
    const prevBtn = document.querySelector(
      ".schero__slider-controls .btncontrolgroup .--arrowleft"
    );
    const numTotalPage = document.querySelector(
      ".schero__slider-controls .paging .paging__total"
    );
    const numCurrentPage = document.querySelector(
      ".schero__slider-controls .paging .paging__current"
    );
    let heroSliderFlickity = new Flickity(heroSlider, {
      wrapAround: true,
      prevNextButtons: false,
      autoPlay: true,
    });
    prevBtn.addEventListener("click", () => {
      heroSliderFlickity.previous();
    });
    nextBtn.addEventListener("click", () => {
      heroSliderFlickity.next();
    });
    waitForElm(".schero__slider-imglist .flickity-page-dots").then((elm) => {
      numCurrentPage.insertAdjacentElement("beforebegin", elm);
    });
    const numSlides = heroSliderFlickity.cells.length;
    numTotalPage.innerText = numSlides.toString().padStart(2, "0");
    heroSliderFlickity.on("change", (currentPageIndex) => {
      numCurrentPage.innerText = (currentPageIndex + 1)
        .toString()
        .padStart(2, "0");
    });
  }
}
handleHeroSlider();

// TODO5: Selected project slider
function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
function handleProjectSlider() {
  const selectedProjectSlider = document.querySelector(".scprojects__slider");
  if (
    selectedProjectSlider !== null &&
    typeof selectedProjectSlider !== "undefined"
  ) {
    const numTotalPage = document.querySelector(
      ".scprojects__textbox .paging .paging__total"
    );
    const numCurrentPage = document.querySelector(
      ".scprojects__textbox .paging .paging__current"
    );
    const arrowIcon = document.createElement("img");
    arrowIcon.setAttribute("src", "img/arrow-prev-icon.png");
    const arrowIcon2 = document.createElement("img");
    arrowIcon2.setAttribute("src", "img/arrow-prev-icon.png");
    const prevBtn = document.createElement("div");
    prevBtn.classList.add("btncontrol");
    prevBtn.classList.add("btnprev");
    prevBtn.appendChild(arrowIcon);
    const nextBtn = document.createElement("div");
    nextBtn.classList.add("btncontrol");
    nextBtn.classList.add("btnnext");
    nextBtn.appendChild(arrowIcon2);
    waitForElm(".scprojects__slider .flickity-page-dots").then((elm) => {
      elm.insertAdjacentElement("afterbegin", prevBtn);
      elm.insertAdjacentElement("beforeend", nextBtn);
    });

    let selectedProjectSliderFlickity = new Flickity(selectedProjectSlider, {
      prevNextButtons: false,
      wrapAround: true,
      autoPlay: true,
    });
    prevBtn.addEventListener("click", () => {
      selectedProjectSliderFlickity.previous();
    });
    nextBtn.addEventListener("click", () => {
      selectedProjectSliderFlickity.next();
    });

    const numSlides = selectedProjectSliderFlickity.cells.length;
    numTotalPage.innerText = numSlides.toString().padStart(2, "0");
    selectedProjectSliderFlickity.on("change", (currentPageIndex) => {
      numCurrentPage.innerText = (currentPageIndex + 1)
        .toString()
        .padStart(2, "0");
    });
  }
}
handleProjectSlider();

// TODO6: Carousel Testimonial
function handleTestimonialCarousel() {
  const testimonialCarousel = document.querySelector(
    ".sctestimonial__carousel"
  );
  if (testimonialCarousel != null && testimonialCarousel != undefined) {
    const flkty = {
      init() {
        this.flkty = new Flickity(testimonialCarousel, {
          cellAlign: "left",
          freeScroll: true,
          prevNextButtons: false,
          pageDots: false,
          wrapAround: true,
        });
        this.flkty.x = 0;
        this.loop();
      },

      loop() {
        this.flkty.x--;
        this.flkty.integratePhysics();
        this.flkty.settle(this.flkty.x);
        window.requestAnimationFrame(this.loop.bind(this));
      },
    };
    flkty.init();
  }
}
handleTestimonialCarousel();

// TODO7: Handle Button controls padding
function handleBtnControlsPadding() {
  function btnControlPadding() {
    const body = document.querySelector("body");
    const windowWidth = window.innerWidth;
    const heroControls = document.querySelector(".schero__slider-controls");
    if (heroControls !== null && typeof heroControls !== "undefined") {
      const containerWidth = document.querySelector(
        ".scservice .container"
      ).clientWidth;
      if (windowWidth >= 1920) {
        heroControls.style.paddingRight = `calc(var(--pd-container))`;
      } else if (windowWidth <= 991.98) {
        heroControls.style.paddingRight = `var(--pd-container)`;
      } else {
        heroControls.style.paddingRight = `max(calc(var(--page-max-width) - ${windowWidth}px - var(--pd-container) ), calc(var(--pd-container) * 2)`;
      }
    }
    window.addEventListener("load", btnControlPadding);
    window.addEventListener("resize", btnControlPadding);
  }
}
handleBtnControlsPadding();

// TODO8: Validate advise
function handleFormAdvise(submitSucess) {
  function validatePhoneNumber(phoneNum) {
    return phoneNum.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
  }
  const adviseForm = document?.querySelector(
    ".scadvise .scadvise__inner .scadvise__form"
  );
  const inputName = adviseForm?.querySelector("input#name");
  const inputPhoneNumber = adviseForm?.querySelector("input#phonenumber");
  const inputTextarea = adviseForm?.querySelector("textarea#consultation");
  const inputList = [inputName, inputPhoneNumber, inputTextarea];
  function handleError(input) {
    const formGroup = input.parentElement;
    if (
      input.value === "" ||
      input.value === "undefined" ||
      input.value === null
    ) {
      formGroup.classList.add("--error");
    } else {
      formGroup.classList.remove("--error");
    }
  }
  adviseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(adviseForm);
    const userData = {};
    userData["name"] = formData.get("name");
    userData["phonenumber"] = formData.get("phonenumber");
    userData["consultation"] = formData.get("consultation");
    for (const key in userData) {
      if (key === "consultation") {
        const input = adviseForm.querySelector(`textarea#${key}`);
        handleError(input);
      } else {
        const input = adviseForm.querySelector(`input#${key}`);
        if (key === "phonenumber") {
          if (!!!validatePhoneNumber(userData[key]) && userData[key] !== "") {
            input.nextElementSibling.innerText =
              "Wrong phone number format. Example format: 0356668351";
            input.parentElement.classList.add("--error");
          } else {
            input.nextElementSibling.innerText = "Please fill in this field!";
            handleError(input);
          }
        } else {
          handleError(input);
        }
      }
    }
    submitSucess();
  });

  inputList.forEach((input) =>
    input.addEventListener("keydown", () => {
      input.parentElement.classList.remove("--error");
    })
  );
}
function submitSucess() {
  const adviseFormGroups = document?.querySelectorAll(
    ".scadvise .scadvise__inner .scadvise__form .scadvise__form-wrapper .formgroup"
  );
  let errorCount = 0;
  adviseFormGroups.forEach((group) => {
    if (group.classList.contains("--error")) {
      errorCount += 1;
    }
  });
  if (errorCount === 0) {
    alert("Thank you! We will contact you soon!");
    errorCount = 0;
  }
}
handleFormAdvise(submitSucess);

// TODO9: Handle Navbar
function disableScroll() {
  const body = document.querySelector("body");
  body.classList.add("--disable-scroll");
}
function enableScroll() {
  const body = document.querySelector("body");
  body.classList.remove("--disable-scroll");
}
function handleNavbar() {
  const btnNav = document.querySelector(".header__cta-nav.btnnav");
  if (btnNav !== null && typeof btnNav !== "undefined") {
    const navMenu = document.querySelector(".header__navmobile-wrapper");
    const btnExit = navMenu.querySelector(".header__navmobile .btnexit");
    navMenu
      .querySelector(".header__navmobile")
      .addEventListener("click", (e) => {
        e.stopPropagation();
      });
    btnNav.addEventListener("click", (e) => {
      e.stopPropagation();
      btnNav.classList.toggle("--active");
      navMenu.classList.add("--show");
      navMenu.classList.remove("--hide");
      disableScroll();
    });
    btnExit.addEventListener("click", () => {
      navMenu.classList.remove("--show");
      navMenu.classList.add("--hide");
      enableScroll();
    });
    document.addEventListener("click", () => {
      const headerNavMobileItemDropDownIconList = document.querySelectorAll(
        ".header__navmobile-item .title .title__icon"
      );
      if (navMenu.classList.contains("--show")) {
        navMenu.classList.remove("--show");
        navMenu.classList.add("--hide");
        btnNav.classList.remove("--active");
        headerNavMobileItemDropDownIconList.forEach((item) => {
          let dropDownItem = item.parentElement.nextElementSibling;
          dropDownItem.classList.remove("--active");
          dropDownItem.style.maxHeight = 0;
          dropDownItem.style.marginTop = 0;
          dropDownItem.style.paddingBottom = 0;
        });
        enableScroll();
      }
    });
  }
}
handleNavbar();

// TODO10: Handle show more nav menu
function handleShowMoreNavMenu() {
  const headerNavMobileItemDropDownIconList = document.querySelectorAll(
    ".header__navmobile-item .title .title__icon"
  );
  headerNavMobileItemDropDownIconList.forEach((item) => {
    item.addEventListener("click", () => {
      let dropDownItem = item.parentElement.nextElementSibling;
      dropDownItem.classList.toggle("--active");
      if (dropDownItem.classList.contains("--active")) {
        item.parentElement.classList.add("--active");
        dropDownItem.style.maxHeight = `${dropDownItem.scrollHeight + 10}px`;
        dropDownItem.style.marginTop = "12px";
        dropDownItem.style.paddingBottom = "6px";
      } else {
        item.parentElement.classList.remove("--active");
        dropDownItem.style.maxHeight = 0;
        dropDownItem.style.marginTop = 0;
        dropDownItem.style.paddingBottom = 0;
      }
    });
  });
}
handleShowMoreNavMenu();

/* 
TODO11: Flickity for ability list
TODO12: Put title to textbox in service page
TODO13: Dropdown for project section
TODO14: Project detail carousel
*/
// TODO11: Flickity for ability list
function handleFlickityAbilityList() {
  const abilityLlist = document.querySelector(
    ".scintro .scintro__content .scintro__content-right .abilitylist"
  );
  if (abilityLlist !== null && typeof abilityLlist !== "undefined") {
    const abilityLlistFlickity = new FlickityResponsive(abilityLlist, {
      prevNextButtons: false,
      pageDots: false,
      freeScroll: true,
      autoPlay: true,
      watchCSS: true,
    });
  }
}
handleFlickityAbilityList();

// TODO12: Put title to textbox in service page
function handleTitleServiceContentSection() {
  const serviceSectionContainer = document.querySelector(
    ".scservicecontent .container"
  );
  const titleFirstItem = document.querySelector(
    ".scservicecontent__title.--h2"
  );
  if (titleFirstItem !== null && typeof titleFirstItem !== "undefined") {
    if (window.innerWidth <= 991.98) {
      const firstItemTextbox = document.querySelector(
        ".scservicecontent__groups .scservicecontent__groups-item .textbox"
      );
      firstItemTextbox.insertAdjacentElement("afterbegin", titleFirstItem);
    } else {
      serviceSectionContainer.insertAdjacentElement(
        "afterbegin",
        titleFirstItem
      );
    }
  }
}
window.addEventListener("resize", handleTitleServiceContentSection);
window.addEventListener("load", handleTitleServiceContentSection);

// TODO13: Dropdown for project section
function handleDropDownProject(
  btnDropDown,
  dropDownList,
  articleList,
  paddingRight = "245px"
) {
  const dropDownListLastItemBottomPos =
    dropDownList.lastElementChild.getBoundingClientRect().bottom;
  const articleListTopPos = articleList.getBoundingClientRect().top;
  btnDropDown.addEventListener("click", () => {
    dropDownList.classList.toggle("--active");
    if (dropDownList.classList.contains("--active")) {
      dropDownList.style.maxHeight = `${dropDownList.scrollHeight}px`;
      if (window.innerWidth > 991.98) {
        btnDropDown.parentElement.parentElement.style.paddingRight =
          paddingRight;
        articleList.style.marginTop = `${
          dropDownListLastItemBottomPos - articleListTopPos + 28
        }px`;
      }
    } else {
      btnDropDown.parentElement.parentElement.style.paddingRight = "0px";
      dropDownList.style.maxHeight = "0px";
      articleList.style.marginTop = "18px";
    }
  });
}

const btnDropDownProject = document.querySelector(
  ".sclastprojects .sclastprojects__textbox .sclastprojects__textbox-dropdown .dropdowngroup .dropdowngroup__current"
);
if (btnDropDownProject !== null && typeof btnDropDownProject !== "undefined") {
  const dropDownListProject = document.querySelector(
    ".sclastprojects .sclastprojects__textbox .sclastprojects__textbox-dropdown .dropdowngroup .dropdowngroup__list"
  );
  const articleListProject = document.querySelector(
    ".sclastprojects .sclastprojects__articlelist"
  );
  handleDropDownProject(
    btnDropDownProject,
    dropDownListProject,
    articleListProject
  );
}

const btnDropDownProjectDetail = document.querySelector(
  ".scprojectsdemo .scprojectsdemo__textbox .scprojectsdemo__textbox-dropdown .dropdowngroup .dropdowngroup__current"
);
if (
  btnDropDownProjectDetail !== null &&
  typeof btnDropDownProjectDetail !== "undefined"
) {
  const dropDownListProjectDetail = document.querySelector(
    ".scprojectsdemo .scprojectsdemo__textbox .scprojectsdemo__textbox-dropdown .dropdowngroup .dropdowngroup__list"
  );
  const articleListProjectDetail = document.querySelector(
    ".scprojectsdemo .scprojectsdemo__gallery"
  );
  handleDropDownProject(
    btnDropDownProjectDetail,
    dropDownListProjectDetail,
    articleListProjectDetail
  );
}

const btnDropDownNews = document.querySelector(
  ".scnews .scnews__textbox .scnews__textbox-dropdown .dropdowngroup .dropdowngroup__current"
);
if (btnDropDownNews !== null && typeof btnDropDownNews !== "undefined") {
  const dropDownListNews = document.querySelector(
    ".scnews .scnews__textbox .scnews__textbox-dropdown .dropdowngroup .dropdowngroup__list"
  );
  const articleListNews = document.querySelector(
    ".scnews .sclastprojects__articlelist"
  );
  handleDropDownProject(
    btnDropDownNews,
    dropDownListNews,
    articleListNews,
    "308px"
  );
}

const btnDropDownVideo = document.querySelector(
  ".scvideo .scvideo__textbox .scvideo__textbox-dropdown .dropdowngroup .dropdowngroup__current"
);
if (btnDropDownVideo !== null && typeof btnDropDownVideo !== "undefined") {
  const dropDownListNews = document.querySelector(
    ".scvideo .scvideo__textbox .scvideo__textbox-dropdown .dropdowngroup .dropdowngroup__list"
  );
  const articleListNews = document.querySelector(
    ".scvideo .sclastprojects__articlelist"
  );
  handleDropDownProject(
    btnDropDownVideo,
    dropDownListNews,
    articleListNews,
    "308px"
  );
}

// TODO14: Project detail carousel
function handleProjectCarousel() {
  const projectGalleryFancyBox = document?.querySelector(
    "#scprojectsdemo__gallery"
  );
  if (
    projectGalleryFancyBox !== null &&
    typeof projectGalleryFancyBox !== "undefined"
  ) {
    Fancybox.bind(scprojectsdemo__gallery, "[data-fancybox]", {
      Carousel: {
        transition: "slide",
      },
      Thumbs: false,
      Navigation: {
        infinite: true,
        center: false,
      },
    });
  }
}

handleProjectCarousel();

// TODO15: Handle video popup
function handleVideoPopUp() {
  const videoPopUp = document?.querySelector(".video");
  const videoPopUpIframe = videoPopUp?.querySelector(".video__inner iframe");
  const articleThumbs = document?.querySelectorAll(
    ".scvideo .sclastprojects__articlelist .sclastprojects__articlelist-group .article .thumb"
  );
  const articleHeading = document?.querySelectorAll(
    ".scvideo .sclastprojects__articlelist .sclastprojects__articlelist-group .article .textbox .heading"
  );
  const articleBtnWatchVideo = document?.querySelectorAll(
    ".scvideo .sclastprojects__articlelist .sclastprojects__articlelist-group .article .textbox .btnreadpost"
  );
  const VIDEO_URL = "https://www.youtube.com/embed/";

  function handleHideVideo() {
    videoPopUpIframe?.setAttribute("src", "");
    videoPopUp?.classList.remove("--active");
    document.body.classList.remove("--disable-scroll");
  }

  function handleShowVideo(elem) {
    elem.addEventListener("click", (e) => {
      e.stopPropagation();
      videoPopUp?.classList.add("--active");
      const videoId = elem.getAttribute("data-video-id");
      videoPopUpIframe?.setAttribute(
        "src",
        `https://www.youtube.com/embed/${videoId}?autoplay=1`
      );
      document.body.classList.add("--disable-scroll");
    });
  }

  articleThumbs.forEach((thumb) => {
    handleShowVideo(thumb);
  });

  articleHeading.forEach((heading) => {
    const videoId =
      heading.parentElement.previousElementSibling.getAttribute(
        "data-video-id"
      );
    heading.setAttribute("data-video-id", videoId);
    handleShowVideo(heading);
  });

  articleBtnWatchVideo.forEach((btn) => {
    const videoId =
      btn.parentElement.previousElementSibling.getAttribute("data-video-id");
    btn.setAttribute("data-video-id", videoId);
    handleShowVideo(btn);
  });

  document.addEventListener("click", handleHideVideo);
}
handleVideoPopUp();

// TODO16: Loading
function handleProgress() {
  const progressBar = document.querySelector(".progressbar");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const bodyHeight = document.body.scrollHeight;
    const windowInnerWidth = window.innerWidth;
    progressBar.style.width =
      (scrollY * 100) / (bodyHeight - windowInnerWidth) + "%";
  });
}
handleProgress();

// TODO17: Progress
function handleProgress() {}
handleProgress();
