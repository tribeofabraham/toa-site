$(document).ready(function () {
    const socket = io("/", { path: '/ws' });
    socket.on("message", (data) => {
        console.log(data)
        console.log(JSON.stringify(data));
    });
    socket.on("error", (error) => {
        console.log(error.message);
    });
    function sendComplete() {
        alert('send complete');
        const objId = 'video1';
        const langCode = 'en';
        socket.emit("message", { object_id: objId, language_code: langCode });
    }
});