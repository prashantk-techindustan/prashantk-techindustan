function drawElement(type) {
    var canvas = new fabric.Canvas("canvas-circle");
    if (type === "circle") {
        var circle = new fabric.Circle({
            left: 100,
            top: 100,
            width: 20,
            height: 20,
            originX: 'center',
            originY: 'center',
            radius: 20,
            hasBorder: true,
            stroke: 'black',
            strokeWidth: 1,
            fill: 'rgba(0,0,0,0)',
            lockScalingFlip: true
        });
        canvas.add(circle);
    }
    if (type === "text") {
        var text = new fabric.Text('HELLO WORLD.',
            {
                left: 100,
                top: 100,
                width: 20,
                height: 20,
                originX: 'center',
                originY: 'center',
                fontSize: 30,
                originX: 'center',
                originY: 'center',
                fill: 'red'
            });
        canvas.add(text);
    }
}