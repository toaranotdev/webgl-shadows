const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

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
    window.addEventListener("resize", resize);
    resize();
}

function createBoxVertices(x, y, width, height) {
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    return new Float32Array([
        x - halfWidth, y - halfHeight,
        x + halfWidth, y - halfHeight,
        x - halfWidth, y + halfHeight,
        x + halfWidth, y + halfHeight, 
    ]);
};

function createShadowVertices(vertices) {

}