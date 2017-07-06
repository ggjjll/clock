var eventType = 'click';

// 绑定点击事件
function addEventListen(){
  eventType = IsPC() ? 'click' : 'touchend';
  // 气泡项绑定点击事件
  var tips = document.getElementsByClassName('tipItem');
  for(var i = 0; i < tips.length; i ++){
    var tip = tips[i].getAttribute('tip');
    if(tip){
      tips[i].addEventListener(eventType,function(event){
        // 阻止事件冒泡
        event.stopPropagation();
        // 事件处理
        var tip = this.getAttribute('tip');
        var tipType = tip.split('|');
        switch (tipType[0]){
          case 'type':
            // 改变样式
            removeClass('clockTypeItem', 'tipItemClick');
            addClass(this, 'tipItemClick');
            changeType(tipType[1]);
            break;
          case 'style':
            // 改变样式
            removeClass('styleTypeItem', 'tipItemClick');
            addClass(this, 'tipItemClick');
            changeStyleByKey(tipType[1]);
            break;
        }
      });
    }
  }
  // 气泡组绑定点击事件
  // 打开气泡
  var iconBtns = document.getElementsByClassName('iconBtn');
  for(i = 0; i < iconBtns.length; i ++){
    var tipId = iconBtns[i].getAttribute('tipId');
    if(tipId){
      iconBtns[i].addEventListener(eventType, function(event){
        // 阻止事件冒泡
        event.stopPropagation();
        // 改变样式
        removeClass('tip', 'tipShow');
        addClass(document.getElementById(this.getAttribute('tipId')), 'tipShow');
      })
    }
  }
  // 关闭气泡
  var body = document.getElementById('body');
  body.addEventListener(eventType, function(){
    isCover = false;
    removeClass('tip', 'tipShow');
  });
  // 时区列表项点击
  var listItems = document.getElementsByClassName('listItem');
  for(i = 0; i < listItems.length; i ++){
    if(listItems[i].getAttribute('timeZone')){
      listItems[i].addEventListener(eventType, function(event){
        // 阻止事件冒泡
        event.stopPropagation();
        removeClass('listItem', 'listItemClick');
        addClass(this, 'listItemClick');
        // 事件处理
        timeZone = this.getAttribute('timeZone');
        updateLocalStorage('timeZone', timeZone);
        timeZoneTitle = this.innerHTML.split('-')[1];
        updateLocalStorage('timeZoneTitle', timeZoneTitle);
      })
    }
  }
  // 打开时区选择
  var dataBox = document.getElementById('dataBox');
  dataBox.addEventListener(eventType, function(){
    var timeZone = document.getElementById('timeZone');
    addClass(timeZone, 'boxShow');
    document.getElementsByClassName('cover')[0].setAttribute('style', 'display: block');
  });
  // 关闭时区选择
  var clockBtn = document.getElementById('clockBtn');
  clockBtn.addEventListener(eventType, function(event){
    // 阻止事件冒泡
    event.stopPropagation();
    removeClass('box', 'boxShow');
    document.getElementsByClassName('cover')[0].setAttribute('style', 'display: none');
  })
}

/**
 * 样式切换相关
 * */
// 清除class
function removeClass(classKey, className){
  var nodes = document.getElementsByClassName(classKey);

  for(var i = 0; i <　nodes.length; i ++){
    var domClassName = nodes[i].getAttribute('class').replace(' ' + className,'');
    nodes[i].setAttribute('class', domClassName);
  }
}

// 添加class
function addClass(dom, className){
  var domClassName = dom.getAttribute('class');
  if(domClassName.indexOf(className) >= 0)
    return false;
  domClassName += (' ' + className);
  dom.setAttribute('class', domClassName);
}

/**
 * 事件处理相关
 * */
// 切换显示模式
function changeType(type){
  clockType = type;
  updateLocalStorage('clockType', clockType);
}

// 切换样式风格
function changeStyleByKey(key){
  styleArr.forEach(function(item){
    if(item.key == key){
      styleObj = item.color;
      return true;
    }
  });
  updateLocalStorage('showStyle', key);
  // 修改背景颜色
  var body = document.getElementsByTagName('body')[0];
  body.style.backgroundColor = styleObj.background;
  // 修改非canvers文字颜色
  var font = document.getElementsByClassName('font');
  for(var i = 0; i < font.length; i ++){
    font[i].style.color = styleObj.font;
  }
}

/**
 * 其他
 * */
// 缓存管理
function updateLocalStorage(key, value){
  localStorage[key] = value;
}

// 判断是否为电脑
function IsPC(){
  var userAgentInfo = navigator.userAgent;
  var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
  }
  return flag;
}
