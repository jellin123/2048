// 新游戏初始化
var board = new Array();//生成一维数组
var score=0;//分值
var hasConflicted=new Array();//每个小格子发生碰撞的次数

var startx=0;
var starty=0;
var endx=0;
var endy=0;

var documentWidth=window.screen.availWidth;
var gridContainerWidth=0.92*documentWidth;
var cellSideLength=0.18*documentWidth;
var cellspace=0.04*documentWidth;

$(function () {
    prepareForMobile();
    newgame();//开始新游戏
});

function prepareForMobile(){
    if(documentWidth>500){
        gridContainerWidth=500;
        cellspace=20;
        cellSideLength=100;
    }

    $(".content").css({
        "width":gridContainerWidth-2*cellspace,
        "height":gridContainerWidth-2*cellspace,
        "padding":cellspace,
        "border-radius":0.02*gridContainerWidth
    });

    $(".gird-cell").css({
        "width":cellSideLength,
        "height":cellSideLength,
        "border-radius":0.02*cellSideLength
    });
}
function newgame() {
    $(".gird-cell").remove();
    init();//初始化棋盘格
    $("#score").text("0");
    newNumber();//随机生成两个数
    newNumber();
}
function init() {
    var str = "";
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            str += "<div class='gird-cell' id=" + "gird-" + i + "-" + j + "></div>"
        }
    $('.content').append(str);

    //生成二维数组
    // var board = new Array();//生成一维数组
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i]=new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;//初始化
            hasConflicted[i][j]=false;
            var girdcell = $("#gird-" + i + "-" + j);//获取每一个小格子
            girdcell.css("top", getPosTop(i, j));//设置每一个格子距顶部的距离
            girdcell.css("left", getPosLeft(i, j));//设置每一个格子距左部的距离
        }
    }
    updateboardview();//初始化数字格
}
function getPosTop(i, j) {
    return (cellspace+i*(cellspace+cellSideLength));
}
function getPosLeft(i, j) {
    return (cellspace+j*(cellspace+cellSideLength));
}

function updateboardview() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $(".content").append("<div class='number-cell' id='number-" + i + "-" + j + "'></div>");
            var numbercell = $("#number-" + i + "-" + j);
            
            if (board[i][j] == 0) {//棋盘格为0
                numbercell.css({
                    "width": "0px",
                    "height": "0px",
                    "top": getPosTop(i, j) + cellSideLength/2,
                    "left": getPosLeft(i, j) + cellSideLength/2,
                });
            }
            else{
                numbercell.css({
                    "width":"100px",
                    "height":"100px",
                    "top":getPosTop(i,j),
                    "left":getPosLeft(i,j),
                    "background-color":getNumberBackgroundColor(board[i][j]),
                    "color":getNumberColor(board[i][j]),
                });
                numbercell.text(board[i][j]);
            }
            hasConflicted[i][j]=false;
        }
        $(".number-cell").css({
            "line-height":cellSideLength+"px",
            "font-size":0.06*cellSideLength+"px"
        });
    }
    
}

function newNumber(){
    if(nospace(board)){
        return false;
    }
    var x=parseInt(Math.floor(Math.random()*4));//生成随机数0 1 2 3 x坐标
    var y=parseInt(Math.floor(Math.random()*4));//生成随机数0 1 2 3 y坐标

    //确定空格子来随机生成数
    while(1){
        if(board[x][y]==0)//如果这个格子上面没有数字
        {
            break;
        }
        x=parseInt(Math.floor(Math.random()*4));//生成随机数0 1 2 3 x坐标
        y=parseInt(Math.floor(Math.random()*4));//生成随机数0 1 2 3 y坐标
    }
    var number=Math.random()<0.5 ? 2 : 4;//如果随机生成的数小于0.5，那么就生成2，否则生成4
    board[x][y]=number;
    showNumberWithAnimation(x,y,number);//在x,y上生成number格子
    return true;
}
function nospace(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0){
                return false;
            }
        }
    }
    return true;
}
function showNumberWithAnimation(i,j,num){
    var numbercell = $("#number-" + i + "-" + j);//获取当前数字格
    
    numbercell.css({
        "background-color":getNumberBackgroundColor(board[i][j]),
        "color":getNumberColor(board[i][j]),
    });
    numbercell.text(num);

    //生成数字格动画
    numbercell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50);
}

//数字不同背景颜色不同
function getNumberBackgroundColor(number){
    switch(number){
        case 2:
            return "#eee4da";
        case 4:
            return "#ede0c8";
        case 8:
            return "#f2b179";
        case 16:
            return "#f59563";
        case 32:
            return "#f67c5f";
        case 64:
            return "#f65e3b";
        case 128:
            return "#edcf72";
        case 256:
            return "#edcc61";
        case 512:
            return "#9c0";
        case 1024:
            return "#33b5e5";
        case 2048:
            return "#09c";
        case 4096:
            return "#a6c";
        case 8192:
            return "#93c";
    }
}

//每个数字格数字样式不同
function getNumberColor(number){
    if (number <= 4 ){
        return "#776e65";
    }
    return "white";
}