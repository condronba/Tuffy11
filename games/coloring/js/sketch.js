var canvasHeight;
var canvasWidth;

var canvasRect;

var imageHeight;
var imageWidth;

var imageRect;

var scaleByHeight;


var ratiox;
var x = 0;

var mouseDown = false;
var colorSize = 30;
var cColor;

var crayonFile = [];
var colors = [];
var crayons = [];
var activeCrayon = -1;

var drawPoints = [];
var counter = 0;

var crayonIndex = 8;
var crayonPostionX = 100;
var crayonPositionY = 100;
var crayonWidth = 284;
var crayonHeight = 74;

var touchBool = false

var canvasImg;
var coloringImg;

function setup() 
{		
	createCanvas(windowWidth, windowHeight);
	
	canvasImg = loadImage("assets/canvas.png");
	coloringImg = loadImage("assets/coloring3.png");
	
	colors = [color('red'), color('orange'), color('yellow'), color('green'), color('blue'), color('purple'), color('brown'), color('white')];
	crayonFile = ["color_red", "color_orange", "color_yellow", "color_green", "color_blue", "color_purple", "color_brown", "eraser"];
	
	resizeEverything();
	
	cColor = 'white';
	
	strokeWeight(20);
	stroke(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
	resizeEverything();
}

function resizeEverything()
{
	scaleByHeight = (windowHeight)/955;
	
	colorSize = 30 * scaleByHeight;

	canvasWidth = 1224 * scaleByHeight;
	canvasHeight = ((1224 * 1128)/1634) * scaleByHeight;
	
	crayonWidth = 284 * scaleByHeight;
	crayonHeight = 74 * scaleByHeight;

	canvasRect = new Rect(canvasImg, windowWidth/2 - (canvasWidth + crayonWidth)/2, 44 * scaleByHeight, canvasWidth, canvasHeight);
	
	imageWidth = (canvasRect.width*1609)/1634;
	imageHeight = ((imageWidth * 1092)/1609);
	
	imageRect = new Rect(coloringImg, (canvasRect.x + (9 * scaleByHeight)), canvasRect.y, imageWidth, imageHeight);
	
	crayonPostionX = canvasRect.x + canvasRect.width + (10 * scaleByHeight);
	crayonPositionY = canvasRect.y; 
		
	for(var i = 0; i < crayonIndex; i++)
	{
		crayons[i] =  new Crayons(loadImage("assets/" + crayonFile[i] + ".png"), crayonPostionX, crayonPositionY + ( i * crayonHeight), crayonWidth, crayonHeight);
	}
	
	crayons[7] =  new Crayons(loadImage("assets/" + crayonFile[7] + ".png"), crayonPostionX, crayonPositionY + 20 + ( 7 * crayonHeight), 226 * scaleByHeight, 152 * scaleByHeight);
	
	background(255, 204, 0);
	image(canvasRect.img, canvasRect.x, canvasRect.y, canvasRect.width, canvasRect.height);
}

function draw() 
{	
	background(255, 204, 0);
	image(canvasRect.img, canvasRect.x, canvasRect.y, canvasRect.width, canvasRect.height);
	for(var i = 0; i < crayonIndex; i++)
	{
		image(crayons[i].img, crayons[i].x , crayons[i].y, crayons[i].width, crayons[i].height);
	}
	
	for(var i = 1; i < counter; i++)
	{
		stroke(drawPoints[i].color);
		line(drawPoints[i].x, drawPoints[i].y, drawPoints[i -1 ].x, drawPoints[i - 1].y);
		line(drawPoints[i].x, drawPoints[i].y, drawPoints[i].prev_x, drawPoints[i].prev_y);
	}
	
	image(imageRect.img, imageRect.x, imageRect.y, imageRect.width, imageRect.height);
}

/*
function mouseDragged() {
	if((mouseX - (colorSize/2) > imageRect.x && mouseX + (colorSize/2) < imageRect.x + imageRect.width) && 
		(mouseY - (colorSize/2) > imageRect.y && (mouseY + colorSize/2) <imageRect.y + imageRect.height))
	{
		drawPoints.push(new DrawPoints(cColor, mouseX, mouseY, pmouseX, pmouseY, colorSize));
		counter = counter + 1;
	}
	
  // prevent default
  return false;
}
*/

function touchMoved() {
	if((touchX - (colorSize/2) > imageRect.x && touchX + (colorSize/2) < imageRect.x + imageRect.width) && 
		(touchY - (colorSize/2) > imageRect.y && (touchY + colorSize/2) <imageRect.y + imageRect.height))
	{
		drawPoints.push(new DrawPoints(cColor, touchX, touchY, ptouchX, ptouchY, colorSize));
		counter = counter + 1;
	}
	return false;
}

/*
function mouseClicked() {
	for(var i = 0; i < crayonIndex; i++)
	{
		if(i != activeCrayon)
		{
			if(crayons[i].isMouseOver(touchX, touchY))
			{
				cColor = colors[i];
				
				if(activeCrayon > -1)
					crayons[activeCrayon].isMouseOver(touchX, touchY);
				activeCrayon = i;
			}
		}
	}
  return false;
}
*/

function touchStarted() {
	for(var i = 0; i < crayonIndex; i++)
	{
		if(i != activeCrayon)
		{
			if(crayons[i].isMouseOver(touchX, touchY))
			{
				cColor = colors[i];
				
				if(activeCrayon > -1)
					crayons[activeCrayon].isMouseOver(touchX, touchY);
				
				activeCrayon = i;
			}
		}
	}
	
	return false;
}

function DrawPoints(c_color, x, y, prev_x, prev_y, size)
{
	this.color = c_color;
	this.x = x;
	this.y = y;
	this.prev_x = x;
	this.prev_y = y;
	this.size = size;
};

function Rect(img, x, y, width, height)
{
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.calculateNewSize = function(per)
	{
		this.x = this.x * per;
		this.y = this.y * per;
		this.width = this.width * per;
		this.height = this.height * per;
	};
};

function Crayons(img, x, y, width, height)
{
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.original = x;
	
	this.isMouseOver = function(mX, mY)
	{
		if(mX > this.x && mX < this.x + this.width &&
			mY > this.y && mY < this.y + this.height)
		{
			this.x = this.original - (20 * scaleByHeight);
			return true;
		}
		else
		{
			this.x = this.original;
			return false;
		}
		
		return false;
	};
};