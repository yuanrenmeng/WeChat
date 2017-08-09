// main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idadd:'+',
    idj:'-',
    idx:'x',
    iddel:'÷',
    ide:'=',
    idc:'clear',
    idb:'callback',
    id9:'9',
    id8: "8",
    id7: "7",
    id6: "6",
    id5: "5",
    id4: "4",
    id3: "3",
    id2: "2",
    id1: "1",
    id0: "0",
    idd: ".",
    operaSymbo: { "＋": "+", "－": "-", "×": "*", "÷": "/", ".": "." },
    screenData:"0",
    arr:[],
    log:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 业务逻辑处理
   */
  clickBtn:function(event){
    var id = event.target.id; 
    // console.log(id);
    if (id==this.data.idb){//退格
        var data = this.data.screenData;//获取输入框的数据
        if(data == 0 ){
          return;
        }else{
          //字符串截取，从0到最后一个
          data = data.substring(0, data.length-1);
        }
        if(data == '' || data=='-'){//输入框的字符串为空
              data = 0;
        }else{
          this.setData({'screenData':data})//不为空就设置给输入框
          this.data.arr.pop();//末尾删除
        } 
    } else if (id == this.data.idc){//清屏
      this.setData({ 'screenData': 0 });
      this.data.arr.length = 0;
    }else if(id == this.data.ide){// 等于号=
      var data = this.data.screenData;//获取输入框的数据
      if (data == 0) {
        return;
      }
      //如果输入框的内容不为0，那么判断最后一个字符是否是数字
      var lastWord = data.charAt(data.length-1);
      if (isNaN(lastWord)){//最后一个字符不是数字
          return;
      }else{
        //如果最后一个字符是数字,此时点击等号说明要计算结果了
        var arr = this.data.arr;
        var onlyNum ='';
        var aboutSum = '';
        var sumArr = [];
        for(var i in arr){
          //判断此时输入框都是数字，或者小数或者正 / 负数，说明还没有运算符，单纯输入的是数字
            if(isNaN(arr[i]==false||arr[i]==this.data.idd)){
              //拼接成一个纯数字字符串
              onlyNum += arr[i];
              sumArr.push(onlyNum);
            }else{//包含运算符
              aboutSum = arr[i];
              sumArr.push(aboutSum);
            }
        }
        //  sumArr.push(Number(onlyNum));
         console.log(sumArr);
        var result = Number(sumArr[0]);
        console.log(result);
        for(var i =1;i<sumArr.length;i++){
          if (isNaN(sumArr[i])){//数组中存放的每组数据不是纯数字时
            if (sumArr[1] == this.data.idadd) {
              console.log(sumArr[i + 1])
              result += Number(sumArr[i + 1]);
            } else if (sumArr[1] == this.data.idj) {
              result -= Number(sumArr[i + 1]);
            } else if (sumArr[1] == this.data.idx) {
              result *= Number(sumArr[i + 1]);
            } else if (sumArr[1] == this.data.iddel) {
              result /= Number(sumArr[i + 1]);
            }
          }
        }
        // //存储历史记录
        // this.data.logs.push(data + result);
        // // wx.setStorageSync("calclogs", this.data.logs);

        // this.data.arr.length = 0;
        // this.data.arr.push(result);

        this.setData({ "screenData": result + "" });
      }

    }else{
      if (this.data.operaSymbo[id]) { //如果是符号+-*/
        if (this.data.screenData == "0") {
          return;
        }
      }
    //这里是获取点击的按钮数据显示在输入栏中
      var sd = this.data.screenData;
      var data;
      if (sd == 0) {
        data = id;
      } else {
        data = sd + id;
      }
      this.setData({ "screenData": data });
      this.data.arr.push(id);//获取输入的内容添加到数组中
    }
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