var canvas;

function drawElement(type) {
    if (type === "circle") {
        var circle = new fabric.Circle({
            left: 80,
            top: 50,
            width: 20,
            height: 20,
            radius: 250,
            hasBorder: true,
            stroke: '#E8795B',
            strokeWidth: 5,
            fill: 'rgba(0,0,0,0)',
            lockScalingFlip: true
        });
        canvas.add(circle);
    }
    if (type === "text") {
        var text = new fabric.IText('HELLO WORLD.',
            {
                left: 200,
                top: 200,
                width: 20,
                height: 20,
                originX: 'center',
                originY: 'center',
                fontSize: 30,
                fill: 'red'
            });
        canvas.add(text);
    }
    if(type === 'text_box'){
      var text_box = new fabric.Textbox('Type Text Here' ,
      {
          left: 200,
          top: 200,
          width: 20,
          height: 20,
          originX: 'center',
          originY: 'center',
          fontSize: 30
      });
      canvas.add(text_box);
    }
    canvas.setActiveObject(canvas.item(canvas._objects.length-1));
}

//Code For Elements Drag and Drop

function dragMoveListener (event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  
    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'
  
    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

function Dnd() {

    canvas.on('object:moving', function (e) {
        var obj = e.target;
         // if object is too big ignore
        if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
            return;
        }        
        obj.setCoords();        
        // top-left  corner
        if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
            obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
            obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
        }
        // bot-right corner
        if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
            obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
            obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
        }
    });

    /* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '.elem1, .elem2, .elem3',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,
  
    // listen for drop related events:
  
    ondropactivate: function (event) {
      // add active dropzone feedback
      event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {
      var draggableElement = event.relatedTarget
      var dropzoneElement = event.target

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
    //draggableElement.textContent = 'Dragged in'
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    //event.relatedTarget.textContent = 'Dragged out'
  },
  ondrop: function (event) {
    console.log(event, event.relatedTarget.contains(document.querySelector('.elem1')));
    if(event.relatedTarget.contains(document.querySelector('.elem1'))) {
        drawElement(`circle`);
        event.relatedTarget.remove();
    }
    if(event.relatedTarget.contains(document.querySelector('.elem2'))) {
        drawElement(`text`);
        event.relatedTarget.remove();

    }
    if(event.relatedTarget.contains(document.querySelector('.elem3'))) {
      drawElement(`text_box`);
      event.relatedTarget.remove();

  }
    //event.relatedTarget.textContent = 'Dropped'
  },
  ondropdeactivate: function (event) {// remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }
})

interact('.elem1, .elem2, .elem3')
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: document.querySelector('.editor-right-part'),
        endOnly: true
      })
    ],
    autoScroll: true,
    // dragMoveListener from the dragging demo above
    listeners: { move: dragMoveListener }
  })
}