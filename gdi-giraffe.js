
var initCalendar = function(){
  var todayDate = moment().format("YYYY-MM-DD");
  $('#calendar').fullCalendar({
   header: {
    center: '',
    left: 'prev,next today',
    right: 'agendaWeek,month'
   },
   theme: true,
   firstDay: 1,
   defaultView: 'agendaWeek',
   defaultDate: todayDate,
   selectable: true,
   selectHelper: true,
   contentHeight: 600,
   lang: 'ja',
   axisFormat: 'H:mm',
   minTime: "07:00:00",
   maxTime: "24:00:00",
   select: function(start, end) {
    var title = prompt('イベントタイトル');
    var eventData;
    if (title) {
     eventData = {
      title: title,
      start: start,
      end: end
     };
     $('#calendar').fullCalendar('renderEvent', eventData, true);
    }
    $('#calendar').fullCalendar('unselect');
   },
   editable: true,
   eventLimit: true,
   events: 'http://ec2-54-238-223-40.ap-northeast-1.compute.amazonaws.com/abc/jsonReturn.php'
   // events: [
   //  {
   //   title: 'All Day Event',
   //   start: '2016-06-24'
   //  },
   //  {
   //   title: 'Click for Google',
   //   url: 'http://google.com/',
   //   start: '2016-06-28'
   //  }
   // ]
  });
}

// swiper
var initSwiper = function(){
  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    parallax: true,
    speed: 600,
  });
}

// select thumbnail
var selectThumb = function(){
  $('.box').click(
    function(e){
      e.preventDefault();
      $(this).find('.member-name').toggleClass("selected");
      $(this).find('img').toggleClass('selected');
      if($(this).find('img').hasClass('selected')){
        var name = $(this).find('.member-name a').text()
        console.log(name);
      }
    }
  )
}

var rcd_date = new Date();//基準日時
var rcdysy =  rcd_date.getFullYear();//年の開始
var rcdyey =  rcd_date.getFullYear() + 20;//年をいくつ用意するか
var rcdheight = 30;//1行の高さ
var rcdboxheight = rcdheight * 5;//ロールの行数

var rcd_display = function(targetobj){//ドラムロール描画先を指定
  $('#reference_condition_date_window').append('<div id="rcd_wrapper"></div>');
  targetobj.append('<div id="rcd_wrapper"></div>');
  $('#rcd_wrapper').append('<div id="rcdy"></div>');
  $('#rcd_wrapper').append('<div id="rcdm"></div>');
  $('#rcd_wrapper').append('<div id="rcdd"></div>');
  $('#rcd_wrapper').append('<div id="rcdt"></div>');
  $('#rcd_wrapper').append('<div id="rcd_glass"></div>');

  $('#rcd_wrapper').css({
    'position':'relative',
    'display':'inline-block',
    'overflow':'hidden',
    'height':'150px',
    'line-height':'30px',
    'width':'80%',
    'border':'1px solid #cccccc',
    'font-size':'22px',
    'border-radius':'5px',
    'font-weight':'bold',
    'box-shadow':'0 20px 20px -10px rgba(0,0,0,0.7) inset,0 -20px 20px -10px rgba(0,0,0,0.7) inset',
  });

  $('#rcd_glass').css({
    'position':'absolute',
    'top':'60px',
    'left':'0',
    'height':rcdheight+'px',
    'width':'100%',
    'background-color':'rgba(73, 222, 25, 0.52)',
//  'background-color':'rgba(140,140,255,0.3)',
    'border':'1px solid #555555',
  });

  $('#rcdy').css({
    'box-shadow':'1px 0 0 1px rgba(0,0,0,0.9)',
    // 'border-left':'2px solid #cccccc',
    'border-right':'2px solid #cccccc',
    'width':'35%',
  });

  $('#rcdm').css({
    'margin-left':'1px',
    'box-shadow':'1px 0 0 0 rgba(0,0,0,0.9)',
    // 'border-left':'2px solid #cccccc',
    'border-right':'2px solid #cccccc',
    'width':'20%',
  });

  $('#rcdd').css({
    'margin-left':'1px',
    'border-right':'2px solid #cccccc',
    // 'border-left':'2px solid #cccccc',
    'width':'20%',
  });

  $('#rcdt').css({
    'margin-left':'1px',
    // 'border-left':'2px solid #cccccc',
    'width':'20%',
  });

  $('#rcdy,#rcdm,#rcdd,#rcdt').css({
    'background-color':'transparent',
    'z-index':'1',
    'display':'inline-block',
    'overflow':'hidden',
    'text-align':'right',
    'height':rcdboxheight+'px',
  });


  $('#rcdy,#rcdm,#rcdd,#rcdt').append("<br /><br />");
  for( var i=rcdysy; i<=rcdyey; i++ ){
    $('#rcdy').append(i+"<br />");
  }
  for( var i=1; i<=12; i++ ){
    $('#rcdm').append(i+"<br />");
  }
  for( var i=1; i<=31; i++ ){
    $('#rcdd').append(i+"<br />");
  }
  for( var i=1; i< 24; i++ )
    $('#rcdt').append(i+"<br />");

  $('#rcdy,#rcdm,#rcdd,#rcdt').append("<br /><br />");
}

//obj = イベントをつけるオブジェクト,初期値,コールバック
var drmroll_set = function(obj,ofset_num,callbackfunc){
  if( ofset_num==undefined || ofset_num=="" || ofset_num==null ){
    ofset_num = 0;//ドラムロールの開始数値が1じゃない時用
  }
  obj.bind('touchstart', function() {
    event.preventDefault();
    var sx = event.changedTouches[0].pageX;
    var sy = event.changedTouches[0].pageY;
    var sts = obj.scrollTop();
    obj.bind('touchmove', function() {
      var y = event.changedTouches[0].pageY;
      var dy = y-sy;
      obj.scrollTop(sts-dy);
    });
    obj.bind('touchend', function() {
      var ste = obj.scrollTop();
      var amr = ste%rcdheight;
      var rcdhh = parseInt(rcdheight/2);
      if( amr <= rcdhh ){
        var ido = ste-amr;
      }else{
        var ido = ste+amr;
      }
      obj.scrollTop(ido);
      var rcdsb = rcdheight + parseInt(rcdheight/3);
      var monmon = ido += rcdsb;
      monmon = parseInt(monmon / rcdheight) + ofset_num;
      callbackfunc(monmon);
    });
  });
}

var rcdycal = function(num) {//年用コールバック
  $('#disp_a').html(num);
}
var rcdmcal = function(num) {//月用コールバック
  $('#disp_b').html(num);
}
var rcddcal = function(num) {//日用コールバック
  $('#disp_c').html(num);
}
var rcdtcal = function(num) {//時間用コールバック
  $('#disp_d').html(num);
}

$(function() {
  initCalendar();
  initSwiper();
  selectThumb();
  //ドラムロール呼び出し
  rcd_display($('#reference_condition_date_window'));
  //ドラムロールにタッチイベントをセット
  drmroll_set($('#rcdy'),rcdysy-1,rcdycal);
  drmroll_set($('#rcdm'),"",rcdmcal);
  drmroll_set($('#rcdd'),"",rcddcal);
  drmroll_set($('#rcdt'),"",rcdtcal);
});


