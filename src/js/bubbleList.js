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
    if ($(this).find(".offsetAngle").length > 0)
        offsetAngle = parseInt($(this).find('.offsetAngle').text());

    $(this).children('.bubbleContainer').each(function() {
        $(this).css('transform', 'rotate(' + (listAngles[bubbleListIndex]*bubbleIndex + offsetAngle) + 'deg)' + 'translate(' + radius + 'px)');
        $(this).children('.bubble').css('transform', 'rotate(' + (-listAngles[bubbleListIndex]*bubbleIndex - offsetAngle) + 'deg)');
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
});




//Create the active bubble div above selected bubble
$bubble.click(function() {
    //If element is a non selectable element - e.g. contains nonSelectableBubble class
    if ($(this).hasClass('nonSelectableBubble'))
        return;

    $(this).addClass('hoveredBubble');
    $(this).parent('.bubbleContainer').addClass('hoveredBubbleContainer');

    //Create active bubble div
    const $body = $('body')
    $body.append('<div class="activeBubbleBackCover"></div>');
    $body.append('<div class="activeBubbleShadow"></div>')
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
    changeSize(activeBubble, hoveredDiameter, activeWidth, 10);
    //Pull header, description, and footer from bubble elements and place in active bubble
    $(this).children('.bubbleHeader').clone().appendTo(activeBubble);
    $(this).children('.bubbleDescription').clone().appendTo(activeBubble);
    $(this).children('.bubbleFooter').clone().appendTo(activeBubble);
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
    //     changeSize(activeBubble, baseDiameter, baseDiameter, "50%");
    //     removeActive();
    //     setTimeout(function () {
    //         $('.hoveredBubble').removeClass('hoveredBubble');
    //         $('.bubbleContainer').removeClass('hoveredBubbleContainer');
    //     }, 20);
    // }
    // // if the target of the click is the active bubble itself
    // else if ($(e.target).parents('.activeBubble').length !== 0 &&
    // !$(e.target).is('.bubbleLink') ||
    // $(e.target).is('.activeBubble')) {
        changeSize(activeBubble, hoveredDiameter, hoveredDiameter, "50%");
        removeActive();
        setTimeout(function () {
            $('.hoveredBubble').removeClass('hoveredBubble');
            $('.bubbleContainer').removeClass('hoveredBubbleContainer');
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
function changeSize(bubble, height, width, borderRadius) {
    bubble.css('width', width);
    bubble.css('height', height);
    bubble.css('border-radius', borderRadius);
}