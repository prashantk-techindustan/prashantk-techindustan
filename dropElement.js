var canvas;

function drawElement(type) {
    if (type === "circle") {
        var circle = new fabric.Circle({
            left: 100,
            top: 100,
            width: 20,
            height: 20,
            originX: 'center',
            originY: 'center',
            radius: 100,
            hasBorder: true,
            stroke: 'black',
            strokeWidth: 10,
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