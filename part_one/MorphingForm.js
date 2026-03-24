class MorphingForm {
    //what it remembers
    constructor (){
        this.formResolution = 15;
        this.initRadius = 150;
        this.stepSize = 2;
        this.centerX;
        this.centerY;
        this.x = [];
        this.y = [];

        this.filled = false;
        this.freeze = false;
        this.drawMode = 1;
    }

    //methods - what it does
    
    render (){
       
    }


    draw(){
         // floating towards mouse position
        this.centerX += (mouseX - centerX) * 0.01;
        this.centerY += (mouseY - centerY) * 0.01;

        // calculate new points
        for (let i = 0; i < this.formResolution; i++) {
            x[i] += random(-this.stepSize, this.stepSize);
            y[i] += random(-this.stepSize, this.stepSize);
        }

        if (this.filled) {
            fill(random(255));
        } else {
            noFill();
        }

        switch (drawMode) {
        case 1: // circle
            beginShape();
            // start controlpoint
            curveVertex(x[this.formResolution - 1] + this.centerX, y[this.formResolution - 1] + this.centerY);

            // only these points are drawn
            for (let i = 0; i < this.formResolution; i++) {
            curveVertex(x[i] + this.centerX, y[i] + this.centerY);
            }
            curveVertex(x[0] + this.centerX, y[0] + this.centerY);

            // end controlpoint
            curveVertex(x[1] + this.centerX, y[1] + this.centerY);
            endShape();
            break;
        case 2: // line
            beginShape();
            // start controlpoint
            curveVertex(x[0] + this.centerX, y[0] + this.centerY);

            // only these points are drawn
            for (let i = 0; i < this.formResolution; i++) {
            curveVertex(x[i] + this.centerX, y[i] + this.centerY);
            }

            // end controlpoint
            curveVertex(x[this.formResolution - 1] + this.centerX, y[this.formResolution - 1] + this.centerY);
            endShape();
            break;
        }
    }
}