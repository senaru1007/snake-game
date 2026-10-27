//ゲーム画面を取得
const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");
//蛇の体
let snake=[
{x:100,y:100},
{x:80,y:100},
{x:60,y:100}
];
//移動する方向
let dx=20;
let dy=0;
//エサの初期位置
let food={
    x:200,
    y:200
};
//スコア
let score=0;
//ゲームの状態
let gameover=false;
//キーボード操作
document.addEventListener("keydown",function(event){
event.preventDefault();
if(event.key==="ArrowUp"&& dy===0){dx=0;dy=-20;}
if(event.key==="ArrowDown"&& dy===0){dx=0;dy=20;}
if(event.key==="ArrowLeft"&& dx===0){dx=-20;dy=0;}
if(event.key==="ArrowRight"&& dx===0){dx=20;dy=0;}
});
//エサをランダムな場所にだす
function createFood(){
    food.x=Math.floor(Math.random()*20)*20;
    food.y=Math.floor(Math.random()*20)*20;
}
//蛇とエサを描く
function drawSnake(){
    ctx.clearRect(0,0,400,400);
    if(gameover){
        ctx.fillStyle="white";
        ctx.font="30px sans-serif";
        ctx.fillText("GAME OVER",100,200);
        return;
    }
    //蛇の頭を動かす
    const head={
        x:snake[0].x + dx,
        y:snake[0].y + dy
    };
    //壁にぶつかったか確認
    if(
        head.x<0||
        head.x>=400||
        head.y<0||
        head.y>=400
    ){
        gameover=true;
        return;
    }
     //自分の体にぶつかったかを確認
    for(let i=0; i<snake.length; i++){
        if(
        head.x===snake[i].x&&
        head.y===snake[i].y
    ){
    gameover=true;
    return;
    }}
    //蛇の頭を追加
    snake.unshift(head);
    //エサを食べたかを確認
    if(head.x===food.x&& head.y===food.y){
        score=score+10;
        document.getElementById("score").textContent=score;
        createFood();
    }else{
        snake.pop();
    }
    //蛇の体を描く
    ctx.fillStyle="limegreen";
    snake.forEach(function(part){
        ctx.fillRect(part.x,part.y,20,20);
    });
    //エサを描く
    ctx.fillStyle="red";
    ctx.fillRect(food.x,food.y,20,20);
}
//ゲームを動かす
setInterval(drawSnake,150);
//ゲームを最初からやり直す
function restartGame(){
    snake=[
        {x:100,y:100},
        {x:80,y:100},
        {x:60,y:100}
    ];
    dx=20;
    dy=0;
    score=0;
    document.getElementById("score").textContent=score;
    createFood();
    gameover=false; 
}
function changeDirection(direction){
    if(direction==="up"&&dy===0){
        dx=0;
        dy=-20;
    }
    if(direction==="down"&&dy===0){
        dx=0;
        dy=20;
    }
    if(direction==="left"&&dx===0){
        dx=-20;
        dy=0;
    }
    if(direction==="right"&&dx===0){
        dx=20;
        dy=0;
    }
}