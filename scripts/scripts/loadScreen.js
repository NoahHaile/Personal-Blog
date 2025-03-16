


function runWaitingShader() {

    const processId = currentProcess;
    buildWaitingProgram(fragmentShaderLoadingBodySource);
    if (typeof loadTexture !== "undefined" && loadTexture) {
        attachImageTexture();
    }
    attachPositionBuffer();

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");

    playShader();
    function renderLoop(time) {

        if (currentProcess !== processId) {
            gl.clear(gl.COLOR_BUFFER_BIT);
            return;
        }

        const error = gl.getError();
        if (error !== gl.NO_ERROR) {
            console.error("WebGL Error:", error);
            return;
        }

        if (typeof loadTexture !== "undefined" && loadTexture && textureReady != null && textureReady == false) {
            console.log("Texture not ready");
            requestAnimationFrame(renderLoop);
            return;
        }

        if (!paused) {
            gl.viewport(0, 0, canvas.width, canvas.height);


            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
            if (!startTime) {
                startTime = time * 0.001 - offset;
            }
            gl.uniform1f(timeLocation, time * 0.001 - startTime);
            setTrackedTime(time * 0.001 - startTime);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
        requestAnimationFrame(renderLoop);
    }
    requestAnimationFrame(renderLoop);
}

runWaitingShader();

