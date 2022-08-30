const buttons = document.querySelectorAll('button');

class Triangle {
    constructor(input) {
        this.a = input[0];
        this.b = input[1];
        this.c = input[2];
        this.A = input[3];
        this.B = input[4];

        // Determine properties of inputted triangle
        this.sides = 0;
        this.angles = 0;
        
        for (let i = 0; i <= 2; i++) {
            if (!isNaN(input[i])) {
                this.sides++;
            }
        }
        
        for (let i = 3; i <= 4; i++) {
            if (!isNaN(input[i])) {
                this.angles++;
            }
        }
    }

    findAll() {
        if (this.sides == 1 && this.angles == 1) {
            this.findMissingAngle();
            this.findSideFromAngle();
        }
        this.findMissingSide();
        if (this.angles == 0) {
            this.findAllInternalAngles();
        }
    }
    
    findMissingSide() {
        if (this.sides != 2) { return; }
            if (!this.a) {
                this.#missingout(
                    // a = sqrt(c^2 - b^2)
                    Math.sqrt((this.c * this.c) - (this.b * this.b))
                );
            }
            
            if (!this.b) {
                this.#missingout(
                    // b = sqrt(c^2 - a^2)
                    Math.sqrt((this.c * this.c) - (this.a * this.a))
                );
            }
            
            if (!this.c) {
                this.#missingout(
                    // c = sqrt(a^2 + b^2)
                    Math.sqrt((this.a * this.a) + (this.b * this.b))
                );
            }
    }

    findMissingAngle() {
        if (!this.A && !this.B) { return; }
        // Calculate the missing angle
        if (!this.A) {
            this.A = 90 - this.B;
            this.#out('dInput', this.A);
        } else {
            this.B = 90 - this.A;
            this.#out('eInput', this.B);
        }
    } 

    findAllInternalAngles() {
        // Assumes we have values a and c from findMissingSide, uses inverse sine
        this.A = Math.asin(document.getElementById('aInput').value / document.getElementById('cInput').value);
        this.B = Math.asin(document.getElementById('bInput').value / document.getElementById('cInput').value);
        // Converts radians to degrees while outputting
        this.#out('dInput', this.A * 180 / Math.PI);
        this.#out('eInput', this.B * 180 / Math.PI);
    }

    findSideFromAngle() {
        // Assumes we have value A from findMissingAngle
        if (!this.a && this.c) {
            // Find A from C, then find B from missing side
            this.a = this.c * Math.sin(this.A * Math.PI / 180);
            this.sides++;
            this.#out('aInput', this.a);
        } else if (!this.c) {
            // Find the missing value between A and B then find C from missing side
            if (!this.a) {
                this.a = this.b * Math.tan(this.A * Math.PI / 180);
                this.sides++;
                this.#out('aInput', this.a);
            } else if (!this.b) {
                this.b = this.a * Math.tan(this.A * Math.PI / 180);
                this.sides++;
                this.#out('bInput', this.b);
            }
        }
    }

    #out(target, content) {
        document.getElementById(
            target
        ).value = content;
    }

    #missingout(calc) {
        document.getElementById(
            !this.a ? 'aInput' :
                !this.b ? 'bInput' :
                            'cInput'
        ).value = calc;
    }
}

buttons[0].addEventListener('click', () => {
    // Grab all inputs
    const inputs = document.querySelectorAll('input');
    let nums = [];
    
    // Push their float values to the nums array
    // Floating point math errors are possible
    for (let i = 0; i < inputs.length; i++) {
        nums.push(parseFloat(inputs[i].value));
    }

    // Make a new triangle with the numbers
    vals = new Triangle(nums);
    
    // Determine what type of triangle we are dealing with and perform the correct operation
    // All error catching goes here
    if (vals.sides + vals.angles != 2) {
        alert("Please only enter two inputs.");
        return;
    }
    if (vals.sides == 0) {
        alert("Please enter at least one side.");
        return;
    }
    if ((vals.c < vals.b || vals.c < vals.a) && this.c) {
        alert("Value c must be less than a and b.");
        return;
    }
    if (vals.A <= 0 || vals.B <= 0) {
        alert("Angles cannot be below or equal to zero.");
        return;
    }
    vals.findAll();
});

buttons[1].addEventListener('click', () => {
    // Clear all fields
    const allinputs = document.querySelectorAll('input');
    for (let i = 0; i < allinputs.length; i++) {
        allinputs[i].value = "";
    }
});