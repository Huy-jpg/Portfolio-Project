var robo
var x
var y
var angle = 0
var circleRadius = 120
var xPos = 1350 / 2
var yPos = 698 / 1.9
var button
var showTheTrick = false

function setup () {
  createCanvas(1350, 698);
  robo = new Robot(
    width / 2 + 20,
    height / 2 - 15,
    width / 2 - 20,
    height / 2 - 15,
    width / 2 + 10,
    height / 2 + 20,
    width / 2 - 10,
    height / 2 + 20
  )
  button = createButton('click me')
}

function draw () {
  background(255)
  angleMode(DEGREES)

  x = xPos + circleRadius * cos(PI / 180 + angle)
  y = yPos + circleRadius * sin(PI / 180 + angle)

  // The mattress 
  strokeWeight(5)
  fill('orange')
  ellipse(x, y, 1000, 600)
  angle++
  fill('#de9723')
  noStroke()
  quad(x, y - 298, x - 498, y, x, y + 298, x + 498, y)

  strokeWeight(50)
  stroke(222, 151, 35)
  // Top left circle
  point(x - 300, y - 170)
  // Top right circle
  point(x + 300, y - 170)
  // Bottom left circle
  point(x - 300, y + 170)
  // Bottom right circle
  point(x + 300, y + 170)

  // Boxes at bottom left
  stroke(3)
  strokeWeight(3)
  fill('yellow')
  // Top box
  rect(x + 190, y + 190, 120, 70)
  // Middle box
  rect(x + 200, y + 130, 80, 60)
  // Left box
  rect(x + 100, y + 210, 90, 50)
  // Right box
  rect(x + 230, y + 210, 90, 50)

  // Cabinet
  strokeWeight(1.5)
  fill('#b5750d')
  rect(x - 100, y - 350, 90, 120)
  // Middle line
  line(x - 55, y - 350, x - 55, y - 230)
  // Handles
  strokeWeight(7)
  point(x - 65, y - 300)
  point(x - 45, y - 300)

  // More boxes
  strokeWeight(1.5)
  // Right box (From the cabinet)
  rect(x - 10, y - 260, 40, 30)
  // Left box (From the cabinet)
  rect(x - 150, y - 270, 50, 40)

  // Seat
  rect(x + 435, y - 55, 20, 25)
  // Chair
  quad(x + 430, y - 60, x + 437, y - 55, x + 437, y - 30, x + 430, y - 30)
  // Chair's leg
  line(x + 436, y - 30, x + 435, y - 20)

  // Table
  strokeWeight(2)
  rect(x + 450, y - 70, 60, 60)
  // Table's left leg
  line(x + 450, y - 10, x + 452, y + 10)
  // Table's right leg
  line(x + 510, y - 10, x + 512, y + 10)
  // Table's top right leg
  line(x + 510, y - 70, x + 514, y - 40)

  // Pyramid (kind of :} )
  // Top triangle
  triangle(x - 460, y - 40, x - 480, y - 10, x - 440, y - 10)
  // Middle triangle
  triangle(x - 480, y - 10, x - 440, y - 10, x - 460, y + 15)
  // Left triangle
  triangle(x - 480, y - 10, x - 460, y + 15, x - 495, y + 15)
  // Right triangle
  triangle(x - 440, y - 10, x - 460, y + 15, x - 425, y + 15)

  robo.drawRobot()

  // If the button is clicked, display the text showing how the illusion works
  button.mousePressed(drawHandler)
  stroke(50)
  function drawHandler () {
    showTheTrick = !showTheTrick
  }

  if (showTheTrick == true) {
    fill('black')
    strokeWeight(1)
    textSize(18)
    text('As you can see the illusion below, the robot is not actually moving, but the background is. Try to focus on the robot to see that it\'s just moving its legs and eyes ;)', 10, 30)
  } else {
    return
  }
}

class Robot {
  constructor (
    rightArmX,
    rightArmY,
    leftArmX,
    leftArmY,
    rightLegX,
    rightLegY,
    leftLegX,
    leftLegY
  ) { 
    this.RAX = rightArmX
    this.RAY = rightArmY
    this.LAX = leftArmX
    this.LAY = leftArmY
    this.RLX = rightLegX
    this.RLY = rightLegY
    this.LLX = leftLegX
    this.LLY = leftLegY
    this.changeDirection = false
  }

  drawRobot () {
    // Right Arm
    strokeWeight(2.5)
    line(this.RAX, this.RAY, this.RAX + 10, this.RAY + 15)
    line(this.RAX + 10, this.RAY + 15, this.RAX + 5, this.RAY + 25)

    // Left Arm
    line(this.LAX, this.LAY, this.LAX - 10, this.LAY + 15)
    line(this.LAX - 10, this.LAY + 15, this.LAX - 5, this.LAY + 25)

    // Legs movements
    if (this.RLY <= 365) {
      this.changeDirection = false
    } else if (this.RLY >= 375) {
      this.changeDirection = true
    }

    if (this.changeDirection == false) {
      this.LLY -= 0.6
      this.RLY += 0.6
    } else {
      this.LLY += 0.6
      this.RLY -= 0.6
    }

    // Right Leg
    strokeWeight(3)
    line(this.RLX, this.RLY, this.RLX, this.RLY + 35)
    line(this.RLX, this.RLY + 35, this.RLX + 5, this.RLY + 35)

    // Left Leg
    line(this.LLX, this.LLY, this.LLX, this.LLY + 35)
    line(this.LLX, this.LLY + 35, this.LLX - 5, this.LLY + 35)

    // Body
    stroke(0)
    fill(255)
    strokeWeight(1.5)
    rect(width / 2 - 20, height / 2 - 25, 40, 50)
    // Head
    rect(width / 2 - 15, height / 2 - 50, 25)
    // Eyes and their movements
    strokeWeight(5)
    if (y < 300) {
      point(width / 2 - 10, height / 2 - 40)
      point(width / 2, height / 2 - 40)
    } else {
      point(width / 2 + 5, height / 2 - 40)
      point(width / 2 - 5, height / 2 - 40)
    }
  }
}