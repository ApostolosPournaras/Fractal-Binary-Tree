var frTree;

var btnReset;
var btnBranch;
var sldrBa
var pBa;

function setup(){

	gridCanvas = createCanvas(900, 600);
	background(51);
	stroke(255);
	fill(255);


	btnReset = createButton('Reset');
	btnReset.size(60,20)
	btnReset.position(20, gridCanvas.position().y + height+20)
  	btnReset.mousePressed(Reset);

	btnBranch = createButton('Branch');
	btnBranch.size(60,20)
	btnBranch.position(btnReset.x + btnReset.width + 20, gridCanvas.position().y + height+20)
  	btnBranch.mousePressed(makeBranches);

  	sldrBa = createSlider(0, 180, 45, 1)
  	sldrBa.position(20, gridCanvas.position().y + height + 80)
  	sldrBa.input(changeBranchAngle)
  	pBa = createP('Branch angle:' + sldrBa.value())
  	pBa.position(sldrBa.x + sldrBa.width + 20, sldrBa.y-10)


	frTree = new Tree(PI*sldrBa.value()/180, 2, height/3);
	frTree.show();

}

function makeBranches(){
	frTree.split();
	frTree.show();
}

function Reset(){
	background(51);
	frTree = new Tree(PI*sldrBa.value()/180, 2, height/3);
	frTree.show();
}

function changeBranchAngle(){
	frTree.setBranchAngle(PI*sldrBa.value()/180);
	background(51);
	frTree.show();
}

function draw(){
	pBa.elt.innerHTML = 'Branch angle:' + sldrBa.value();
}
