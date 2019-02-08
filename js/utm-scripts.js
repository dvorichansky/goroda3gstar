
//getCookie Kosenko
function getCookie(cname) {
      var results = document.cookie.match ( '(^|;) ?' + cname + '=([^;]*)(;|$)' );
 
      if ( results )
        return ( unescape ( results[2] ) );
      else
        return "";
}

//end getCookie
//change phones by utm Kosenko
function changePhonesByUtm(){
    $('#kievstar, #vodafone, #life, #kievstar-mobile, #vodafone-mobile, #life-mobile, #kievstar-footer, #vodafone-footer, #life-footer, #kievstar-mobile-footer, #vodafone-mobile-footer, #life-mobile-footer, #freephone').each(function(){
        if(getCookie('utm').match('utm_source=google')) {

            $('#kievstar, #kievstar-footer').html('<a href="tel:+380675467322">(067) 546-73-22</a>');
            $('#vodafone, #vodafone-footer').html('<a href="tel:+380501397716">(050) 139-77-16</a>');
            $('#life, #life-footer').html('<a href="tel:+380939587454">(093) 958-74-54</a>');

            $('#freephone').html('<a href="tel:0800211296">0 (800) 211-296</a>');

        } else {
            return;
        }
    });
}


//end change phones by utm Kosenko
changePhonesByUtm();


