const zTools=function(){
    var $this=this;
    var canvas=null;
    var cxt=null;
    var childList=[];
    var frameNum=5;
    var t=0;
    var timer;
    var hasChild=0;
    var r=0;
    var isRun=false;
    this.init=function(_canvas){
        canvas=_canvas;
        cxt =canvas.getContext('2d');
        if(!isRun)$this.run();
    };
    this.addChild=function(img){
        childList.push({img:img,param:null,time:0,createTime:t,needChange:false});
    }
    this.to=function(obj,time,param){
        this.updateChild();
        childList.push({child:obj,param:param,time:time,createTime:t+(param.delay*1000/frameNum||0),needChange:true});
    };
    this.stop=function(){
        window.clearInterval(timer);
    };
    this.clear=function(){
      childList=[];
      this.updateChild();
    };
    this.run=function(){
        isRun=true;
        if(cxt==null)return;
        timer=setInterval(this.timing,frameNum);
    };
    this.timing=function(){
        t++;
        if(childList.length<1&&hasChild==0)return;
        if(hasChild>0){
            cxt.clearRect(0,0,canvas.width,canvas.height);
        }
        hasChild=0;
        for(var i=0;i<childList.length;i++){
            var obj=childList[i];
            if(obj.param.delay){
                if((t-obj.createTime)<0){
                    continue;
                }
            }
            var split=obj.time*1000/frameNum;
            var xy=$this.updateXY(obj,i);
            var n=(t-obj.createTime>split?split:t-obj.createTime);
            r=n*(obj.param.rotation-(obj.child.rotation||0))/split+obj.child.rotation||0;
            if(!obj.param.rotation)r=obj.child.rotation||0;
            cxt.translate(xy.x,xy.y);
            cxt.rotate(r*Math.PI/180);
            cxt.scale(obj.child.scaleX||1,obj.child.scaleY||1);
            var alpha=n*((obj.param.alpha-obj.child.alpha)/split)+(obj.child.alpha||1);
            if(alpha<0)alpha=1+alpha;
            if(1/alpha<0)alpha=0;
            cxt.globalAlpha=alpha;
            if(obj.child.sx||obj.child.sy||obj.child.swidth||obj.child.sheight||obj.param.sx||obj.param.sy||obj.param.swidth||obj.param.sheight||obj.param.width||obj.param.height){
                var sx=n*(obj.param.sx-obj.child.sx)/split||0;
                var sy=n*(obj.child.sy-obj.child.sy)/split||0;
                var swidth=n*(obj.param.swidth-obj.child.swidth)/split||obj.child.img.width;
                var sheight=n*(obj.param.sheight-obj.child.sheight)/split||obj.child.img.height;
                var width=(n*(obj.param.width-obj.child.width)/split+obj.child.width||obj.child.img.width)||obj.child.width||swidth||obj.child.img.width;
                var height=(n*(obj.param.height-obj.child.height)/split+obj.child.width||obj.child.img.width)||obj.child.height||sheight||obj.child.img.height;
                cxt.drawImage(obj.child.img,sx,sy,swidth,sheight,0,0,width,height);
            }else{
                cxt.drawImage(obj.child.img,0,0,obj.child.width||obj.child.img.width,obj.child.height||obj.child.img.height);
            }
            cxt.globalAlpha=1;
            cxt.scale(obj.child.scaleX||1,obj.child.scaleY||1);
            r&&cxt.rotate((0-r)*Math.PI/180);
            cxt.translate(0-xy.x,0-xy.y);
            if(t-obj.createTime>=split){
                if(obj.param.autoRemove){
                    childList[i]=null;
                    $this.updateChild();
                }
                if(obj.param&&obj.param.onComplete)obj.param.onComplete.apply(null,[]);
            }
            hasChild++;
        }
    };
    this.updateXY=function(obj,i){
        var split=obj.time*1000/frameNum;
        var x2=(obj.param.x-obj.child.x)*(t-obj.createTime>split?split:t-obj.createTime)/split+obj.child.x||0;
        var y2=(obj.param.y-obj.child.y)*(t-obj.createTime>split?split:t-obj.createTime)/split+obj.child.y||0;
        return {x:x2,y:y2};
    };
    this.updateChild=function(){
        for(var i=0;i<childList.length;i++){
            if(childList[i]==null)childList.splice(i,1);   
        }
        if(childList.length<1){
            cxt.clearRect(0,0,canvas.width,canvas.height);
        }
    }
}