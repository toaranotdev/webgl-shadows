const sceneShadersSrc = {
    vertex: /*glsl*/`
        precision mediump float;

        attribute vec2 vertexPos;
        uniform vec2 screenRes;

        void main() {
            vec2 position = 2.0 * (vertexPos / screenRes) - vec2(1.0);
            gl_Position = vec4(position, 0, 1.0);
        }`,
    fragment: /*glsl*/`
        precision mediump float;

        uniform vec3 color;

        void main() {
            gl_FragColor = vec4(color, 1.0);
        }`
};

const shadowShadersSrc = {
    vertex: /*glsl*/`
    precision mediump float;

    attribute vec3 vertexPos;
    uniform vec2 screenRes;
    uniform vec2 mousePos;

    void main() {
        vec2 position = 2.0 * (vertexPos.xy / screenRes) - vec2(1.0);
         
        if (vertexPos.z > 0.0) {
            vec2 mousePosInClipspace = 2.0 * (mousePos / screenRes) - vec2(1.0);
            vec2 delta = position - mousePosInClipspace;

            gl_Position = vec4(delta, 0, 0);
        } else {
            gl_Position = vec4(position, 0, 1.0);
        }
    }`,

    fragment: /*glsl*/`
    precision mediump float;

    void main() {
        gl_FragColor = vec4(0.1, 0.1, 0.1, 1.0);
    }`
};