const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");
const mousePos = { x: 0, y: 0 };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

gl.enable(gl.DEPTH_TEST);

const sceneProgram = gl.createProgram();
const sceneShaders = {
    vertex: gl.createShader(gl.VERTEX_SHADER),
    fragment: gl.createShader(gl.FRAGMENT_SHADER)
};

gl.shaderSource(sceneShaders.vertex, sceneShadersSrc.vertex);
gl.shaderSource(sceneShaders.fragment, sceneShadersSrc.fragment);

gl.compileShader(sceneShaders.vertex);
if (!gl.getShaderParameter(sceneShaders.vertex, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sceneShaders.vertex));
}

gl.compileShader(sceneShaders.fragment);
if (!gl.getShaderParameter(sceneShaders.fragment, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sceneShaders.fragment));
}

gl.attachShader(sceneProgram, sceneShaders.vertex);
gl.attachShader(sceneProgram, sceneShaders.fragment);

gl.linkProgram(sceneProgram);

const shadowProgram = gl.createProgram();
const shadowShaders = {
    vertex: gl.createShader(gl.VERTEX_SHADER),
    fragment: gl.createShader(gl.FRAGMENT_SHADER)
};

gl.shaderSource(shadowShaders.vertex, shadowShadersSrc.vertex);
gl.shaderSource(shadowShaders.fragment, shadowShadersSrc.fragment);

gl.compileShader(shadowShaders.vertex);
if (!gl.getShaderParameter(shadowShaders.vertex, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shadowShaders.vertex));
}

gl.compileShader(shadowShaders.fragment);
if (!gl.getShaderParameter(shadowShaders.fragment, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shadowShaders.fragment));
}

gl.attachShader(shadowProgram, shadowShaders.vertex);
gl.attachShader(shadowProgram, shadowShaders.fragment);

gl.linkProgram(shadowProgram);

{
    const resize = (() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        gl.viewport(0, 0, canvas.width, canvas.height);
    });

    const updateMousePosition = ((e) => {
        mousePos.x = e.clientX;
        mousePos.y = canvas.height - e.clientY;
    });

    window.addEventListener("resize", resize);
    document.addEventListener("mousemove", updateMousePosition);
    resize();
}

function createBoxVertices(x, y, width, height) {
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    return [
        x + halfWidth, y - halfHeight,
        x + halfWidth, y + halfHeight, 
        x - halfWidth, y + halfHeight,
        x - halfWidth, y - halfHeight,
    ];
};

function createShadowVertices(boxVertices) {
    return [
        boxVertices[0], boxVertices[1], 0,
        boxVertices[2], boxVertices[3], 0,
        boxVertices[4], boxVertices[5], 0,
        boxVertices[6], boxVertices[7], 0,

        boxVertices[0], boxVertices[1], 1,
        boxVertices[2], boxVertices[3], 1,
        boxVertices[4], boxVertices[5], 1,
        boxVertices[6], boxVertices[7], 1,
    ];
}

function createBoxElementArray(numBoxes) {
    const arr = [];

    for (let i = 0; i < numBoxes; i ++) {
        const boxIndex = 4 * i;
        arr.push(
            // 0, 1, 2,
            // 3, 0, 2
            boxIndex, boxIndex + 1, boxIndex + 2,
            boxIndex + 3, boxIndex, boxIndex + 2,
        );
    }

    return arr;
}

function createShadowElementArray(numBoxes) {
    const arr = [];

    for (let i = 0; i < numBoxes; i ++) {
        const shadowIndex = i * 8;
        arr.push(
            // 0, 4, 1,
            // 1, 4, 5,
            
            // 2, 1, 5,
            // 2, 5, 6,
        
            // 3, 0, 7,
            // 0, 4, 7,
        
            // 3, 2, 7,
            // 2, 6, 7,
            shadowIndex, shadowIndex + 4, shadowIndex + 1,
            shadowIndex + 1, shadowIndex + 4, shadowIndex + 5,

            shadowIndex + 2, shadowIndex + 1, shadowIndex + 5,
            shadowIndex + 2, shadowIndex + 5, shadowIndex + 6,

            shadowIndex + 3, shadowIndex, shadowIndex + 7,
            shadowIndex, shadowIndex + 4, shadowIndex + 7,

            shadowIndex + 3, shadowIndex + 2, shadowIndex + 7,
            shadowIndex + 2, shadowIndex + 6, shadowIndex + 7
        )
    }

    return arr;
}