function ExceptionMessage(message, name) {
    this.show= true;
    this.codeStatus=400;
    this.message = message;
    this.name = name;
}

module.exports = {ExceptionMessage};