var chess=document.getElementById('chess');
var ct=chess.getContext("2d");
var logo=new Image;
var wb=true;
var chessArr=[];
var over=false;
var wins=[];
var count=0;
var mywin=[];
var comwin=[];

for(var i=0;i<15;i++){
	wins[i]=[];
	for(var j=0;j<15;j++){
		wins[i][j]=[]
	}
}
// 赢法数组填值
// 所有横线赢法
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i][j+k][count]=true;
		}
		count++;
	}
}
//纵线赢法
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[j+k][i][count]=true;
		}
		count++;
	}
}
// 斜线赢法
for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i+k][j+k][count]=true;
		}
		count++;
	}
}
// 反斜线赢法
for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){
		for(var k=0;k<5;k++){
			wins[i+k][j-k][count]=true;
		}
		count++;
	}
}
console.log(wins);
// 赢法统计数组
for(var k=0;k<count;k++){
	mywin[k]=0;
	comwin[k]=0;
}
logo.src="../images/1.jpg";
for(var i=0;i<15;i++){
	chessArr[i]=[];
	for(var j=0;j<15;j++){
		chessArr[i][j]=0;
	}
}
logo.onload=function(){
	ct.drawImage(logo,0,0,450,450);
	drawChess1();
}

chess.onclick=function(e){
	if(over){
		return
	}
	if(!wb){
		return
	}
	var x=e.clientX-chess.getBoundingClientRect().left;
	var y=e.clientY-chess.getBoundingClientRect().top;
	var x0=Math.floor(x/30);
	var y0=Math.floor(y/30);
	if(chessArr[x0][y0]==0){
		drawChess2(x0,y0,wb);
		chessArr[x0][y0]=1;
	for(var k=0;k<count;k++){
	if (wins[x0][y0][k]) {
		mywin[k]++;
		comwin[k]==6;
		if(mywin[k]==5){
			over=true;
			window.alert("你赢了");
		}
	}
}
if(!over){
	wb=!wb;
	computerAI();
}
}

}
var computerAI=function(){
	var myscore=[];
	var comscore=[];
	var max=0;
	var u=0;
	var v=0;
	for(var i=0;i<15;i++){
		myscore[i]=[];
		comscore[i]=[];
		for(var j=0;j<15;j++){
			myscore[i][j]=0;
			comscore[i][j]=0;
		}
	}
	for(var i=0;i<15;i++){
		for(var j=0;j<15;j++){
			if(chessArr[i][j]==0){
			for(var k=0;k<count;k++){
				if(wins[i][j][k]){
					if(mywin[k]==1){
						myscore[i][j]+=200;
					}else if(mywin[k]==2){
						myscore[i][j]+=400;
					}else if(mywin[k]==3){
						myscore[i][j]+=2000;
					}else if(mywin[k]==4){
						myscore[i][j]+=10000
					}
					if(comwin[k]==1){
						comscore[i][j]+=220;
					}else if(comwin[k]==2){
						comscore[i][j]+=420;
					}else if(comwin[k]==3){
						comscore[i][j]+=2300;
					}else if(comwin[k]==4){
						comscore[i][j]+=20000
					}
				}
			}
		}
		if(myscore[i][j]>max){
				max=myscore[i][j];
				u=i;
				v=j;
			}else if(myscore[i][j]==max){
				if(comscore[i][j]>comscore[u][v]){
					max=comscore[i][j];
					u=i;
					v=j;
				}
			}
			if(comscore[i][j]>max){
				max=comscore[i][j];
				u=i;
				v=j;
			}else if(comscore[i][j]==max){
				if(myscore[i][j]>myscore[u][v]){
					max=myscore[i][j];
					u=i;
					v=j;
				}
			}
		}
	}
	drawChess2(u,v,false);
	chessArr[u][v]=2;
	for(var k=0;k<count;k++){
	if (wins[u][v][k]) {
		comwin[k]++;
		mywin[k]==6;
		if(comwin[k]==5){
			over=true;
			window.alert("电脑赢了");

		}
	}
}
if(!over){
	wb=!wb;
}
}

function drawChess1(){
ct.strokeStyle="red";

for(var i=0;i<15;i++){
	ct.moveTo(15+i*30,15);
	ct.lineTo(15+i*30,435);
	ct.moveTo(15,15+i*30);
	ct.lineTo(435,15+i*30);
}
ct.stroke();
}
function drawChess2(x,y,who){
	ct.beginPath();
	var grd=ct.createRadialGradient(15+x*30+2,15+y*30-2,13,15+x*30,15+y*30,5);
	if(who){
		grd.addColorStop(0,"white");
		grd.addColorStop(1,"#9c9fa1");
	}else{
		grd.addColorStop(0,"black");
		grd.addColorStop(1,"#e0e0e0");
	}
	ct.fillStyle=grd;
	ct.arc(15+x*30,15+y*30,10,0,2*Math.PI);
	ct.fill();
	ct.closePath();	
}