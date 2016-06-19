var outer=document.getElementById("carousel");
var inner=document.getElementById("figure");
var oImg=inner.getElementsByTagName("img");
var lis=document.getElementById("tips").getElementsByTagName("li");
var leftBtn=document.getElementById("left");
var rightBtn=document.getElementById("right");
function linear(t,b,c,d) {
    return b+t/d*c;
}
function animate(ele,target,duration) {
    clearInterval(ele.timer);
    var times=0;
    var interval=15;
    var begin={};
    var change={};
    for(var key in target){
        begin[key]=getCss(ele,key);
        change[key]=target[key]-begin[key];
    }
    function move() {
        times+=interval;
        if(times>=duration){
            clearInterval(ele.timer);
            setGroupCss(ele,target);
            return;
        }
        for(var key in change){
            var val=linear(times,begin[key],change[key],duration);
            setCss(ele,key,val);
        }
    }
    ele.timer=setInterval(move,interval);
}
function getCss(ele,attr) {
    var val=null;
    if("getComputedStyle" in window){
        val=window.getComputedStyle(ele,null)[attr];
    }
    else {
        val=ele.currentStyle[attr];
    }
    var reg=/^-?(\d+)(px)?/;
    return reg.test(val)?parseFloat(val):val;
}
function setCss(ele,attr,val) {
    var reg=/^(width|height|top|left|(margin|padding)(Top|Left|Right|Bottom)?)/;
    if(reg.test(attr)){
        if(!isNaN(val)){
            ele.style[attr]=val+"px";
        }
    }
    ele.style[attr]=val;
}
function setGroupCss(ele,obj) {
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            setCss(ele,key,obj[key]);
        }
    }
}
var step=0;
function autoMove(direction) {
    if(typeof direction==="undefined"||direction==="right"){
        step++;
        if(step>2){
            step=0;
            setCss(inner,"left",0);
        }
        select(step);
        animate(inner,{left:step*-960},800);
    }
    else if(direction==="left"){
        step--;
        if(step<0){
            step=2;
            setCss(inner,"left",-1920);
        }
        select(step);
        animate(inner,{left:step*-960},800);
    }
}
//var timer=setInterval(autoMove,2000);
function select(index) {
    for(var i=0;i<lis.length;i++){
        lis[i].className="";
    }
    if(index==2){
        index=0;
    }
    lis[index].className="bg";
}
for(var i=0;i<lis.length;i++){
    (function (i) {
        lis[i].onclick=function () {
            //clearInterval(timer);
            animate(inner,{left:i*-960},700);
            select(i);
            step=i;
        }
    })(i)
}
leftBtn.onclick=function () {
    clearInterval(inner.timer);
    autoMove("left");
};
rightBtn.onclick=function () {
    clearInterval(inner.timer);
    autoMove("right");
};
autoTimer = window.setInterval(autoMove,2000);
outer.onmouseover = function () {
    window.clearInterval(autoTimer);
    leftBtn.style.display = 'block';
    rightBtn.style.display = 'block';
};
outer.onmouseout = function () {
    autoTimer = window.setInterval(autoMove, 2000);
    leftBtn.style.display = 'none';
    rightBtn.style.display = 'none';
};

/*回到顶部*/

var aLink = document.getElementById('link');
aLink.onclick = function () {
    var duration = 500;
    var distance = utils.getWin('scrollTop');
    var interval = 10;
    var step = (distance / duration) * interval;
    var timer = window.setInterval(function () {
        if (utils.getWin('scrollTop') <= 0) {
            window.clearInterval(timer);
            window.onscroll = showBtn;
            return;
        }
        var srcollTop = utils.getWin('scrollTop');
        srcollTop -= step;
        utils.getWin('scrollTop', srcollTop);
        console.log(utils.getWin('scrollTop'));
    }, interval);

    window.onscroll = null;
    this.style.display = 'none';
};
window.onscroll = showBtn;

function showBtn() {
    var winScrollTop = utils.getWin('scrollTop');
    var screenHeight = utils.getWin('clientHeight');
    if (winScrollTop - screenHeight > 0) {
        aLink.style.display = 'block';
    }
}
/*下面的上下跑马灯*/
function startmarquee(lh,speed,delay,index){
    var t;
    var p=false;
    var o=document.getElementById("marqueebox"+index);
    o.innerHTML+=o.innerHTML;
    o.onmouseover=function(){p=true};
    o.onmouseout=function(){p=false};
    o.scrollTop = 0;
    function start(){
        t=setInterval(scrolling,speed);
        if(!p){ o.scrollTop += 1;}
    }
  function scrolling(){
        if(o.scrollTop%lh!=0){
            o.scrollTop += 1;
            if(o.scrollTop>=o.scrollHeight/2) o.scrollTop = 0;
        } else{
            clearInterval(t);
            setTimeout(start,delay);
        }
    }
    setTimeout(start,delay);
}
startmarquee(25,30,3000,0);


/*选项卡*/

var z1=document.getElementById("oTabs");
console.log(z1)
var z3=z1.getElementsByTagName("li");
console.log(z3)
var z4=z1.getElementsByTagName("div")[1];

var z4List=z4.getElementsByTagName("div");
console.log(z4List)

function tab(n){
    for(var i=0;i<z3.length;i++){
        z4List[i].className='';
        z3[i].className='';
    }
    z4List[n].className='z2';
    z3[n].className='z2';
}
for(var i=0;i<z3.length;i++){
    z3[i]['zhufeng']=i;
    z3[i].onclick=function(){
        tab(this['zhufeng'])

    }

}




