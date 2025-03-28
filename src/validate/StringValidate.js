class StringValidate {
    constructor(str) {
        this.str = str;
        this.isValid = true;
    }

    validate() {
        if (typeof this.str !== 'string') {
            this.isValid = false;
            throw {
                type: 'ValidationError',
                message: 'Input must be a string',
            };
        }

        if (this.str.trim().length === 0) {
            this.isValid = false;
            throw new Error('String cannot be empty');
        }

        return this;
    }

    min(length) {
        if (this.isValid && this.str.length < length) {
            this.isValid = false;
        }
        return this;
    }

    max(length) {
        if (this.isValid && this.str.length > length) {
            this.isValid = false;
        }
        return this;
    }

    result() {
        return this.isValid;
    }
}

module.exports = StringValidate;