/**
 * 当前使用的配置项
 * */
var styleObj = {};
var clockType = localStorage.clockType || 'watch';
var showStyle = localStorage.showStyle || 'black';
var thisDateTime = new Date();
var timeZone = localStorage.timeZone || 8;
var timeZoneTitle = localStorage.timeZoneTitle || '北京时间';

/**
 * 配选择的配置项
 * */
// 钟表类型配置
var typeArr = [{
  title: '时钟模式',
  key: 'watch',
  tip: 'type|watch',
  icon: 'icon-shijianshizhong'
},{
  title: 'LED模式',
  key: 'led',
  tip: 'type|led',
  icon: 'icon-jiudianled32px'
}];

// 样式配置
var styleArr = [{
  title: '绅士黑',
  key: 'black',
  color: {
    background: '#171717',
    dial: '#111111',
    font: '#ffffff',
    pointer_1: '#dddddd',
    pointer_2: '#be1e1e'
  }
},{
  title: '宝石蓝',
  key: 'blue',
  color: {
    background: '#33cccc',
    dial: '#009999',
    font: '#003333',
    pointer_1: '#CCFFFF',
    pointer_2: '#cc3366'
  }
}, {
  title: '鹦鹉绿',
  key: 'green',
  color: {
    background: '#33CC99',
    dial: '#009966',
    font: '#003333',
    pointer_1: '#CCFFCC',
    pointer_2: '#CC6633'
  }
},{
  title: '中国红',
  key: 'red',
  color: {
    background: '#FF6633',
    dial: '#FF3333',
    font: '#003333',
    pointer_1: '#ffffff',
    pointer_2: '#990000'
  }
},{
  title: '土豪金',
  key: 'gold',
  color: {
    background: '#FFFF66',
    dial: '#FFCC66',
    font: '#003333',
    pointer_1: '#003333',
    pointer_2: '#FF6600'
  }
},{
  title: '薰衣紫',
  key: 'purple',
  color: {
    background: '#CC99FF',
    dial: '#CC66CC',
    font: '#003333',
    pointer_1: '#FFCCFF',
    pointer_2: '#FF0033'
  }
}];

// 时区相关配置
var timeZoneArr = [{
  title: '零时区-伦敦时间',
  key: '0',
  timeZone: 0
},{
  title: '东一区-柏林时间',
  key: 'e1',
  timeZone: 1
},{
  title: '东二区-雅典时间',
  key: 'e2',
  timeZone: 2
},{
  title: '东三区-莫斯科时间',
  key: 'e3',
  timeZone: 3
},{
  title: '东四区-巴基斯坦时间',
  key: 'e4',
  timeZone: 4
},{
  title: '东五区-伊斯兰堡时间',
  key: 'e5',
  timeZone: 5
},{
  title: '东六区-科伦坡时间',
  key: 'e6',
  timeZone: 6
},{
  title: '东七区-曼谷时间',
  key: 'e7',
  timeZone: 7
},{
  title: '东八区-北京时间',
  key: 'e8',
  timeZone: 8
},{
  title: '东九区-东京时间',
  key: 'e9',
  timeZone: 9
},{
  title: '东十区-悉尼时间',
  key: 'e10',
  timeZone: 10
},{
  title: '东十二区-斐济时间',
  key: 'e12',
  timeZone: 12
},{
  title: '西十区-夏威夷',
  key: 'w10',
  timeZone: -10
},{
  title: '西九区-阿拉斯加时间',
  key: 'w9',
  timeZone: -9
},{
  title: '西八区-太平洋时间',
  key: 'w8',
  timeZone: -8
},{
  title: '西七区-山地时间',
  key: 'w7',
  timeZone: -7
},{
  title: '西六区-中部时间',
  key: 'w6',
  timeZone: -6
},{
  title: '西五区-东部时间',
  key: 'w5',
  timeZone: -5
},{
  title: '西四区-大西洋时间',
  key: 'w4',
  timeZone: -4
},{
  title: '西三区-巴西利亚时间',
  key: 'w3',
  timeZone: -3
}];