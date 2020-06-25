var body = [];
		var state = 0;// 0->right, 1->down, 2- left, 3 is up;
		var scores=0;

		var canvas = document.getElementById("snake-game");
		var score=document.querySelector("#score");
		var newGame=document.querySelector("#new");
		var easybtn=document.querySelector("#easy");
		var medbtn=document.querySelector("#med");
		var hardbtn=document.querySelector("#hard");
		var modeBut=document.querySelectorAll(".mode");
		var select=document.querySelectorAll(".selected");
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "#e4fad4";
		ctx.fillRect(0, 0, 520, 520);


		var play = false;

		function handleKey(e) {
		    e = e || window.event;

		    if (e.keyCode == '38'&&state!=1&&state!=3) {
		        // up arrow
		        state = 3;
		        play = true;

		    }
		    else if (e.keyCode == '40'&&state!=1&&state!=3) {
		        // down arrow
		        state = 1;
		        play = true;
		    }
		    else if (e.keyCode == '37'&&state!=0&&state!=2) {
		       // left arrow
		        state = 2;
		        play = true;
		    }
		    else if (e.keyCode == '39'&&state!=0&&state!=2) {
		       // right arrow
		        state = 0;
		        play = true;
		    }

		    if(play)
		    playAudio();
		   
		}

		document.onkeydown = handleKey;

		function playAudio(){
			var audio = new Audio('piston-1.mp3');
            audio.play();			
		}

		function playConsume(){			
			var audio = new Audio('https://www.soundjay.com/button/button-3.wav');
            audio.play();			
		}

		var N = 20;
		var size = 520;
		var cellSize = size/N;
		var matrix = new Array(N);
		for (var i = 0; i < matrix.length; i++) {
		  matrix[i] = new Array(N);
		}

		function drawCell(i,j){
			if( (i+j)%2==0 ) {
				ctx.fillStyle = ("#c8f7a6");
			}else{
			ctx.fillStyle = "#e4fad4";
			}
			ctx.fillRect(cellSize*i, cellSize*j, cellSize, cellSize);
		}

		for (var i = 0; i < matrix.length; i++){
			for (var j = 0; j < matrix[i].length; j++){
				matrix[i][j]=0;
				drawCell(i,j);
			}
		}

		body.push([1+ 4/2,2/2]);
		body.push([4/2,2/2]);
		body.push([-1+4/2,2/2]);

		var eyeImage = new Image();
		eyeImage.src = "https://i.imgur.com/6jLbz7l.png";
		
		var foodImage = new Image();
		foodImage.src = "https://i.imgur.com/88saChB.png";

		var counter = 0;
		var foodX = 0;
		var foodY = 0;

		function generateFood(){
			
			var success = false;
			while(!success){
				foodX = parseInt(Math.random()*N);
				foodY = parseInt(Math.random()*N);

				success = true;
				for(var i=0;i<body.length;i++){
					if(body[i][0]==foodX && body[i][1]==foodY){
						success = false;
					}
				}
			}
		}

		generateFood();


		function update(){
			
			counter++;
			var increase = false;

			if(body[0][0]==foodX&&body[0][1]==foodY){
				generateFood();
				playConsume();
				increase = true;
				scores++;
				score.textContent=scores;
			}


			for (var i = 0; i < matrix.length; i++){
				for (var j = 0; j < matrix[i].length; j++){
					drawCell(i,j);
				}
			}
			
			ctx.drawImage(foodImage,
						foodX*cellSize, foodY*cellSize,
						cellSize, cellSize);

			for(var i=0;i<body.length;i++){
				ctx.fillStyle = ("#8b8ef7");
				ctx.fillRect(cellSize*body[i][0], cellSize*body[i][1], cellSize, cellSize);

				if(i==0){
					var marginX = cellSize/3;
					var marginY = cellSize/3;
					
					if(state==0||state==2){
						marginX=0;
					}else if (state==1||state==3){
						marginY=0;
					}

 					ctx.drawImage(eyeImage,
 						0,28*(counter%9),
 						cellSize,cellSize,
 						cellSize*body[i][0]+marginX, 
						cellSize*body[i][1]+marginY,
						cellSize, cellSize);
					ctx.drawImage(eyeImage,
						0,28*(counter%9),
						cellSize,cellSize,
						cellSize*body[i][0]-marginX, 
						cellSize*body[i][1]-marginY, 
						cellSize, cellSize);
				}
			}

		    // 0->right, 1->down, 2- left, 3 is up;
		    var x = 0;
		    var y = 0;
		    if(state==0){
		    	x++;
		    }
		    else if(state==1){
		    	y++;
		    }
		    else if(state==2){
		    	x--;
		    }
		    else if(state==3){
		    	y--;
		    }

		    var first = body[0];
		    var arr = [ first[0]+x , first[1]+y ];
		    body.splice(0,0, arr);

		    if(!increase)
		    body.pop();
		}


		function startGame(){

			easybtn.addEventListener("click",function(){
				hardbtn.classList.remove("selected");
				medbtn.classList.remove("selected");
				easybtn.classList.add("selected");
				medbtn.classList.remove("active");
				hardbtn.classList.remove("active");
				this.classList.add("active");
				setInterval(update,800);
				easybtn.disabled=true;
				medbtn.disabled=true;
				hardbtn.disabled=true;
			});

			medbtn.addEventListener("click",function(){
				hardbtn.classList.remove("selected");
				easybtn.classList.remove("selected");
				easybtn.classList.remove("selected");
				hardbtn.classList.remove("active");
				this.classList.add("active");
				setInterval(update,250);
				easybtn.disabled=true;
				medbtn.disabled=true;
				hardbtn.disabled=true;
			});

			hardbtn.addEventListener("click",function(){
				easybtn.classList.remove("selected");
				medbtn.classList.remove("selected");
				hardbtn.classList.add("selected");
				easybtn.classList.remove("active");
				medbtn.classList.remove("active");
				this.classList.add("active");
				setInterval(update,100);
				easybtn.disabled=true;
				medbtn.disabled=true;
				hardbtn.disabled=true;
			});
		}
 
		startGame();

		


