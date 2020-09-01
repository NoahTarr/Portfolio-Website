const $bubble = $('.bubble');
const $bubbleList = $('.bubbleList');

$('body').append('<style/>');
const style = $('style');
const radius = parseInt(style.css("top"));
const baseDiameter = parseInt(style.css("left"));
const hoveredDiameter = parseInt(style.css("bottom"));
const activeDiameter = parseInt(style.css("right"));
const activeHeight = parseInt(style.css("margin-left"));
const activeWidth = parseInt(style.css("margin-right"));
style.remove();

let listAngles = [];
$bubbleList.each(function(){
    let childrenCount = $(this).children().length;
    if ($(this).find(".offsetAngle").length > 0)
        childrenCount--;
    listAngles.push(360/childrenCount);
});

let bubbleListIndex = 0;
$bubbleList.each(function(){
    let bubbleIndex = 0;
    let offsetAngle = 0;
    let multipleBubbles = true;
    if ($(this).find(".offsetAngle").length > 0)
        offsetAngle = parseInt($(this).find('.offsetAngle').text());
    if ($(this).children('.bubbleContainer').length === 1)
        multipleBubbles = false;


    $(this).children('.bubbleContainer').each(function() {
        if (multipleBubbles) {
            $(this).css('transform', 'rotate(' + (listAngles[bubbleListIndex]*bubbleIndex + offsetAngle) + 'deg)' + 'translate(' + radius + 'px)');
            $(this).children('.bubble').css('transform', 'rotate(' + (-listAngles[bubbleListIndex]*bubbleIndex - offsetAngle) + 'deg)');
        }
        let backgroundImage = $(this).find('.bubbleBackgroundImage').attr('src');
        if (backgroundImage != null)
            $(this).children('.bubble').css('background-image', 'url("' + backgroundImage + '")');

        //Grab background color and ensure it is a hex color that exists
        let backgroundColor = $(this).find('.bubbleBackgroundColor').text();
        const hexColorRegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|([0-9A-F]{6}$)|([0-9A-F]{3}$)/;
        if (backgroundColor != null && hexColorRegExp.test(backgroundColor))
            $(this).children('.bubble').css('background-color', backgroundColor);
        bubbleIndex++;
    });
    bubbleListIndex++;
}).promise().done(setBubbleListSize());

$(window).resize(function() {
    setBubbleListSize();
    removeActive();
})

function setBubbleListSize() {
    $bubbleList.each(function() {
        let smallestX = 999999;
        let largestX = -999999;
        let smallestY = 999999;
        let largestY = -999999;

        $(this).find('.bubble').each(function() {
            const left = $(this).offset().left;
            const right = $(this).offset().left + $(this).width();
            const top = $(this).offset().top;
            const bottom = $(this).offset().top + $(this).height();
            if (left < smallestX)
                smallestX = left;
            if (right > largestX)
                largestX = right;
            if (top < smallestY)
                smallestY = top;
            if (bottom > largestY)
                largestY = bottom;
        });

        $(this).css('width', largestX - smallestX);
        $(this).css('height', largestY - smallestY);
    });
}



//Create the active bubble div above selected bubble
$bubble.click(function() {
    //If element is a non selectable element - e.g. contains nonSelectableBubble class
    if ($(this).hasClass('nonSelectableBubble'))
        return;

    let activeExpandLeft = false;
    if ($(this).parents('.bubbleList').hasClass('activeExpandLeft') ||
        $(this).hasClass('activeExpandLeft'))
        activeExpandLeft = true;

    //Create active bubble div
    const $body = $('body')
    $body.append('<div class="activeBubbleBackCover"></div>');
    $body.append('<div class="activeBubbleShadow"></div>');
    $body.append('<div class="activeBubble"></div>');
    const activeBubble = $('.activeBubble');
    const activeBubbleShadow = $('.activeBubbleShadow');

    //Set location of active bubble directly over selected bubble
    const offset = $(this).offset();
    const width = $(this).width();
    const height = $(this).height();
    const centerX = offset.left + width / 2;
    const centerY = offset.top + height / 2;
    activeBubble.css('top', centerY);
    activeBubble.css('left', centerX);
    activeBubbleShadow.css('top', centerY);
    activeBubbleShadow.css('left', centerX);

    //Set background color of active bubble to same as clicked bubble
    const bubbleBackgroundColor = $(this).css('background-color');
    if (bubbleBackgroundColor != null)
        activeBubble.css('background-color', bubbleBackgroundColor);
    // activeBubble.css('opacity', 1);
    //Pull header, description, and footer from bubble elements and place in active bubble
    $(this).children('.bubbleHeader').clone().appendTo(activeBubble);
    $(this).children('.bubbleDescription').clone().appendTo(activeBubble);
    $(this).children('.bubbleFooter').clone().appendTo(activeBubble);
    changeSize(activeBubble, hoveredDiameter, activeWidth, 500);
    if (activeExpandLeft)
        activeBubble.css('margin-left', -hoveredDiameter);
});



//Force hovered bubbles to stay as top node elements until fully shrunken
//Adds class to move bubbles container to top
$bubble.mouseover(function(){
    $(this).parent('.bubbleContainer').addClass('hoveredBubbleContainer');
});

//Force hovered bubbles to stay as top node elements until fully shrunken
//Removes class that moves bubbles container to the top
$bubble.mouseleave(function(){
    setTimeout(function () {
        $('.bubbleContainer').removeClass('hoveredBubbleContainer');
    }, 200);
});



//Remove currently active bubble
$(document).click(function(e) {
    let activeBubble = $('.activeBubble');

    // if the bubble is clicked off of
    if (!activeBubble.is(e.target) && activeBubble.has(e.target).length === 0 &&
    $(e.target).parents('.bubble').length === 0 &&
    !$(e.target).is('.bubble')) {
        changeSize(activeBubble, hoveredDiameter, hoveredDiameter, "50%");
        activeBubble.css('margin-left', -.5 * hoveredDiameter);
        setTimeout(function () {
            changeSize(activeBubble, 0, 0, "50%");
            activeBubble.empty();
            activeBubble.css('margin-top', 0);
            activeBubble.css('margin-left', 0);
            // activeBubble.css('opacity', 0);
            removeActive();
        }, 200);
    }
});



function removeActive() {
    let activeBubble = $('.activeBubble');
    $('.activeBubbleBackCover').remove();
    $('.activeBubbleShadow').remove();


    setTimeout(function () {
        activeBubble.remove();
    }, 200);
}



//Animation Functions
function changeSize($bubble, height, width, borderRadius) {
    $bubble.css('width', width);
    $bubble.css('height', height);
    $bubble.css('border-radius', borderRadius);
}