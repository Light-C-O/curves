class MorphingForm {
    //what it remembers - runs once 
    constructor (_centerX, _centerY){
        this.formResolution = 15;
        this.initRadius = 150;
        this.centerX = _centerX;
        this.centerY = _centerY;
        this.x = [];
        this.y = [];
        this.filled = false;
        this.drawMode = 1;
        this.stepSize = 2;

        let angle = radians(360 / this.formResolution);
        for (let i = 0; i < this.formResolution; i++) {
            this.x.push(cos(angle * i) * this.initRadius);
            this.y.push(sin(angle * i) * this.initRadius);
        }
    }

    //methods - what it does
    render (){
        this.update();
        this.draw();
    }

    //for the mouse position to move
    update(){
        // floating towards mouse position
        this.centerX += (mouseX - this.centerX) * 0.01;
        this.centerY += (mouseY - this.centerY) * 0.01;

        // calculate new points
        for (let i = 0; i < this.formResolution; i++) {
            this.x[i] += random(-this.stepSize, this.stepSize);
            this.y[i] += random(-this.stepSize, this.stepSize);
        }
    }

    //to make the shapes
    draw(){
        if (this.filled) {
            fill(random(255));
        } else {
            noFill();
        }

        switch (this.drawMode) {
        case 1: // circle
            beginShape();
            // start controlpoint
            curveVertex(this.x[this.formResolution - 1] + this.centerX, this.y[this.formResolution - 1] + this.centerY);

            // only these points are drawn
            for (let i = 0; i < this.formResolution; i++) {
            curveVertex(this.x[i] + this.centerX, this.y[i] + this.centerY);
            }
            curveVertex(this.x[0] + this.centerX, this.y[0] + this.centerY);

            // end controlpoint
            curveVertex(this.x[1] + this.centerX, this.y[1] + this.centerY);
            endShape();
            break;

        case 2: // line
            beginShape();
            // start controlpoint
            curveVertex(this.x[0] + this.centerX, this.y[0] + this.centerY);

            // only these points are drawn
            for (let i = 0; i < this.formResolution; i++) {
            curveVertex(this.x[i] + this.centerX, this.y[i] + this.centerY);
            }

            // end controlpoint
            curveVertex(this.x[this.formResolution - 1] + this.centerX, this.y[this.formResolution - 1] + this.centerY);
            endShape();
            break;
        }
    }

    //gets called when the user clicks the mouse
    reset(_centerX, _centerY){
        //needs to know the new center position
        this.centerX = _centerX;
        this.centerY = _centerY;

        // to empty an array
        this.x = []
        this.y = []

        let angle;
        let radius;
        

    switch (this.drawMode) {
    case 1: // circle

        angle = radians(360 / this.formResolution);
        radius = this.initRadius * random(0.5, 1);

        for (let i = 0; i < this.formResolution; i++) {
            this.x.push(cos(angle * i) * radius);
            this.y.push(sin(angle * i) * radius);
        }
        break;

    case 2: // line
        radius = this.initRadius * random(0.5, 5);
        angle = random(PI);

        let x1 = cos(angle) * radius;
        let y1 = sin(angle) * radius;
        let x2 = cos(angle - PI) * radius;
        let y2 = sin(angle - PI) * radius;

        for (let i = 0; i < this.formResolution; i++) {
            this.x.push(lerp(x1, x2, i / this.formResolution));
            this.y.push(lerp(y1, y2, i / this.formResolution));
        }
        break;

        }
    }
}