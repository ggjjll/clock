window.onload = function(){
  // 初始化画布
  initCanvas();
  // 初始化时间
  initData(timeZone);
  changeStyleByKey(showStyle);
  changeType(clockType);
  // 初始化各类列表
  initClockTypeTipList();
  initshowStyleTipList();
  initTimeZoneList();
  addEventListen();
  showTime();
};

// 初始化时间
function initData(timeZone){
  var localeData = new Date();
  // 时差时区计算
  var len = localeData.getTime();
  var offset = localeData.getTimezoneOffset() * 60000;
  var utcTime = len + offset;
  var data = new Date(utcTime + 3600000 * timeZone);
  thisDateTime = data;
  var y = data.getFullYear();
  var m = data.getMonth() + 1;
  var d = data.getDate();
  var dataBox = document.getElementById("dataBox");
  var time = dataBox.getElementsByTagName("time")[0];
  time.innerHTML = y+"年"+m+"月"+d+"日";
  var week = new Array("天","一","二","三","四","五","六");
  document.getElementById("weekBox").innerHTML = "星期" + week[data.getDay()] ;
  document.getElementById("timeZoneBtn").innerHTML = timeZoneTitle;
}

// 初始化钟表类型tip列表
function initClockTypeTipList(){
  var clockTypeTipDom = document.getElementById('clockType');
  var html = '';
  for(var i = 0; i < typeArr.length; i ++){
    html += '<div class="clockTypeItem tipItem iconfont '+typeArr[i].icon+(typeArr[i].key == clockType ? ' tipItemClick': '')+
      '" tip="'+typeArr[i].tip+'">&nbsp;'+typeArr[i].title+'</div>'
  }
  clockTypeTipDom.innerHTML += html;
}

// 初始化皮肤配色tip列表
function initshowStyleTipList(){
  var showStyleDom = document.getElementById('showStyle');
  var html = '';
  for(var i = 0; i < styleArr.length; i ++){
    html += '<div class="styleTypeItem tipItem'+ (styleArr[i].key == showStyle ? ' tipItemClick' : '' ) +
      '" tip="style|'+styleArr[i].key+'"><span class="colorBlock" style="background-color: '+styleArr[i].color.background+
      '"></span>&nbsp;'+styleArr[i].title+'</div>'
  }
  showStyleDom.innerHTML += html;
}

// 初始化时区列表
function initTimeZoneList(){
  var timeZoneList = document.getElementById('timeZoneList');
  var html = '';
  for(var i = 0; i < timeZoneArr.length; i ++){
    html += '<div class="listItem '+(timeZoneArr[i].timeZone == timeZone ? 'listItemClick' : '' )+
      '" timeZone="'+timeZoneArr[i].timeZone+'">'+timeZoneArr[i].title+'</div>'
  }
  timeZoneList.innerHTML += html;
}
