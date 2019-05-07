//index.js
var utils = require('../../utils/garden.js');
var WxParse = require('../../utils/wxParse/wxParse');
//获取应用实例
const app = getApp()

Page({
  garden:'',
  offsetX:0,
  offsetY:0,
  gardenCtx:'',
  timer:0,
  togetherInterval:0,
  loveInterval:0,
  loveHtml:'',
  audioCtx:'',
  data: {
    width:0,
    height:0,
    wordHtml:'',
    elapseClock:'',
    loveTopHtml:'',
    wordCss:'',
    togetherCss:'',
    timeCss:'',
    mainCss:'',
    imageCss:''
  },
  //事件处理函数

 onLoad: function () {
   var that = this;
  
  
   clearInterval(that.togetherInterval);
   clearInterval(that.loveInterval);
   const gardenCtx = wx.createCanvasContext('myCanvas');
   that.gardenCtx = gardenCtx;
   var width =320;
   var height = 400;
   wx.getSystemInfo({
     success: function (res) {
       var windowHeight = res.windowHeight;
       width = res.windowWidth;
       height = 300;
       that.setData({
         width: res.windowWidth,
         height:res.windowHeight
       })
       that.offsetX = width / 2 + 5;
       that.offsetY = height / 2 + 35

       that.garden = new utils.Garden(that.gardenCtx, '');
      //  that.typewriter();
      //  setTimeout(function(){
      //    that.startHeartAnimation();
      //  },2000)
       
      
     }
   })
   that.loveTop();
  },
  onShow:function(){
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.play()
  },
  onHide:function(){
    this.audioCtx.pause()
  },
 startHeartAnimation: function() {
   var that = this;
    var interval = 50;
    var angle = 10;
    var heart = new Array();
    var animationTimer = setInterval(function () {
      var bloom = that.getHeartPoint(angle);
      var draw = true;
      for (var i = 0; i < heart.length; i++) {
        var p = heart[i];
        var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
        if (distance < utils.Garden.options.bloomRadius.max * 1.3) {
          draw = false;
          break;
        }
      }
      if (draw) {
        heart.push(bloom);
        that.garden.createRandomBloom(bloom[0], bloom[1]);
      }
      if (angle >= 30) {
        clearInterval(animationTimer);
        // showMessages();
      } else {
        angle += 0.2;
      }
    }, interval);
    setInterval(function () {
      that.garden.render();
    }, utils.Garden.options.growSpeed);
    // setTimeout(function(){
    //   that.garden.render();
    // },2000)
    
  },

 getHeartPoint: function(angle) {
   var that = this;
    var t = angle / Math.PI;
    var _x = 9;
    var _y = 11;
    var width = that.data.width;
    if(width < 414 && width >= 360){
      _x = 8;
      _y = 10;
    }else if(width < 360){
      _x = 7;
      _y = 9;
    }
    var x = _x * (16 * Math.pow(Math.sin(t), 3));
    var y = - _y * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return new Array(that.offsetX + x, that.offsetY + y);
  },
 typewriter:function(){
   var that = this;
   var str = '<span class="comments">2011-03-01</span><br/>'+
     '<span class="keyword" >张先生</span>你还记得吗😀<br/><br/> ' +
     '<span class="comments">2011-11-11</span><br/>' +
     '<span class="keyword" >张先生</span>你的求婚在哪里😭 <br/><br/>'  +
     '<span class="comments">2013-05-06</span><br/>' +
     '<span class="keyword" >张先生</span>我的手镯在哪里<span style="color:red;">❤</span> <br/><br/>'+
     '<span class="string"> I want to say:</span>' +
   '<span class="keyword" >张先生</span>, <span style="color:red;font-size:18px">I love you forever</span> <br/>';
   var progress = 0;
   that.timer = setInterval(function () {
     var current = str.substr(progress, 1);
     if (current == '<') {
       progress = str.indexOf('>', progress) + 1;
     } else {
       progress++;
     }
     var html = str.substring(0, progress) + (progress & 1 ? '_' : '')
     
     WxParse.wxParse('wordHtml', 'html', html, that, 5);
     if (progress >= str.length) {
       clearInterval(that.timer);
       that.setData({ wordCss: 'down', togetherCss:'zoomIn'})
       that.togetherTime();
       that.timeAnimation();
     }
   }, 75);

 },
 togetherTime:function(){
   var that = this;
   var _together = new Date();
   _together.setFullYear(2011, 11, 11);
   _together.setHours(11);
   _together.setMinutes(11);
   _together.setSeconds(11);
   _together.setMilliseconds(0);
   that.togetherInterval = setInterval(function(){
     var obj = that.timeElapse(_together);
     WxParse.wxParse('elapseClock', 'html', obj, that, 5);
   },1000)
 },
 timeElapse:function(date){
   var current = Date();
   var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
   var days = Math.floor(seconds / (3600 * 24));
   seconds = seconds % (3600 * 24);
   var hours = Math.floor(seconds / 3600);
   if (hours < 10) {
     hours = "0" + hours;
   }
   seconds = seconds % 3600;
   var minutes = Math.floor(seconds / 60);
   if (minutes < 10) {
     minutes = "0" + minutes;
   }
   seconds = seconds % 60;
   if (seconds < 10) {
     seconds = "0" + seconds;
   }
   var result = "<span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 小时 <span class=\"digit\">" + minutes + "</span> 分 <span class=\"digit\">" + seconds + "</span> 秒"; 
   return result;
 },
 timeAnimation:function(){
   var that =this;
   that.setData({timeCss:''});
   setTimeout(function(){
     that.setData({ timeCss: 'jackInTheBox' });   
   },3000)
 },
 loveTop:function(){
   var that = this;
   that.loveInterval = setInterval(function(){
     var r_num = Math.floor(Math.random() * 40) + 1;
     var r_size = Math.floor(Math.random() * 20) + 5;
     var r_left = Math.floor(Math.random() * 100) + 1;
     var r_bg = Math.floor(Math.random() * 25) + 100;
     var r_time = Math.floor(Math.random() * 5) + 5;
     that.loveHtml += "<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);-webkit-animation:love " + r_time + "s ease;-moz-animation:love " + r_time + "s ease;-ms-animation:love " + r_time + "s ease;animation:love " + r_time + "s ease'></div>"
     that.loveHtml += "<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);-webkit-animation:love " + (r_time + 5) + "s ease;-moz-animation:love " + (r_time + 5) + "s ease;-ms-animation:love " + (r_time + 5) + "s ease;animation:love " + (r_time + 5) + "s ease'></div>"

     WxParse.wxParse('loveTopHtml', 'html', that.loveHtml, that, 5);

   },1000);
 },
 open:function(){
   var that = this;
   this.setData({ imageCss:'bounceOutLeft'})
   
   setTimeout(function(){
     that.setData({ mainCss: 'show' })
      
      setTimeout(function () {
       
        that.startHeartAnimation();
        setTimeout(function () {
          that.typewriter();
        }, 7000)
      }, 500)
   },1000)
 }
})
