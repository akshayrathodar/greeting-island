var canvas = new fabric.Canvas('canvas');
var canvasE = new fabric.Canvas('canvasE');
var image = new Image();
var doc =  window.jspdf.jsPDF('p', 'mm');
var textDiv = document.getElementById('textDiv');
window.onload = function () {
    textDiv.style.display = "none";
    image.src = 'logo.png';
    image.onload = function () {
        canvas.setDimensions({
            width: image.width,
            height: image.height
        })
        var img = new fabric.Image(image, {
            lockMovementX: true,
            lockMovementY: true
        });
        img.set({
            id: 'img',
            left: 0,
            top: 0,
            selectable: true,
            hasBorders: false,
            hasControls: false,
            hasRotatingPoint: false
        });
        canvas.add(img);
    }
    
}

function saveImage() {    
    var imageData = canvas.toDataURL('image/png');
    doc.addImage(imageData, 'PNG', 10, 10);
    doc.save('image.pdf');
    // const dataURL = canvas.toDataURL({
    //     width: canvas.width,
    //     height: canvas.height,
    //     left: 0,
    //     top: 0,
    //     format: 'pdf',
    // });
    // const link = document.createElement('a');
    // link.download = 'image.pdf';
    // link.href = dataURL;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

function submitText() {
    let value = document.getElementById('imagetext').value;
    var textEditable = new fabric.Textbox(
        value, {
        width: canvas.width,
        editable: true
    });
    canvas.add(textEditable);
}

function AddText() {
    textDiv.style.display = "block";
}

document.getElementById('uploader').onchange = function (e) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
            var img = new fabric.Image(image);
            img.crossOrigin="anonymous"
            img.set({
                left: 100,
                top: 60
            });
            img.scaleToWidth(200);
            canvas.add(img).setActiveObject(img).renderAll();
        }
    }
    reader.readAsDataURL(e.target.files[0]);
}

function showSelectedImage(e, canvas) {
    var canvas = new fabric.Canvas(canvas);
    var reader = new FileReader();
    reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
            canvas.setDimensions({
                width: image.width,
                height: image.height
            })
            var img = new fabric.Image(image, {
                lockMovementX: true,
                lockMovementY: true
            });
            img.set({
                id: 'img',
                left: 0,
                top: 0,
                selectable: true,
                hasBorders: false,
                hasControls: false,
                hasRotatingPoint: false
            });
            canvas.add(img);
        }
    }
    reader.readAsDataURL(e.target.files[0]);
}
