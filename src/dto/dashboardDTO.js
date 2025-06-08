const StringValidate = require("../validate/StringValidate");
const NumberValidate = require("../validate/NumberValidate");

class DashboardDTO {
    constructor(dados) {
        if ((new StringValidate(dados.data)).validate().result())
            this.data = dados.data;
    }
}

module.exports = DashboardDTO;