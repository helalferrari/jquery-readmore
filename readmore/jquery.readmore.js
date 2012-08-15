/**
 * jquery.readmore - Substring long paragraphs and make expandable with "more" link
 * @date 19 May 2012
 * @author Jake Trent  http://www.builtbyjake.com
 * @version 1.5
 */
(function ($) {
  $.fn.readmore = function (settings) {

    var defaults = {
      substr_len: 500,
      ellipses: '&#8230;',
      more_link: '<a class="readm-more">Read&nbsp;More</a>',
      more_clzz: 'readm-more',
      ellipse_clzz: 'readm-continue',
      hidden_clzz: 'readm-hidden',
      roll_down_link: '<a class="roll-down">Roll down</a>',
      roll_down_clzz: 'roll-down',
    };

    var opts =  $.extend({}, defaults, settings);

    this.each(function () {
      var $this = $(this);
      if ($this.html().length > opts.substr_len) {
        abridge($this);
        linkage($this);
      }
    });

    function linkage(elem) {
      elem.append(opts.more_link);
      elem.find('.' + opts.more_clzz).click( function () {
        $(this).hide();
        elem.find('.' + opts.ellipse_clzz).hide();
        elem.find('.' + opts.hidden_clzz).animate({'opacity' : 'toggle'},1000);
        
        elem.append(opts.roll_down_link);
        elem.find('.' + opts.roll_down_clzz).click( function () {
        	elem.find('.' + opts.roll_down_clzz).hide();
        	elem.find('.' + opts.hidden_clzz).hide();
        	abridge(elem);
        	linkage(elem);
        });
      });
    }

    function abridge(elem) {
      var txt = elem.html();
      var dots = "<span class='" + opts.ellipse_clzz + "'>" + opts.ellipses + "</span>";
      var shown = txt.substring(0, opts.substr_len) + dots;
      var hidden =
        '<span class="' + opts.hidden_clzz + '" style="display:none;">' +
          txt.substring(opts.substr_len, txt.length) +
        '</span>';
      elem.html(shown + hidden);
    }

    return this;
  };
})(jQuery);
