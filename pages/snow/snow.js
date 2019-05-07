

Page({
  data: {
    height:'',
    width:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var height = res.windowHeight; 
        var width = res.windowWidth; 
        that.setData({ height: height, width: width});
        var c = wx.createCanvasContext('myCanvas');
        var   particles = {},
          particleIndex = 0,
          particleNum = 0.5;

        // Setting needed varialbes
        var xmin = 1;
        var xmax = width;
        var bgcolor = "#CCCCCC";
        var canvasheight = height + 1;
        var deleteheight = height + 50;
        // Setting color which is just one big square
        c.setFillStyle(bgcolor) ;
        c.fillRect(0, 0, width, height);
        function Particle() {
          this.x = Math.floor(Math.random() * (xmax - xmin + 1)) + xmin;
          this.y = -60;
          var random1_2 = Math.random() * 4 - 1;
          if (random1_2 <= 2) {
            this.vx = Math.random() * 0 - 0.5;
          } else if (random1_2 >= 2) {
            this.vx = Math.random() * -0 - -0.5;
          }
          this.vy = 0;
          this.gravity = Math.random() * 9 - 6;
          this.life = 0;
          this.maxlife = 250;
          particleIndex++;
          particles[particleIndex] = this;
          this.id = particleIndex;
          this.size = Math.random() * 9 - 6;
          this.color = "rgba(255, 255, 255, 1)";
          this.r = Math.floor(Math.random() * 4 + 1);
        }
        Particle.prototype.draw = function () {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x > width || this.y > deleteheight) {
            delete particles[this.id];
          }
          if (this.y >= height) {
            this.life++;
            this.vy = 0;
            this.vx = 0;
            this.y = height;
          }
          this.vy = this.gravity;
          c.setFillStyle(this.color) ;
          if (this.life == this.maxlife) {
            delete particles[this.id];
          }
          // c.fillRect(this.x, this.y, this.size, this.size);
         
          c.beginPath()
          c.arc(this.x, this.y, this.r, 0,  2*Math.PI)
          c.fill();

        };


        // Draw Entity
        setInterval(function () {
            c.clearRect(0, 0, width, height);
            for (var i = 0; i < particleNum; i++) {
              new Particle();
            }
            for (var i in particles) {
              particles[i].draw();
            }
            c.draw()
        }, 30); 
      }
    })
    
  },

  onShareAppMessage: function () {
  
  },
  links: function () {
    wx.navigateTo({
      url: '/pages/love/love',
    })
  }
})