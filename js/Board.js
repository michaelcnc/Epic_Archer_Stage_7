class Board {
  constructor(x, y, radius) {
    const options = {
      isStatic: true
    }; 

    // make the area of board tiny = 1 in Matter.world 
    // so that it will not bounce off the arrows
    this.body = Matter.Bodies.circle(x, y, 1, options);
    this.radius = radius;
           
    World.add(world, this.body);
  } 

  display(img) {
    var pos = this.body.position;
        
    push();
    translate(pos.x, pos.y);
    imageMode(CENTER);
    image(img, 0, 0, this.radius*2, this.radius*2);
    pop();
  }
}
