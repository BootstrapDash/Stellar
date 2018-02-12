(function($) {
    'use strict';
    var tour = new Tour({
        steps: [
          {
            element: "#tourHeadingElement",
            title: "Heading Element",
            content: "This is an example of card heading",
            placement: 'left'
          },
          {
            element: "#tourParagraphElement",
            title: "Paragraph",
            content: "This is an example of paragraph",
            placement: 'left'
          },
          {
            element: "#tourButtonElement",
            title: "Button",
            content: "We provide you with a bunch of buttons in different colors",
            placement: 'right'
          },
          {
            element: "#tourRoundedButtonElement",
            title: "Rounded Button",
            content: "And there are rounded buttons too!",
            placement: 'left'
          },
          {
            element: "#tourTableElement",
            title: "Table",
            content: "This is an example of a bordered table",
            placement: 'left'
          },
          {
            element: "#tourTextStylesElement",
            title: "Text styles",
            content: "Checkout the different text styles provided in our template",
            placement: 'left'
          }
        ],
        template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content'></div><div class='p-2'><button class='btn btn-secondary btn-sm mr-1' data-role='prev'>Prev</button><button class='btn btn-secondary btn-sm mr-3' data-role='next'>Next</button><button class='btn btn-danger btn-sm' data-role='end'>End tour</button></div></div>",
        autoscroll: 'true',
        backdrop: 'true',
        onShown: function(tour) {
          var step = tour._options.steps[tour.getCurrentStep()];
          var element=$(step.element);
          $('.container-scroller').animate({ scrollTop: element.offset().top - $('.content-wrapper').offset().top - 70}, 10);
        }
    });
    if (tour.ended()) {
        tour.init();
        tour.restart();
    } else {
        tour.init();
        tour.restart();
    }
})(jQuery);
