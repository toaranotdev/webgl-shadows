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

        uniform vec4 color;

        void main() {
            gl_FragColor = color;
        }`
};
