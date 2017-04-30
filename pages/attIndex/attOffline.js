var wxbarcode = require('../../utils/barcodeindex.js');

Page({
  data: {
    code: wx.getStorageSync('Student_Id')
  },

  onLoad: function () {
    wxbarcode.barcode('barcode', wx.getStorageSync('Student_Id'), 680, 200);
    wxbarcode.qrcode('qrcode', wx.getStorageSync('Student_Id'), 420, 420);
  }
})