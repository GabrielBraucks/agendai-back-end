function extrairTempo(texto) {
    const regex = /(?:(\d+)\s*horas?)(?:\s*e\s*(\d+)\s*minutos?)?|(\d+)\s*minutos?/i;
    const match = texto.match(regex);

    let horas = 0;
    let minutos = 0;

    if (match) {
        if (match[1]) horas = parseInt(match[1]);
        if (match[2]) minutos = parseInt(match[2]);
        else if (match[3]) minutos = parseInt(match[3]);
    }

    return { horas, minutos };
}

function addDuration(startTime, duration) {
    const [startHours, startMinutes, startSeconds] = startTime.split(':').map(Number);
    const [durationHours, durationMinutes, durationSeconds] = duration.split(':').map(Number);

    let totalSeconds = startSeconds + durationSeconds;
    let totalMinutes = startMinutes + durationMinutes;
    let totalHours = startHours + durationHours;

    if (totalSeconds >= 60) {
        totalMinutes += Math.floor(totalSeconds / 60);
        totalSeconds %= 60;
    }

    if (totalMinutes >= 60) {
        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes %= 60;
    }

    const pad = (num) => num.toString().padStart(2, '0');

    return `${pad(totalHours)}:${pad(totalMinutes)}:${pad(totalSeconds)}`;
}
module.exports = { extrairTempo, addDuration };