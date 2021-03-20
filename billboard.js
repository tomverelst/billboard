function carrousel() {
    let carrousels = document.querySelectorAll(".carrousel");
    carrousels.forEach(function(carrousel){
        const left = carrousel.querySelector(".left");
        const right = carrousel.querySelector(".right");
        const container = carrousel.querySelector(".horizontal-scroll");
        const images = container.querySelectorAll("img");
        const amountOfImages = images.length;
        const calculateVisibleImage = function(){
            const canvas = container.getClientRects()[0];
            const canvasMiddle = (canvas.left + canvas.right) / 2;
            var idx;
            var imageCanvas
            var imageMiddle;
            for(idx = 0; idx < amountOfImages; idx++){
                imageCanvas = images[idx].getClientRects()[0];
                imageMiddle = (imageCanvas.left + imageCanvas.right) / 2;
                if(imageCanvas.left <= canvasMiddle && imageCanvas.right > canvasMiddle) {
                    break;
                }
            }
            var position = 'left';
            if(imageMiddle < canvasMiddle){
                position = 'left';
            } else if (imageMiddle === canvasMiddle){
                position = 'centered';
            } else if (imageMiddle > canvasMiddle){
                position = 'right'
            }
            return {
                index: idx,
                canvas: imageCanvas,
                position: position,
                hasPrevious: idx !== 0,
                hasNext: idx !== (amountOfImages-1)
            };
        }

        function goToImage(imageIndex){
            const canvas = container.getClientRects()[0];
            const canvasWidth = canvas.right - canvas.left;
            const imageCanvas = images[imageIndex].getClientRects()[0];
            const imageWidth = imageCanvas.right - imageCanvas.left;
            const space = (canvasWidth / 2) - (imageWidth / 2);
            const targetX = imageWidthsUntil(imageIndex) - space;
            container.scrollLeft = Math.max(0, targetX);
        }

        function imageWidthsUntil(imageIndex){
            var width = 0;
            var i;
            for(i = 0; i < imageIndex; i++){
                width += imageWidthOf(i);
            }
            return width;
        }

        function imageWidthOf(imageIndex){
            const img = images[imageIndex];
            const canvas = img.getClientRects()[0];
            return canvas.right - canvas.left;
        }

        left.addEventListener('click', function () {
            const visibleImage = calculateVisibleImage();
            if (visibleImage.position === 'centered' && visibleImage.hasPrevious) {
                goToImage(visibleImage.index - 1);
            } else if (visibleImage.position === 'left') {
                goToImage(visibleImage.index);
            } else if (visibleImage.position === 'right' && visibleImage.hasPrevious) {
                goToImage(visibleImage.index - 1);
            }
        });
        right.addEventListener('click', function () {
            const visibleImage = calculateVisibleImage();
            if (visibleImage.position === 'centered' && visibleImage.hasNext) {
                goToImage(visibleImage.index + 1);
            } else if (visibleImage.position === 'left' && visibleImage.hasNext) {
                goToImage(visibleImage.index + 1);
            } else if (visibleImage.position === 'right') {
                goToImage(visibleImage.index);
            }
        });
    });
}


window.onload = function () {
   carrousel();
}
