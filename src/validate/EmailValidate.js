class EmailValidate {
    constructor(email) {
        this.email = email;
        this.isValid = true;
    }

    validate() {
        if (typeof this.email !== 'string') {
            this.isValid = false;
            throw {
                type: 'ValidationError',
                message: 'Email must be a string',
            };
        }

        // Remove whitespace
        this.email = this.email.trim();

        // Check if empty
        if (this.email.length === 0) {
            this.isValid = false;
            throw {
                type: 'ValidationError',
                message: 'Email cannot be empty',
            };
        }

        // Email regex pattern
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailPattern.test(this.email)) {
            this.isValid = false;
            throw {
                type: 'ValidationError',
                message: 'Invalid email format',
            };
        }

        return this;
    }

    result() {
        return this.isValid;
    }
}

module.exports = EmailValidate;