class PlayerArrow {
  constructor(x, y, width, height) {
    var options = {
      isStatic: true,
      density: 0.1
    };
    this.width = width;
    this.height = height;
    // make the area of arrow tiny = 1 in Matter.world 
    // so that it will not bounce off when hit the boards
    this.body = Bodies.rectangle(x, y, 1, 1, options);
    this.velocity = 0;
    World.add(world, this.body);
  }
 
  checkHit(board) {
    // var boardCollision = Matter.SAT.collides(board.body, this.body);
    // if (boardCollision.collided) {
    var xDist = board.body.position.x - this.body.position.x;
    var yDist = board.body.position.y - this.body.position.y;
    if (xDist > -200 && xDist < 0 && yDist > -70 && yDist < 70) {
       Matter.Body.setVelocity(this.body, {x: 0, y: 0});
       Matter.Body.setStatic(this.body, true);
    }
  }

  isOffScreen() { 
    return (this.body.position.x > width || this.body.position.y > height);
  }

  removeFromWorld() {
    World.remove(world, this.body);
  }

  shoot(archerAngle) {
    var arrowAngle = archerAngle + 88;
    var velocity = p5.Vector.fromAngle(arrowAngle * (3.14 / 180), 1);
    velocity.mult(1);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      x: velocity.x * (180 / 3.14),
      y: velocity.y * (180 / 3.14)
    });
  }

  display(img) {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(img, 0-this.width, 0-this.height/2, this.width, this.height);
    pop();
    
    if (this.body.velocity.x > 0) {
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }

    for (var i = 0; i < this.trajectory.length; i++) {
      fill("white");
   // console.log(this.trajectory[i][0], this.trajectory[i][1]);
      ellipse(this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    }
  }
}
