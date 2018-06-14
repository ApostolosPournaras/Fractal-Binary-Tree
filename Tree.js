class Tree{

	constructor(branchAngle, branchFactor, rootLength){
		this.angle = PI/2
		this.branchAngle = branchAngle;
		this.bf = branchFactor;
		this.length = 1.5*rootLength;
		this.layers = 0;
		this.startPoint = new point(width/2, height);
		this.endPoint = this.startPoint;
		//parent, layer, direction, serial_number, branchAngle, branchFactor
		this.root = new Branch(this, 0, 0, 0, branchAngle, branchFactor);
	}

	setBranchAngle(new_angle){
		this.root.setBranchAngle(new_angle);
	}


	split(){
		this.layers++;
		this.root.split(this.layers);
	}

	show(){
		this.root.show();
	}

}