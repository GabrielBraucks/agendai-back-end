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
module.exports = { extrairTempo };