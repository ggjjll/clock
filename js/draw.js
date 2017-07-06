var canvas;
var ctx;
var canvasWidth;
var canvasHeight;
var radius;

// 初始化画布
function initCanvas() {
  canvas = document.getElementById("clock");
  ctx = canvas.getContext("2d");
}

// 启动时间展示
function showTime() {
  setInterval(function () {
    // 相应式修改画布尺寸
    canvasWidth = canvas.offsetWidth;
    canvasHeight = canvas.offsetHeight;
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);
    switch (clockType) {
      // 钟表模式
      case 'watch':
        drawWatchClock();
        break;
      // LED模式
      case 'led':
        drawLEDClock();
        break;
    }
  }, 50);
}

/**
 * 绘制各种模式显示的main函数们，主要负责组织元器件，绘制表盘
 * */
// 绘制圆形时钟
function drawWatchClock() {
  radius = canvasWidth / 2;       //半径
  ctx.clearRect(0, 0, canvasWidth, canvasWidth);
  ctx.save();
  ctx.translate(radius, radius);
  drawDial();
  drawPointer();
  ctx.restore();
}

// 绘制LED时间面板
function drawLEDClock() {
  initData(timeZone);
  var h = thisDateTime.getHours();
  var m = thisDateTime.getMinutes();
  var s = thisDateTime.getSeconds();
  ctx.strokeStyle = styleObj.pointer_1;
  // 小时LED
  drawLEDNun(canvasWidth * 0.22, canvasHeight * 0.2, canvasWidth * 0.08, parseInt(h / 10));
  drawLEDNun(canvasWidth * 0.38, canvasHeight * 0.2, canvasWidth * 0.08, parseInt(h % 10));
  // 分钟LED
  drawLEDNun(canvasWidth * 0.62, canvasHeight * 0.2, canvasWidth * 0.08, parseInt(m / 10));
  drawLEDNun(canvasWidth * 0.78, canvasHeight * 0.2, canvasWidth * 0.08, parseInt(m % 10));
  // 秒LED
  drawLEDNun(canvasWidth * 0.3, canvasHeight * 0.68, canvasWidth * 0.2, parseInt(s / 10));
  drawLEDNun(canvasWidth * 0.7, canvasHeight * 0.68, canvasWidth * 0.2, parseInt(s % 10));
  // 时分分割点
}

/**
 * 绘制各种元器件
 * */
// 绘制表盘
function drawDial() {
  // 绘制圆形
  ctx.fillStyle = styleObj.dial;
  drawCircular(radius);
  // 表盘数字
  var fontSize = parseInt(radius / 7);
  ctx.font = fontSize + 'px Meiryo UI';
  ctx.textAlign = 'center';
  ctx.fillStyle = styleObj.font;
  for (var i = 0; i < 12; i++) {
    var rotate = Math.PI / 6 * (i - 2);     // 水平偏离角度
    ctx.fillText((i + 1) + '', Math.cos(rotate) * (radius - fontSize), Math.sin(rotate) * (radius - fontSize) + 2 * fontSize / 5);
  }
  // AM/PM
  initData(timeZone);
  var h = thisDateTime.getHours();
  ctx.fillText((h<12 ? 'AM' : 'PM'), 0, -0.55*radius);
  // 中心点
  ctx.fillStyle = styleObj.pointer_1;
  drawCircular(canvasWidth / 30);
}

// 绘制指针
function drawPointer() {
  initData(timeZone);
  var h = thisDateTime.getHours();
  var m = thisDateTime.getMinutes();
  var s = thisDateTime.getSeconds();
  ctx.save();
  var rotate;
  ctx.rotate(-Math.PI / 2);
  ctx.lineJoin = 'round';
  ctx.strokeStyle = styleObj.pointer_1;
  // 绘制时钟
  ctx.lineWidth = canvasWidth / 40;
  rotate = (h + m / 60 + s / 3600) * Math.PI / 6;
  drawLine(rotate, radius * 0.5);
  // 绘制分针
  ctx.lineWidth = parseInt(canvasWidth / 60);
  rotate = m / 30 * Math.PI;
  drawLine(rotate, radius * 0.6);
  // 绘制秒针
  ctx.strokeStyle = styleObj.pointer_2;
  ctx.lineWidth = 3;
  rotate = s / 30 * Math.PI;
  drawLine(rotate, radius * 0.7);
  // 中心红点
  ctx.fillStyle = styleObj.pointer_2;
  drawCircular(5);
  ctx.restore();
}

// 绘制一个LED数字
function drawLEDNun(x, y, size, num) {
  ctx.lineWidth = size / 8;
  ctx.lineJoin = 'round';
  var vertical = Math.PI / 2;
  var spacing = size / 10;
  // 数字解析
  var numCodeArr = LEDNumCode[num].toString(2).split('').reverse();
  var numShowArr = [];
  numCodeArr.forEach(function (item) {
    numShowArr.push(parseInt(item));
  });
  ctx.save();
  ctx.translate(x - size / 2, y - size - 2 * spacing);
  if (!numShowArr[0])drawLine(0, size);
  ctx.restore();
  ctx.save();
  ctx.translate(x + size / 2 + 2 * spacing, y - size - spacing);
  if (!numShowArr[1])drawLine(vertical, size);
  ctx.restore();
  ctx.save();
  ctx.translate(x + size / 2 + 2 * spacing, y + spacing);
  if (!numShowArr[2])drawLine(vertical, size);
  ctx.restore();
  ctx.save();
  ctx.translate(x - size / 2, y + size + 2 * spacing);
  if (!numShowArr[3])drawLine(0, size);
  ctx.restore();
  ctx.save();
  ctx.translate(x - size / 2 - 2 * spacing, y + spacing);
  if (!numShowArr[4])drawLine(vertical, size);
  ctx.restore();
  ctx.save();
  ctx.translate(x - size / 2 - 2 * spacing, y - size - spacing);
  if (!numShowArr[5])drawLine(vertical, size);
  ctx.restore();
  ctx.save();
  ctx.translate(x - size / 2, y);
  if (!numShowArr[6])drawLine(0, size);
  ctx.restore();
}

/**
 * 绘制基本元素
 * */
// 画圆圈
function drawCircular(radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

// 画线
function drawLine(rotate, length) {
  ctx.save();
  ctx.rotate(rotate);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(length, 0);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

