# pqCanvas
- 简单封装的HTML5动画框架
- 一般都是使用白鹭构建H5游戏，但白鹭编译后要并入网页或其它页面上比较容易出现冲突，这次有需求要实现几个动画，便花了些时间用H5实现基本的动画功能。
- 目前只支持绘制图片实现动画效果，不支持点击操作。
- 通过调用zTools.to(obj,time,param)实现动画
- obj:{img:"要绘制的图片Image",x:"起始X坐标",y:"起始y坐标",width:"起始宽度",height:"起始宽度",sx:"裁切X坐标",sy:"裁切Y坐标",swidth:"裁切宽度",sheight:"裁切高度",scaleX:"宽度比(翻转)",rotation:"旋转",alpha:"起始透明度"}
- time:动画时间/秒
- param:{delay:"迟延时间/秒",x:"结束X坐标",y:"结束y坐标",width:"结束宽度",height:"结束宽度",sx:"结束裁切X坐标",sy:"结束裁切Y坐标",swidth:"结束裁切宽度",sheight:"结束裁切高度",scaleX:"结束宽度比(翻转)",rotation:"结束旋转角度",alpha:"结束透明度",autoRemove:"动画结束后是否自动移除",onComplete:"动画结束后回调的方法"}
- 裁切相关参数未完善估计有BUG，其它功能均已在实例中测试过。
- zTools.clear();强制清除画布上所有对象
- 具体应用参考代码中的实例

![image](https://github.com/phhui/PqCanvas/blob/master/img/a.gif)
