(function($){
  $.fn.accordion = function(options) {

    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
      defaults = {
        tag: "li",
        initLength: 5,
        moreText: "▼もっと見る",
        closeText: "▲閉じる",
        moreSpeed: "50",
        closeSpeed: "50"
      },

      options = $.extend(defaults, options),

      obj, allElem, initInfoContents, restInfoContents;
    //----------------- END MODULE SCOPE VARIABLES ---------------

    //-------------------- BEGIN MODULE METHODS ------------------
    return this.each(function() {
      obj = $(this);
      allElem = obj.find(options.tag);
      initElemCount = ':nth-child(-n+'+ options.initLength +')';

      if(allElem.length > options.initLength) {
        initInfoContents = $('<ul>').append(obj.find(options.tag + initElemCount).clone()).html();
        restInfoContents  = $('<ul>').append(obj.find(options.tag + ':not('+ initElemCount + ')').clone()).html();
        obj.html(initInfoContents + '<span class="more" style="display:none;">' + restInfoContents + '</span>');

        obj.append(
          '<div style="text-align:center;margin-top:10px;">' +
            '<a href="#" class="more_link" style="color:#fff;">' + options.moreText + '</a>' +
          '</div>'
        );

        $moreLink = $('.more_link', obj);
        $moreContent = $('.more', obj);

        $moreLink.click(function() {
          if($moreLink.text() == options.moreText) {
            $moreContent.show(options.moreSpeed);
            $moreLink.text(options.closeText);
          } else {
            $moreContent.hide(options.closeSpeed);
            $moreLink.text(options.moreText);
          }
        });
      }
    });
    //--------------------- END MODULE METHODS --------------------

  };
})(jQuery);       