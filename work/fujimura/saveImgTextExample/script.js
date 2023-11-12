document.addEventListener('DOMContentLoaded', function () {
    let dropZone = document.getElementById('drop_zone');

    dropZone.addEventListener('dragover', (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });

    dropZone.addEventListener('drop', (e) => {
        e.stopPropagation();
        e.preventDefault();
        let files = e.dataTransfer.files;

        for (let file of files) {
            if (file.type.match('image.*')) {
                let reader = new FileReader();

                reader.onload = ((theFile) => {
                    return (e) => {
                        saveImage(e.target.result, 'desiredImageName.jpg');
                    };
                })(file);

                reader.readAsDataURL(file);
            }
        }
    });
});

function saveImage(dataURL, filename) {
    let link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function saveText() {
    let text = document.getElementById('textInput').value;
    let filename = 'desiredTextFileName.txt';
    
    let blob = new Blob([text], { type: 'text/plain' });
    let url = window.URL.createObjectURL(blob);

    let link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
}
