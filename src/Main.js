const scenePositionBuffer = gl.createBuffer();
const scenePositionBufferLocation = gl.getAttribLocation(sceneProgram, "vertexPos");
gl.enableVertexAttribArray(scenePositionBufferLocation);

const boxVertices = createBoxVertices(400, 200, 100, 100);

gl.bindBuffer(gl.ARRAY_BUFFER, scenePositionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);
gl.vertexAttribPointer(scenePositionBufferLocation, 2, gl.FLOAT, false, 0, 0);

function update() {

};

function render() {
    gl.clearColor(0.15, 0.15, 0.15, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(sceneProgram);
    gl.uniform4f(gl.getUniformLocation(sceneProgram, "color"), 0.39, 0.7, 0.44, 1);
    gl.uniform2f(gl.getUniformLocation(sceneProgram, "screenRes"), canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

function main() {
    update();
    render();

    requestAnimationFrame(main);
};
main();