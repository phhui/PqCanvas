function carGift(id){
     var $this = this;
     var light = new Image();
     var car = new Image();
     var car1 = new Image();
     var road = new Image();
     var flower=new Image();
     var cxt = null;
     var t = 0;
     this.id = id;
     var w=$(window).width();
     var h=$(window).height();
     var loadSuccessNum=0;
     var imgNum=4;
     var p={x:240,y:230};
     var pq=new zTools();
     this.init =function(){
        var canvas=document.getElementById(this.id);
        canvas.width=w;
        canvas.height=h;
         pq.init(canvas);
        cxt =canvas.getContext('2d');
        cxt.imageSmoothingEnabled=true;
        
        road.src="img/car/road.png";
        road.onload=function(){$this.onLoaded();}
        car.src="img/car/car.png";
        car.onload=function(){$this.onLoaded();}
        light.src="img/car/light.png";
        light.onload=function(){$this.onLoaded();}
        flower.src="img/car/flower.png";
        flower.onload=function(){$this.onLoaded();}
     };
     this.onLoaded=function(){
         loadSuccessNum++;
         if(loadSuccessNum==imgNum){
             $this.run();
         }
     }
     this.run = function(){
         pq.to({img:road,width:1,height:1},0.5,{width:road.width,height:road.height,autoRemove:true});
         pq.to({img:car,x:0,y:0},0.5,{x:p.x,y:p.y,onComplete:$this.showFlower,autoRemove:true});
     };
     this.showFlower=function(){
         pq.to({img:car,x:p.x+150,y:p.y,width:car.width,height:car.height,scaleX:-1},3,{x:p.x,y:p.y+150,autoRemove:true,onComplete:$this.carOut});
         for(var i=0;i<16;i++){
             for(var j=0;j<i;j++){
                var img={img:flower,scaleX:(j%2==1?1:-1),x:p.x+100-j*20,y:p.y+100+j*20,width:1,height:1,alpha:0};
                var param={delay:i*0.2,alpha:1,rotation:Math.random()*360,x:0+Math.random()*800-200,y:0-Math.random()*400,width:flower.width,height:flower.height,autoRemove:true};
                pq.to(img,2+j*0.1,param);
            }
        }
        pq.to({img:light,x:p.x+10,y:p.y+15},2,{x:p.x-85,y:p.y+110,autoRemove:true});
        pq.to({img:light,x:p.x+70,y:p.y+20},2,{x:p.x-35,y:p.y+118,autoRemove:true});
        pq.to({img:light,x:p.x-90,y:p.y+115},1,{delay:2.1,x:p.x-145,y:p.y+170,autoRemove:true});
        pq.to({img:light,x:p.x-40,y:p.y+125},1,{delay:2.1,x:p.x-90,y:p.y+175,autoRemove:true});
     };
     this.carOut=function(){
         pq.to({img:road,width:1,height:1,scaleX:-1,x:road.width/2,y:road.height*1.5},1.8,{x:road.width/2,y:road.height*1.5,width:road.width,height:road.height,autoRemove:true});
         pq.to({img:car,x:p.x,y:p.y+150,width:car.width,height:car.height,scaleX:-1},1,{x:0,y:580,autoRemove:true,onComplete:$this.theEnd});
         //pq.to({img:light,x:-200,y:-100},2,{x:-200,y:-100,autoRemove:true,onComplete:$this.theEnd});
     };
     this.theEnd=function(){
         pq.clear();
         console.log("end");
         //动画结束
     }
 }
 
 $(document).ready(function(){
    var g = new carGift('canvas');
    g.init();
});