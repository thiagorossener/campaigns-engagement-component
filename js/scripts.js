$(document).ready(function () {
    initEngagementPanelScroll();
    initEngagementPanelTabs();
    initEngagementPanelFilterItems();
});

function initEngagementPanelScroll() {
    $("#btn-scroll-left").click(function () {
        showPreviousTab();
    });

    $("#btn-scroll-right").click(function () {
        showNextTab();
    });

    $("#scroll-area").scroll(toggleScrollButtons);
    $(window).resize(toggleScrollButtons);

    toggleScrollButtons();
}

function initEngagementPanelTabs() {
    $(".tab-item-total").click(selectTotalTab);
    $(".tab-item-total .line2").click(selectTotalTabDetailed);
    $(".tab-item").click(selectTab);
}

function initEngagementPanelFilterItems() {
    $(".panel-totals .clickable").click(function () {
        $(".panel-totals .clickable").removeClass("active");
        $(this).addClass("active");
    });
    $(".panel-detailed .clickable").click(function () {
        $(".panel-detailed .clickable").removeClass("active");
        $(this).addClass("active");
    });
}

function isTabVisible(index) {
    var paddingLeft = 11;
    var tabX1 = Math.round($("[data-index="+index+"]").offset().left);
    var tabX2 = tabX1 + Math.round($("[data-index="+index+"]").width());
    var scrollAreaX1 = Math.round($("#scroll-area").offset().left);
    var scrollAreaX2 = scrollAreaX1 + Math.round($("#scroll-area").width()) + paddingLeft;
    return tabX1 >= scrollAreaX1 && tabX2 <= scrollAreaX2;
}

function toggleScrollButtons() {
    var firstTab = parseInt($('.tab-item').first().attr('data-index'));
    if (isTabVisible(firstTab)) {
        $("#btn-scroll-left").addClass("hide");
        $("#scroll-area").removeClass("scroll-area-hide-left");
        $("#scroll-area").addClass("offset-first-tab");
    } else {
        $("#btn-scroll-left").removeClass("hide");
        $("#scroll-area").addClass("scroll-area-hide-left");
        $("#scroll-area").removeClass("offset-first-tab");
    }
    var lastTab = parseInt($('.tab-item').last().attr('data-index'));
    if (isTabVisible(lastTab)) {
        $("#btn-scroll-right").addClass("hide")
        $("#scroll-area").removeClass("scroll-area-hide-right");
    } else {
        $("#btn-scroll-right").removeClass("hide");
        $("#scroll-area").addClass("scroll-area-hide-right");
    }
}

function showPreviousTab() {
    var totalTabs = $(".tab-item").length;
    var larguraAreaScroll = $("#scroll-area").width();
    var offsetTabs = 0;
    for (var i=0; i<totalTabs; i++) {
        if (isTabVisible(i)) {
            var tabAnterior = i - 1;
            $("#scroll-area").stop()
            .animate({
                scrollLeft: offsetTabs - $("[data-index="+tabAnterior+"]").width()
            }, 300);
            return;
        }
        offsetTabs += $("[data-index="+i+"]").width();
    }
}

function showNextTab() {
    var totalTabs = $(".tab-item").length;
    var offsetTabs = 0;
    for (var i=0; i<totalTabs; i++) {
        if (isTabVisible(i)) {
            var tabSeguinte = i + 1;
            var scrollLeft = offsetTabs + $("[data-index="+tabSeguinte+"]").width();
            if (tabSeguinte === totalTabs-1) {
                scrollLeft = $("#scroll-area")[0].scrollWidth - $("#scroll-area").width();
            }
            $("#scroll-area").stop()
            .animate({
                scrollLeft: scrollLeft
            }, 300);
            return;
        }
        offsetTabs += $("[data-index="+i+"]").width();
    }
}

function selectTab() {
    unselectTabs();

    var tabItem = $(this);
    var leftArrowItem = tabItem.find(".item-arrow-left");
    var middleArrowItem = tabItem.find(".item-arrow-middle");
    var rightArrowItem = tabItem.find(".item-arrow-right");
    tabItem.removeClass("tab");
    tabItem.addClass("tab-selected");
    leftArrowItem.removeClass("tab-arrow-left");
    leftArrowItem.addClass("tab-arrow-left-selected");
    leftArrowItem.html("<use xlink:href=\"#tab-arrow-left-selected\"></use>");
    middleArrowItem.removeClass("tab-arrow-middle");
    middleArrowItem.addClass("tab-arrow-middle-selected");
    rightArrowItem.removeClass("tab-arrow-right");
    rightArrowItem.addClass("tab-arrow-right-selected");
    rightArrowItem.html("<use xlink:href=\"#tab-arrow-right-selected\"></use>");

    tabItem.find(".line1").addClass("active");

    $(".panel-detailed").removeClass("init");
    $(".panel-detailed").removeClass("hide");
    $(".panel-totals").addClass("hide");
}

function selectTotalTab() {
    unselectTabs();

    var totalTabItem = $(this);
    var totalArrowItem = totalTabItem.find(".item-arrow-total");
    var rightArrowItem = totalTabItem.find(".item-arrow-right");
    totalTabItem.removeClass("tab");
    totalTabItem.removeClass("tab-total");
    totalTabItem.addClass("tab-total-selected");
    totalArrowItem.removeClass("tab-arrow-total");
    totalArrowItem.addClass("tab-arrow-total-selected");
    rightArrowItem.removeClass("tab-arrow-right");
    rightArrowItem.addClass("tab-arrow-right-selected");
    rightArrowItem.html("<use xlink:href=\"#tab-arrow-right-selected\"></use>");

    totalTabItem.find(".line1").addClass("active");

    $(".panel-detailed").addClass("hide");
    $(".panel-totals").removeClass("hide");
}

function selectTotalTabDetailed(e) {
    e.stopPropagation();

    unselectTabs();

    var totalTabItem = $(this).closest(".tab-item-total");
    var totalArrowItem = totalTabItem.find(".item-arrow-total");
    var rightArrowItem = totalTabItem.find(".item-arrow-right");
    totalTabItem.removeClass("tab");
    totalTabItem.removeClass("tab-total");
    totalTabItem.addClass("tab-total-selected");
    totalArrowItem.removeClass("tab-arrow-total");
    totalArrowItem.addClass("tab-arrow-total-selected");
    rightArrowItem.removeClass("tab-arrow-right");
    rightArrowItem.addClass("tab-arrow-right-selected");
    rightArrowItem.html("<use xlink:href=\"#tab-arrow-right-selected\"></use>");

    totalTabItem.find(".line2").addClass("active");

    $(".panel-detailed").removeClass("hide");
    $(".panel-totals").addClass("hide");
}

function unselectTabs() {
    var totalTabItem = $(".tab-item-total");
    var totalArrowItem = totalTabItem.find(".item-arrow-total");
    var rightArrowItem = totalTabItem.find(".item-arrow-right");
    totalTabItem.removeClass("tab-total-selecinada");
    totalTabItem.addClass("tab-total");
    totalTabItem.addClass("tab");
    totalTabItem.addClass("tab-total");
    totalTabItem.removeClass("tab-total-selected");
    totalArrowItem.addClass("tab-arrow-total");
    totalArrowItem.removeClass("tab-arrow-total-selected");
    rightArrowItem.addClass("tab-arrow-right");
    rightArrowItem.removeClass("tab-arrow-right-selected");
    rightArrowItem.html("<use xlink:href=\"#tab-arrow-right\"></use>");
    totalTabItem.find(".line1").removeClass("active");
    totalTabItem.find(".line2").removeClass("active");

    var allTabItems = $(".tab-item");
    var allLeftArrowItems = $(".item-arrow-left");
    var allRightArrowItems = $(".item-arrow-right");
    var allMiddleArrowItems = $(".item-arrow-middle");
    allTabItems.removeClass("tab-selected");
    allTabItems.addClass("tab");
    allLeftArrowItems.removeClass("tab-arrow-left-selected");
    allLeftArrowItems.addClass("tab-arrow-left");
    allLeftArrowItems.html("<use xlink:href=\"#tab-arrow-left\"></use>");
    allMiddleArrowItems.removeClass("tab-arrow-middle-selected");
    allMiddleArrowItems.addClass("tab-arrow-middle");
    allRightArrowItems.removeClass("tab-arrow-right-selected");
    allRightArrowItems.addClass("tab-arrow-right");
    allRightArrowItems.html("<use xlink:href=\"#tab-arrow-right\"></use>");
    allTabItems.find(".line1").removeClass("active");
    allTabItems.find(".line2").removeClass("active");

    $(".tabs .clickable").removeClass("active");
}
