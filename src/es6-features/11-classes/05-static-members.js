class Rectangle extends Shape {

    static defaultRectangle() {
        return new Rectangle("default", 0, 0, 100, 100)
    }
}

class Circle extends Shape {

    static defaultCircle() {
        return new Circle("default", 0, 0, 100)
    }
}

var defRectangle = Rectangle.defaultRectangle()
var defCircle = Circle.defaultCircle()
