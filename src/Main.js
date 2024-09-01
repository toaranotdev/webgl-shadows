const scenePositionBuffer = gl.createBuffer();
const scenePositionBufferLocation = gl.getAttribLocation(sceneProgram, "vertexPos");
gl.enableVertexAttribArray(scenePositionBufferLocation);

const scenePositionElementBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, scenePositionElementBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([
    0, 1, 2,
    3, 0, 2
]), gl.STATIC_DRAW);

const boxVertices = createBoxVertices(400, 200, 100, 100);

gl.bindBuffer(gl.ARRAY_BUFFER, scenePositionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);
gl.vertexAttribPointer(scenePositionBufferLocation, 2, gl.FLOAT, false, 0, 0);

function main() {
    gl.clearColor(0.15, 0.15, 0.15, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(sceneProgram);
    gl.uniform3f(gl.getUniformLocation(sceneProgram, "color"), 0.39, 0.7, 0.44);
    gl.uniform2f(gl.getUniformLocation(sceneProgram, "screenRes"), canvas.width, canvas.height);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, scenePositionElementBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, scenePositionBuffer);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
};
main();