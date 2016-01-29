function game(){
    this.clientw=document.documentElement.clientWidth;
    this.clienth=document.documentElement.clientHeight;
    //this.letterArr=[{url:"img/a.jpg",code:65}]
    this.letterArr=['images/a1.png','images/a2.png','images/a3.png','images/a4.png','images/a5.png','images/a6.png','images/a7.png','images/a8.png','images/a9.png','images/a10.png','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    this.letterLen=5;
    this.speed=3;
    this.spans=[];
    this.currArr=[];
    this.currPos=[];
    this.sore=0;
    this.currSore=[];
    this.num=10;
    this.die=10;
    this.soreEle=document.getElementsByClassName("sore")[0].getElementsByTagName("span")[1];
    this.dieEle=document.getElementsByClassName("die")[0].getElementsByTagName("span")[1];
    this.step=10;
    this.aa=1;
}
game.prototype={
    play:function(){
        //将字母显示到body里面
        this.getLetter(this.letterLen);
        this.move();
        this.key();
    },
    key:function(){
        var that=this;
        document.onkeydown=function(e){
            var ev=e||window.event;
            var code=String.fromCharCode(ev.keyCode);
            for(var i=0;i<that.spans.length;i++){
                if(that.spans[i].innerHTML==code){
                    document.body.removeChild(that.spans[i]);
                    that.spans.splice(i,1);
                    that.currArr.splice(i,1);
                    that.currPos.splice(i,1);
                    that.getLetter(1);
                    that.sore++;
                    that.currSore++;
                    that.soreEle.innerHTML=that.sore;
                    if(that.currSore%that.num==0){
                        that.aa++;
                        alert("第"+that.aa+"关");
                        that.next();
                    }
                    break;
                }
            }
        }
    },
    next:function(){
        clearInterval(this.t);
        for(var i=0;i<this.spans.length;i++){
            document.body.removeChild(this.spans[i]);
        }
        this.spans=[];
        this.currArr=[];
        this.currPos=[];
        this.speed++;
        //if(this.speed>){
        //
        //}
        this.letterLen++;
        this.currSore=0;
        this.num+=10;
        this.play();
    },
    move:function(){
        var that=this;
        this.t=setInterval(function(){
            for(var i=0;i<that.spans.length;i++) {
                var top=that.spans[i].offsetTop+that.speed;
                that.spans[i].style.top=top+"px";
                if(top>that.clienth){
                    document.body.removeChild(that.spans[i]);
                    that.spans.splice(i,1);
                    that.currArr.splice(i,1);
                    that.currPos.splice(i,1);
                    that.getLetter(1);
                    that.die--;
                    that.dieEle.innerHTML=that.die;
                    if(that.die==0){
                        alert('game over');
                        //location.reload();
                        that.restart();
                    }
                }
            }
        },60)
    },
    restart:function(){
        clearInterval(this.t);
        for(var i=0;i<this.spans.length;i++){
            document.body.removeChild(this.spans[i]);
        }
        this.spans=[];
        this.currArr=[];
        this.currPos=[];
        this.speed=3;
        this.die=10;
        this.letterLen==5;
        this.currSore=0;
        this.num=10;
        this.play();
    },
    getLetter:function(num){
        //先获取到指定的字母
        var arr=this.getRand(num);
        var posArr=[];
        var eleArr=[];
        for(var i=0;i<arr.length;i++){
            var span=document.createElement('span');
            span.innerHTML=arr[i];
            var x=100+(this.clientw-200)*Math.random();
            var y=100*Math.random();
            var width=30;
            while(this.check1(posArr,x,width)){
                x=100+(this.clientw-200)*Math.random();
            }
            posArr.push({minx:x,maxx:x+width});
            this.currPos.push({minx:x,maxx:x+width});
            span.style.cssText="width:"+width+"px;position:absolute;left:"+x+"px;top:"+y+"px;color:#fff;font-size:30px;";
            document.body.appendChild(span);
            this.spans.push(span);
        }
        //return span;
    },
    check1:function(arr,x,width){
        for(var i=0;i<arr.length;i++){
            if(!(x+width<arr[i].minx||arr[i].maxx<x)){
                return true;
            }
        }
        return false;
    },
    getRand:function(num){
        var arr=[];
        for(var i=0;i<num;i++){
            var rand=Math.floor(this.letterArr.length*Math.random());
            while(this.check(this.currArr,arr,this.letterArr[rand])){
                rand=Math.floor(this.letterArr.length*Math.random());
            }
            arr.push(this.letterArr[rand]);
            this.currArr.push(this.letterArr[rand]);
        }
        return arr;
    },
    check:function(arr,val){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==val){
                return true;
            }
        }
        return false;
    }

}