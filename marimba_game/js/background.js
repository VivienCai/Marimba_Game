
function drawBackground() {
    image(bg1, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawClouds(bg2, 0.0125, bg2clouds)
    drawLayer(bg3, 0.0625);
    drawClouds(mg4, -0.05, mg4fog);
    drawClouds(mg5, 0.225, mg5clouds);
    drawLayer(mg6, 0.4);
    drawClouds(fg7, 0.35, fg7fog);
    drawClouds(fg8, 0.375, fg8clouds);
    drawLayer(fg9, 0.5);
}

function drawClouds(img, heightRatio, cloud) {
    image(img, cloud.x1, heightRatio * SCREEN_HEIGHT, SCREEN_WIDTH * 2, (img.height / img.width) * 2 * SCREEN_WIDTH);
    image(img, cloud.x2, heightRatio * SCREEN_HEIGHT, SCREEN_WIDTH * 2, (img.height / img.width) * 2 * SCREEN_WIDTH);
    cloud.x1 -= cloud.speed;
    cloud.x2 -= cloud.speed;

    if (cloud.x1 < -SCREEN_WIDTH * 2) {
        cloud.x1 = SCREEN_WIDTH * 2
    }
    if (cloud.x2 < -SCREEN_WIDTH * 2) {
        cloud.x1 = SCREEN_WIDTH * 2
    }
}

function drawLayer(img, heightRatio) {
    image(img, 0, heightRatio * SCREEN_HEIGHT, SCREEN_WIDTH, (img.height / img.width) * SCREEN_WIDTH);
}

