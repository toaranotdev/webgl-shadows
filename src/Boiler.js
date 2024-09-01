const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");
const mousePos = { x: 0, y: 0 };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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