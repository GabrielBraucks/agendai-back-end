class CPFValidate {
    constructor(cpf) {
        this.cpf = cpf;
        this.isValid = true;
    }

    validate() {
        if (typeof this.cpf !== 'string') {
            this.isValid = false;
            throw {
                type: 'ValidationError',
                message: 'CPF must be a string',
            };
        }

        // Remove special characters
        this.cpf = this.cpf.replace(/[^\d]/g, '');

        // Check length
        if (this.cpf.length !== 11) {
            this.isValid = false;
            throw {
                type: 'ValidationError',
                message: 'CPF must have 11 digits',
            };
        }

        // Check for repeated digits
        if (/^(\d)\1{10}$/.test(this.cpf)) {
            this.isValid = false;
            throw {
                type: 'ValidationError',
                message: 'Invalid CPF format',
            };
        }

        // Validate first digit
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(this.cpf.charAt(i)) * (10 - i);
        }
        let digit = 11 - (sum % 11);
        if (digit >= 10) digit = 0;
        if (digit !== parseInt(this.cpf.charAt(9))) {
            this.isValid = false;
            throw {
                type: 'ValidationError',
                message: 'Invalid CPF',
            };
        }

        // Validate second digit
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(this.cpf.charAt(i)) * (11 - i);
        }
        digit = 11 - (sum % 11);
        if (digit >= 10) digit = 0;
        if (digit !== parseInt(this.cpf.charAt(10))) {
            this.isValid = false;
            throw {
                type: 'ValidationError',
                message: 'Invalid CPF',
            };
        }

        return this;
    }

    result() {
        return this.isValid;
    }
}

module.exports = CPFValidate;