const scenePositionBuffer = gl.createBuffer();
const scenePositionBufferLocation = gl.getAttribLocation(sceneProgram, "vertexPos");
gl.enableVertexAttribArray(scenePositionBufferLocation);

const scenePositionElementBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, scenePositionElementBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(createBoxElementArray(3)), gl.STATIC_DRAW);

const box1 = createBoxVertices(400, 100, 100, 100);
const box2 = createBoxVertices(120, 400, 80, 80);
const box3 = createBoxVertices(620, 420, 160, 160);

const boxVertices = box1.concat(box2).concat(box3);

gl.bindBuffer(gl.ARRAY_BUFFER, scenePositionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

const shadowPositionBuffer = gl.createBuffer();
const shadowPositionBufferLocation = gl.getAttribLocation(shadowProgram, "vertexPos");
gl.enableVertexAttribArray(shadowPositionBufferLocation);

const shadowPositionElementBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shadowPositionElementBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(createShadowElementArray(3)), gl.STATIC_DRAW);

const shadow1 = createShadowVertices(box1);
const shadow2 = createShadowVertices(box2);
const shadow3 = createShadowVertices(box3);
const shadowVertices = shadow1.concat(shadow2).concat(shadow3);

gl.bindBuffer(gl.ARRAY_BUFFER, shadowPositionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shadowVertices), gl.STATIC_DRAW);

function main() {
    gl.clearColor(0.15, 0.15, 0.15, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(sceneProgram);
    gl.uniform2f(gl.getUniformLocation(sceneProgram, "screenRes"), canvas.width, canvas.height);

    gl.bindBuffer(gl.ARRAY_BUFFER, scenePositionBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, scenePositionElementBuffer);
    gl.vertexAttribPointer(scenePositionBufferLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform3f(gl.getUniformLocation(sceneProgram, "color"), 0.39, 0.7, 0.44);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

    gl.uniform3f(gl.getUniformLocation(sceneProgram, "color"), 0.51, 0.75, 0.83);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 12);

    gl.uniform3f(gl.getUniformLocation(sceneProgram, "color"), 0.7, 0.39, 0.39);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 24);

    gl.useProgram(shadowProgram);
    gl.uniform2f(gl.getUniformLocation(shadowProgram, "screenRes"), canvas.width, canvas.height);
    gl.uniform2f(gl.getUniformLocation(shadowProgram, "mousePos"), mousePos.x, mousePos.y);

    gl.bindBuffer(gl.ARRAY_BUFFER, shadowPositionBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shadowPositionElementBuffer);
    gl.vertexAttribPointer(shadowPositionBufferLocation, 3, gl.FLOAT, false, 0, 0);

    gl.drawElements(gl.TRIANGLES, 72, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(main);
};
main();