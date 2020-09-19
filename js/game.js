//逻辑功能

//键盘相应事件
$(document).keydown(function (e) { 
    switch(e.keyCode){
        case 37:
            //left
            if(moveLeft()){//如果可以左移
                setTimeout('newNumber()',210);//随机生成一个数字
                setTimeout('isGameOver()',300);//游戏是否结束
            }
            break;
        case 38:
            //up
            if(moveUp()){//如果可以左移
                setTimeout('newNumber()',210);//随机生成一个数字
                setTimeout('isGameOver()',300);//游戏是否结束
            }
            break;
        case 39:
            //right
            if(moveRight()){//如果可以左移
                setTimeout('newNumber()',210);//随机生成一个数字
                setTimeout('isGameOver()',300);//游戏是否结束
            }
            break;
        case 40:
            //down
            if(moveDown()){//如果可以左移
                setTimeout('newNumber()',210);//随机生成一个数字
                setTimeout('isGameOver()',300);//游戏是否结束
            }
            break;
        default:
            break;
    }
});

function moveLeft(){
    if(!canMoveLeft(board))
        return false;

    for(var i=0;i<4;i++)
        for(var j=1;j<4;j++){
            if(board[i][j]!=0)//当前格子有数字
            {
                for(var k=0;k<j;k++)//遍历此格子左侧的格子
                {
                    if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
                        //如果左侧的第一个格子是0，并且中间的格子都是0
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                        //如果左侧第一个格子和此格子相等，并且中间格子都是0
                        showMoveAnimation(i,j,i,k);
                        board[i][k] *=2;
                        board[i][j]=0;
                        score += board[i][k];
                        updatescore(score);
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }
    setTimeout('updateboardview()',200);
    return true;
}
function moveRight(){
    if(!canMoveRight(board))
        return false;

    for(var i=0;i<4;i++)
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0)//当前格子有数字
            {
                for(var k=3;k>j;k--)//遍历此格子左侧的格子
                {
                    if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
                        //如果左侧的第一个格子是0，并且中间的格子都是0
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
                        //如果左侧第一个格子和此格子相等，并且中间格子都是0
                        showMoveAnimation(i,j,i,k);
                        board[i][k] *=2;
                        board[i][j]=0;
                        score += board[i][k];
                        updatescore(score);
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }
    setTimeout('updateboardview()',200);
    return true;
}
function moveUp(){
    if(!canMoveUp(board))
        return false;

    for(var j=0;j<4;j++)
        for(var i=1;i<4;i++){
            if(board[i][j]!=0)//当前格子有数字
            {
                for(var k=0;k<i;k++)//遍历此格子左侧的格子
                {
                    if(board[k][j]==0 && noBlockVertical(j,k,i,board)){
                        //如果左侧的第一个格子是0，并且中间的格子都是0
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j]==board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
                        //如果左侧第一个格子和此格子相等，并且中间格子都是0
                        showMoveAnimation(i,j,k,j);
                        board[k][j] *=2;
                        board[i][j]=0;
                        score += board[k][j]
                        updatescore(score);
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }
    setTimeout('updateboardview()',200);
    return true;
}
function moveDown(){
    if(!canMoveDown(board))
        return false;

    for(var j=0;j<4;j++)
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0)//当前格子有数字
            {
                for(var k=3;k>i;k--)//遍历此格子左侧的格子
                {
                    if(board[k][j]==0 && noBlockVertical(j,i,k,board)){
                        //如果左侧的第一个格子是0，并且中间的格子都是0
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j]==board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
                        //如果左侧第一个格子和此格子相等，并且中间格子都是0
                        showMoveAnimation(i,j,k,j);
                        board[k][j] *=2;
                        board[i][j]=0;
                        score += board[k][j]
                        updatescore(score);
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }
    setTimeout('updateboardview()',200);
    return true;
}
//判断是否能够左移
function canMoveLeft(board){
    for(var i=0;i<4;i++)
    for(var j=1;j<4;j++)//第一列不能左移
    {
        if(board[i][j]!=0)
            if(board[i][j-1]==0 || board[i][j-1]==board[i][j])//如果其左边没有数字或者有跟他相同的数字
                return true;//证明有可以左移的格子
    }
    return false;
}
//判断是否能够右移
function canMoveRight(board){
    for(var i=0;i<4;i++)
    for(var j=2;j>=0;j--)
    {
        if(board[i][j]!=0)
            if(board[i][j+1]==0 || board[i][j+1]==board[i][j])
                return true;
    }
    return false;
}
//判断是否能够上移
function canMoveUp(board){
    for(var j=0;j<4;j++)
    for(var i=1;i<4;i++)
    {
        if(board[i][j]!=0)
            if(board[i-1][j]==0 || board[i-1][j]==board[i][j])
                return true;
    }
    return false;
}
//判断是否能够下移
function canMoveDown(board){
    for(var j=0;j<4;j++)
    for(var i=2;i>=0;i--)
    {
        if(board[i][j]!=0)
            if(board[i+1][j]==0 || board[i+1][j]==board[i][j])
                return true;
    }
    return false;
}
//从i,j位置移动到i,k
function showMoveAnimation(fromx,fromy,tox,toy){
    var numbercellbefore = $("#number-" + fromx + "-" + fromy);//获取当前数字格    
    numbercellbefore.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);//移动动画
}

//在row方向上从fromy到toy是否可以移动
function noBlockHorizontal(row,col1,col2,board){
    for(var j=col1+1;j<col2;j++){//遍历中间格子
        if(board[row][j]!=0){//如果中间格子不全部为0，那么就不能移动到fromx的位置
            return false;
        }
    }
    return true;
}   
function noBlockVertical(col,row1,row2,board){
    for(var i=row1+1;i<row2;i++){
        if(board[i][col]!=0)
            return false;
    }
    return true;
}
function isGameOver(){
    if(nospace(board)&&nomove(board)){
        gameover();
    }
}
function nomove(board){
    if(canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board))
        return false;
    return true;
}
function gameover(){
    alert("游戏结束！");
    newgame();
}


//分值
function updatescore(score){
    $("#score").text(score);
}