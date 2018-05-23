class Utils {
    static async convertDoubleToCents(amount) {
        return await parseInt(amount.toString().replace('.', ''));
    }

    static isEmpty(value) {
        return typeof value == 'string' && ! value.trim() || typeof value == 'undefined' || value === null;
    }
}

module.exports = Utils;