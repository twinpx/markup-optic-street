(function($) {
    "use strict";
    $(function() {
        $(".bj-search-icon").click(function() {
            $(".bj-page-header").addClass("i-search");
            $(".bj-page-header__sub:visible").slideUp();
            setTimeout(function() {
                $(".bj-page-header").addClass("i-ready");
                $(".bj-page-header__search__input").focus();
            }, 100);
        });
        $(".bj-page-header__search-close").click(function(e) {
            e.preventDefault();
            $(".bj-page-header").removeClass("i-ready");
            setTimeout(function() {
                $(".bj-page-header").removeClass("i-search");
            }, 300);
        });
        document.querySelector(".ob-menu-sandwich").addEventListener("click", function(e) {
            e.preventDefault();
            $(".ob-catalog-menu__block").slideToggle();
            $(".ob-catalog-menu-sub:visible").slideUp();
            document.querySelectorAll(".ob-catalog-menu__item.active").forEach(function(item) {
                item.classList.remove("active");
            });
        });
        $("#nav-button").click(function(e) {
            e.preventDefault();
            $(".bj-page-header__sub").slideToggle();
        });
        document.querySelectorAll(".bj-page-header__sub-item.i-menu").forEach(function(item) {
            item.addEventListener("mouseenter", function(e) {
                $(".ob-catalog-menu__block").slideUp();
                if (window.cartDropdownFlag) {
                    window.cartDropdownFlag = false;
                    setTimeout(function() {
                        if (!window.cartDropdownFlag) {
                            $(".bj-page-header__cart-dropdown article").slideUp().removeClass("i-animate");
                            $("#cartDropdown").removeClass("i-loaded");
                        }
                    }, 100);
                }
                const subMenu = item.querySelector(".bj-page-header__sub-menu");
                subMenu.classList.add("i-show");
                setTimeout(function() {
                    subMenu.classList.add("i-visible");
                }, 100);
            });
            item.addEventListener("mouseleave", function(e) {
                const subMenu = item.querySelector(".bj-page-header__sub-menu");
                subMenu.classList.remove("i-visible");
                setTimeout(function() {
                    subMenu.classList.remove("i-show");
                }, 300);
            });
        });
        $(".bj-page-header__dropdown article").click(function(e) {
            e.stopPropagation();
        });
        $(".bj-page-header__dropdown .up").click(function(e) {
            $(this).closest("article").slideUp().removeClass("i-animate");
            e.preventDefault();
        });
        $(".bj-personal-icon").click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(".bj-page-header__sub").slideUp();
            $(".ob-catalog-menu__block").slideUp();
            $(".bj-page-header__dropdown article:visible").slideUp().removeClass("i-animate");
            $(".bj-page-header__user-dropdown article").slideToggle().toggleClass("i-animate");
            if (window.cartDropdownFlag) {
                window.cartDropdownFlag = false;
                setTimeout(function() {
                    if (!window.cartDropdownFlag) {
                        $(".bj-page-header__cart-dropdown article").slideUp().removeClass("i-animate");
                        $("#cartDropdown").removeClass("i-loaded");
                    }
                }, 100);
            }
        });
        if (!$("html").hasClass("bx-touch")) {
            $(".bj-cart-icon").click(function(e) {
                e.stopPropagation();
                e.preventDefault();
                if (!window.cartDropdownFlag) {
                    window.cartDropdownFlag = true;
                    $(".bj-page-header__sub").slideUp();
                    $(".ob-catalog-menu__block").slideUp();
                    $(".bj-page-header__dropdown article:visible").slideUp().removeClass("i-animate");
                    $(".bj-page-header__user-dropdown article").slideUp().removeClass("i-animate");
                    $(".bj-page-header__cart-dropdown article").slideDown();
                    setTimeout(function() {
                        $(".bj-page-header__cart-dropdown article").addClass("i-animate");
                    }, 100);
                    $.ajax({
                        url: $("#cartDropdown").data("url"),
                        type: $("#cartDropdown").data("method"),
                        dataType: "html",
                        success: function(html) {
                            if (html) {
                                $("#cartDropdown .container-fluid").html(html);
                                setTimeout(function() {
                                    $("#cartDropdown").addClass("i-loaded");
                                }, 100);
                            }
                        },
                        error: function(a, b, c) {
                            if (window.console) {
                                console.log(a);
                                console.log(b);
                                console.log(c);
                            }
                        }
                    });
                } else {
                    window.cartDropdownFlag = false;
                    setTimeout(function() {
                        if (!window.cartDropdownFlag) {
                            $(".bj-page-header__cart-dropdown article").slideUp().removeClass("i-animate");
                        }
                    }, 100);
                    setTimeout(function() {
                        if (!window.cartDropdownFlag) {
                            $("#cartDropdown").removeClass("i-loaded");
                        }
                    }, 500);
                }
            });
        } else {
            $(".bj-cart-icon").click(function(e) {
                e.stopPropagation();
            });
        }
        $(document).bind("click", function(e) {
            $(".bj-page-header__dropdown article").slideUp().removeClass("i-animate");
            $(".bj-page-header__user-dropdown article").slideUp().removeClass("i-animate");
            if (window.cartDropdownFlag && !$(e.target).closest("#cartDropdown").length) {
                window.cartDropdownFlag = false;
                setTimeout(function() {
                    if (!window.cartDropdownFlag) {
                        $(".bj-page-header__cart-dropdown article").slideUp().removeClass("i-animate");
                        $("#cartDropdown").removeClass("i-loaded");
                    }
                }, 100);
            }
        });
        if (window.matchMedia("(max-width: 1024px)").matches) {
            document.querySelectorAll(".ob-catalog-menu__link").forEach(function(elem) {
                elem.addEventListener("click", function(e) {
                    if (elem.className.search("i-link") !== -1) {
                        return;
                    }
                    e.preventDefault();
                    if (elem.closest(".ob-catalog-menu__item").className.search("active") < 0) {
                        document.querySelectorAll(".ob-catalog-menu__item.active").forEach(function(menuItem) {
                            menuItem.classList.remove("active");
                        });
                        $(".ob-catalog-menu-sub:visible").slideUp();
                    }
                    elem.closest(".ob-catalog-menu__item").classList.toggle("active");
                    $(elem.parentNode.querySelector(".ob-catalog-menu-sub")).slideToggle();
                });
            });
            document.querySelectorAll(".ob-catalog-menu__title").forEach(function(elem) {
                elem.addEventListener("click", function(e) {
                    e.preventDefault();
                    elem.classList.toggle("active");
                    $(elem.parentNode.querySelector(".ob-catalog-menu__block")).slideToggle();
                    if (document.querySelectorAll(".ob-catalog-menu__item.active").length) {
                        document.querySelectorAll(".ob-catalog-menu__item.active").forEach(function(menuItem) {
                            menuItem.classList.remove("active");
                        });
                        $(".ob-catalog-menu-sub:visible").slideUp();
                    }
                });
            });
            document.getElementById("title-search-input").addEventListener("keyup", function() {
                if (document.getElementById("title-search-input").value !== "") {
                    document.querySelector(".bj-page-header").classList.add("i-search-input-filled");
                } else {
                    document.querySelector(".bj-page-header").classList.remove("i-search-input-filled");
                }
            });
            $(".bj-page-header__search-close").click(function(e) {
                e.preventDefault();
                document.getElementById("title-search-input").value = "";
                document.querySelector(".bj-page-header").classList.remove("i-search-input-filled");
            });
        }
    });
})(jQuery);