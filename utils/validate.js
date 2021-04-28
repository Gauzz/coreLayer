const isObjectEmpty = (value) => {
    return (
        Reflect.apply(Object.prototype.toString, '[object Object]', [value]) && JSON.stringify(value) === '{}'
    );
};

module.exports = {
    isObjectEmpty
};