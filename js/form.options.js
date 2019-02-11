
//tooltip for forms
function showPopupTooltip (element, tooltiptext, position, positionType, scrollToTooltip) {
  // if ($('#PopupTooltip').length) {
  //  $('#PopupTooltip').remove();
  // }
    
  if (!tooltiptext) {
    tooltiptext = "Введите Ваш телефон";
  }
  if (!position) {
    position = "bottom";
  }
  if (!positionType) {
    positionType = "absolute";
  }
  var elementSelector = $(element);
  var elementOffset = elementSelector.offset();
  var additionalStyles = "";

  if (position == "bottom") {
    var popupLeftPos = parseInt(elementOffset.left + (elementSelector.width() / 2));
    var popupTopPos = parseInt(elementOffset.top + elementSelector.height());
    if (positionType == "fixed") {popupTopPos -= $(window).scrollTop();}

    var popupTooltipArrowLeft = popupLeftPos - 5;
    var popupTooltipArrowTop = popupTopPos - 23;
    var popupTooltipBodyLeft = popupLeftPos - 20;
    var popupTooltipBodyTop = popupTopPos + 7;
  } else {
    var popupLeftPos = parseInt(elementOffset.left + (elementSelector.width() / 2));
    var popupTopPos = parseInt(elementOffset.top);
    if (positionType == "fixed") {popupTopPos -= $(window).scrollTop();}

    var popupTooltipArrowLeft = popupLeftPos - 5;
    var popupTooltipArrowTop = popupTopPos - 25;
    var popupTooltipBodyLeft = popupLeftPos - 20;
    var popupTooltipBodyTop = popupTopPos - 70;
  
    additionalStyles = " transform: rotate(180deg);";
  }
  
  
  var toolTipBodyHTML = '<div id="PopupTooltip" style="display: none; position: ' + positionType + '; width: 100%; z-index: 10000;"> <div id="PopupTooltipArrow" style="left: ' + popupTooltipArrowLeft + 'px; top: ' + popupTooltipArrowTop + 'px; border: solid transparent; position: absolute; border-bottom-color: #505050; border-width: 15px; z-index: 1000;' + additionalStyles + '"></div> <div id="PopupTooltipBody" style="position: absolute; top: ' + popupTooltipBodyTop + 'px; left: ' + popupTooltipBodyLeft + 'px; background-color: #505050; color: #fff; padding: 15px; font-size: 12pt; border-radius: 2px; box-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);">' + tooltiptext + '</div> </div>';

  if (!$('#PopupTooltip').length) {
    $('body').prepend(toolTipBodyHTML);
    $('#PopupTooltip').fadeIn(200);

    // console.log('showPopupTooltip: binding "click" event');
    $(document).bind('click', function(event) {
      var eventSelector = $(event.target);
      // if (element.parent().has(event.target).length != 1 || $(event.target).attr('name') == 'phone') {
      if (eventSelector.attr('type') != 'submit' && eventSelector.attr('type') != 'button' && eventSelector.prop("tagName") != 'BUTTON') {
        // if ($('#PopupTooltip').length) {
          $('#PopupTooltip').remove();
        // }
        $(this).unbind(event);
        // console.log('showPopupTooltip: cancelling "click" event');
      }
    });
  }
  if (scrollToTooltip == 'scroll') {
    $('html, body').animate({
      scrollTop: $('#PopupTooltipBody').offset().top - 400
    }, 500, 'swing');
  }
  // throw new Error('No phone number provided');
}
//end tooltip for forms


$(document).ready(function(){

		const BACKEND_PATH = 'https://3gstar.com.ua/gsubmitclick.php';
    
    //mask
    $('input[name=phone]').mask("+38(999)999-99-99");
    //end mask

    //remove border error on focus
    $('input[name=phone]').focus(function() {
        if($(this).css({'border-color':'f59e79'})) {
            $(this).removeAttr('style');    
        }
    });
    //end remove border error on focus
    
    // сбор форм
    $('form button[type=submit]').click(function(e){
      e.preventDefault();
      // console.log($(this).attr('class'));
      var   form = $(this).parent(),
            phone = form.find('input[name=phone]'),
            nameVal = form.find('#fieldName').val() ? form.find('#fieldName').val() : '',
            phoneVal = phone.val(),
            dataAttr = $(this).attr('data-attr') ? $(this).attr('data-attr') : '',
            formVal  = 'Узнать подробнее про интернет в моем городе';
            
      
      
      if(phoneVal !== ''){
        $(this).hide();
        // console.log(nameVal+phoneVal+dataAttr+formVal);
				form.hide();
				form.parent().find('.hide-call').hide();
				form.parent().find('.data-success').html('<h3>Спасибо!</h3><p>Ваша заявка отправлена!<br>Мы свяжемся с Вами в ближайшее время.</p>');
        $.ajax({
          url: BACKEND_PATH,
          type: 'POST',
          data: {phone:phoneVal, name:nameVal, form: formVal, comment: dataAttr},
          success: function() {
            window.dataLayer.push({ 'event': 'formsendads' });  
          }
        });
      } else{

         phone.css({'border-color':'#fea179'});
         showPopupTooltip(phone, 0, 'top', 0, 'scroll');

      }
          
      });
    // сбор форм

    // сбор форм 3 шага
    $('#form-step button[type=submit]').click(function(e){
      e.preventDefault();
      // console.log($(this).attr('class'));
      var   form = $(this).parent(),
            phone = form.find('input[name=phone]'),
            nameVal = form.find('#fieldName').val() ? form.find('#fieldName').val() : '',
            phoneVal = phone.val(),
            dataAttr = $(this).attr('data-attr') ? $(this).attr('data-attr') : '',
            formVal  = 'Форма три шага. Интернет в городе или деревне';
            
      
      
      if(phoneVal !== ''){
        $(this).hide();
        // console.log(nameVal+phoneVal+dataAttr+formVal); 
        form.hide();
				$( '.step-form-hide' ).hide();
				$( '.step-flex' ).css({'justify-content':'center'});
				form.parent().find('.hide-call, .step-order-form').hide();
				form.parent().find('.data-success').html('<h3>Спасибо!</h3><p>Ваша заявка отправлена!<br>Мы свяжемся с Вами в ближайшее время.</p>');
        $.ajax({
          url: BACKEND_PATH,
          type: 'POST',
          data: {phone:phoneVal, name:nameVal, form: formVal, comment: dataAttr},
          success: function() {
						window.dataLayer.push({ 'event': 'formsendads' });  
          }
        });
      } else{

         phone.css({'border-color':'#fea179'});
				 showPopupTooltip(phone, 0, 'top', 0, 'scroll');

			}
          
      });
    // сбор форм 3 шага

    // попап коллбек 
    $('.callback').click( function(){ 
    var callback_header = $(this).attr('data-attr');
    // console.log(callback_target);
    $('#overlay').fadeIn(400, 
      function(){ 
        $('#popup_callback').show().animate({opacity: 1, top: '20%'}, 200);
        if(callback_header) {
            $('#popup_callback .more').show();
            $('#popup_callback .callback').show();
            $('#popup_callback .more').html(callback_header);
            $('.formSub').attr('data-attr', callback_header);
        }
        // if(callback_header && callback_header == 'price') {
        //     $('#popup_callback .price').show();
        //     $('.formSub').attr('data-attr', callback_header);
        // }
        else if(!callback_header) {
            $('#popup_callback .callback').show();
            $('.formSub').attr('data-attr', 'Перезвоните мне');
        }
    });
    });

      
    $('#popup_callback>.close, #overlay').click( function(){ 

    $('#popup_callback').animate({opacity: 0, top: '45%'}, 200,  
        function(){ 
          $(this).hide();
          $(this).find('.modal-header').hide();
          $('#overlay').fadeOut(400);
        }
      );

    });
    // end попап коллбек
    

});
