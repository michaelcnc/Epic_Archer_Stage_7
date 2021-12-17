class PlayerArcher {
  constructor(x, y, width, height) {
    const options = {
      isStatic: true
    }; 

    this.body = Matter.Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;
    this.collapse = false;
        
    World.add(world, this.body);
    Matter.Body.setAngle(this.body, -90); 
  }

  display(img) {
    var pos = this.body.position;
    var angle = this.body.angle;
    
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(img, 0, 0, this.width, this.height);
    pop();
  } 
}
