class NumberValidate {
    constructor(num) {
        this.num = num;
        this.isValid = true;
    }

    validate() {
        if (typeof this.num !== 'number') {
            this.isValid = false;
            throw {
                type: 'ValidationError',
                message: 'Input must be a number',
            };
        }

        return this;
    }

    min(limit) {
        if (this.isValid && this.num < limit) {
            this.isValid = false;
            throw {
                type: 'ValidationError',
                message: 'Numero menor que o limite de '+ limit,
            };
        }
        return this;
    }

    max(limit) {
        if (this.isValid && this.num > limit) {
            this.isValid = false;
        }
        return this;
    }

    result() {
        return this.isValid;
    }
}

module.exports = NumberValidate;