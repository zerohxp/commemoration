// pages/love/love.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    height: 0,
    words: ['愛', 'Amour', 'Liebe', 'Amore', 'Amor', 'Любовь', 'الحب', 'प्यार', 'Cinta', 'Αγάπη', '사랑', 'Liefde', 'Dashuri', 'Каханне', 'Любов', 'Ljubav', 'Láska', 'Armastus', 'Mahal', 'אהבה', 'Szerelem', 'Grá', '爱', 'Mīlestība', 'Meilė', 'Љубовта', 'Cinta', 'عشق', 'Dragoste', 'Láska', 'Renmen', 'ፍቅር', 'munaña', 'Sevgi', 'Љубав', 'karout', 'amà', 'amôr', 'kærleiki', 'mborayhu', 'Upendo', 'sòòyayyàà', 'ljubav', 'Սեր', 'сүю', 'خؤشويستين، حه زكردن', 'сүйүү', 'tia', 'aroha', 'KHAIR', 'प्रेम', 'kjærlighet', 'munay', 'jecel', 'Kärlek', 'soymek', 'Mahal', 'ярату', 'محبت', 'sopp', 'uthando', 'ความรัก', 'Aşk', 'Tình yêu', 'ליבע', 'Love']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {

        that.setData({
          width: res.windowWidth,
          height: res.windowHeight
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})