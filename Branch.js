class Branch{

	constructor(parent, layer, direction, serial_number, branchAngle, branchFactor){
		this.parent = parent;
		this.layer = layer;
		this.branchAngle = branchAngle;
		this.direction = direction;
		this.serial_number = serial_number;
		this.angle = this.parent.angle + this.direction * this.serial_number * this.branchAngle;
		this.bf = branchFactor;
		this.length = 2*this.parent.length/3;
		this.startPoint = this.parent.endPoint;
		this.endPoint = new point(this.startPoint.x + this.length*cos(this.angle),
								  this.startPoint.y - this.length*sin(this.angle))

		this.children = [];
	}

	makeBranches(dir){
		this.dir = dir;
		var Qty = floor(this.bf/2);
		var branchAngle = this.branchAngle; //PI/(2*(Qty+1));
		var offset = 0;

		if(dir === -1){
			offset += Qty;
		}

		for(var i=1; i<=Qty; i++){
			this.children[i + offset - 1] = new Branch(this, this.layer+1, this.dir, i, this.branchAngle, this.bf);
		}
	}

	makeLeftBranches(){
		this.makeBranches(1);
	}


	makeCenterBranch(){
		this.children[this.bf-1] = new Branch(this, this.layer+1, 0, this.bf-1, this.branchAngle, this.bf);
	}


	makeRightBranches(){
		this.makeBranches(-1);
	}

	split(newLayer){

		if(this.length < 2){
			return;
		}

		if(this.layer === newLayer-1){
			this.makeLeftBranches();
			this.makeRightBranches();

			if(this.bf % 2 === 1){
				this.makeCenterBranch();
			}
		}else{
			for(var i=0; i<this.bf; i++){
				this.children[i].split(newLayer);
			}
		}
	}

	setBranchAngle(new_angle){
		this.branchAngle = new_angle;
		this.angle = this.parent.angle + this.direction * this.serial_number * new_angle;
		this.startPoint = this.parent.endPoint;
		this.endPoint = new point(this.startPoint.x + this.length*cos(this.angle),
								  this.startPoint.y - this.length*sin(this.angle));

		for( var i=0; i< this.children.length; i++) {
			this.children[i].setBranchAngle(new_angle);
		}
	}

	show(){
		
		line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y)

		for( var i=0; i< this.children.length; i++) {
			this.children[i].show();
		}
	}

}