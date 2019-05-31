/**
 * Specifies a Camera with locked view (for now) to simulate Animal Crossing's camera
 *
 * @author Terence So
 * @this {Renderer}
 */
class Camera {
   /**
    * Constructor for Camera.
    *
    * @constructor
    * @returns {Camera} Camera object created
    */
    constructor(shader) {
        this.speed = 0.1;

        // Camera view attributes
        this.eye     = new Vector3([0, 3, -3]);
        this.center  = new Vector3([0, 0,0]);
        this.up      = new Vector3([0, 1, 0]);

        this.zoom = 70;
        //this.perspective = true;

        this.viewMatrix = new Matrix4();
        this.updateView();

        this.projectionMatrix = new Matrix4();
        this.projectionMatrix.setPerspective(this.zoom, canvas.width/canvas.height, 1, 100);
    }

    truck(dir) {
        // Calculate the n camera axis
        var n = this.eye.sub(this.center);
        n = n.normalize()

        // Calculate the u camera axis
        var u = this.up.cross(n);
        u = u.normalize();

        // Scale the u axis to the desired distance to move
        u = u.mul(dir * this.speed);

        var test = new Vector3([0, 0, dir * this.speed]);

        // Add the direction vector to both the eye and center positions
        this.eye = this.eye.add(u);
        this.center = this.center.add(u);

        this.updateView();
    }

    dolly(dir) {
        // Calculate the n camera axis
        var n = this.eye.sub(this.center); // HERE
        //n = n.mul(new Vector3([0, 0, -3]));
        //var n = this.eye.sub(new Vector3([0, 0, 0]));
        n = n.normalize();


        // Scale the n axis to the desired distance to move
        n = n.mul(dir * this.speed);

        var test = new Vector3([0, 0, -dir * this.speed]);

        // Add the direction vector to both the eye and center positions
        this.eye = this.eye.add(test);
        this.center = this.center.add(test);

        this.updateView();
    }

    updateView() {
        this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
                                  this.center.elements[0], this.center.elements[1], this.center.elements[2],
                                  this.up.elements[0], this.up.elements[1], this.up.elements[2]);
    }

    /* PA4 REDACTED FUNCTIONS
    pan(dir) {
        // Move camera coordinate system to origin
        var newCenter = this.center.sub(this.eye);

        // Create a rotation transform about u
        var panRotate = new Matrix4();
        panRotate.setRotate(-dir, 0, 1, 0);

        // Rotate center point
        newCenter = panRotate.multiplyVector3(newCenter);

        // Translate center point back to location of camera
        this.center = newCenter.add(this.eye);

        this.updateView();
    }

    tilt(dir) {
        // Move camera coordinate system to origin
        var newCenter = this.center.sub(this.eye);

        // Create a rotation transform about u
        var panRotate = new Matrix4();
        panRotate.setRotate(-dir, 1, 0, 0);

        // Rotate center point
        newCenter = panRotate.multiplyVector3(newCenter);

        // Translate center point back to location of camera
        this.center = newCenter.add(this.eye);

        this.updateView();
    }

    fov(dir) {
        // If zoom within upper/lower bounds
        if (this.zoom >= 130 && dir > 0) return;
        if (this.zoom <= 10 && dir < 0) return;        

        // Increment/decrement FOV
        this.zoom += dir;
        this.projectionMatrix.setPerspective(this.zoom, canvas.width/canvas.height, 1, 100);

        var zoomDegree = (70-this.zoom)/3;
        if (zoomDegree > 0) {        
            document.getElementById('zoomDegree').innerHTML = "+"+zoomDegree;
            if (zoomDegree == 20)
                document.getElementById('zoomDegree').innerHTML = "Detail-oriented";
        }
        else {
            document.getElementById('zoomDegree').innerHTML = " "+zoomDegree;
            if (zoomDegree == -20)
                document.getElementById('zoomDegree').innerHTML = "Quake Pro";
        }

    }
    
    swapPerspective() {
        this.perspective = !this.perspective;

        if (this.perspective) {
            document.getElementById('viewMode').innerHTML = "Perspective";
            this.projectionMatrix.setPerspective(this.zoom, canvas.width/canvas.height, 1, 100);
        }
        else {
            document.getElementById('viewMode').innerHTML = "Orthographic";
            this.projectionMatrix.setOrtho(-this.zoom, this.zoom, -this.zoom, this.zoom, 1, 200);
        }
    }*/
}
