'use strict'

class SchemeClassField {
    /**
     *
     * @param {string} name
     * @param {string} typeName
     * @param {string} type
     * @param {boolean} isStandartType
     * @param {boolean} isOptional
     * @param {string} description
     */
    constructor(name, typeName, type, isStandartType, isOptional, description) {
        this._name = name
        this._typeName = typeName
        this._type = type
        this._isStandartType = isStandartType
        this._isOptional = isOptional
        this._nameCamelCase = this._toCamelCase(this.name)
        this._renderedType = this._renderType(typeName, type)
        this._description = description
    }

    /**
     *
     * @returns {string}
     */
    get name() {
        return this._name
    }

    /**
     *
     * @returns {string}
     */
    get nameCamelCase() {
        return this._nameCamelCase
    }

    /**
     * 
     * @returns {string}
     */
    get type() {
        return this._type
    }

    /**
     *
     * @returns {string}
     */
    get typeName() {
        return this._typeName
    }

    /**
     *
     * @returns {boolean}
     */
    get isOptional() {
        return this._isOptional
    }

    /**
     * 
     * @returns {boolean}
     */
    get isStandartType() {
        return this._isStandartType
    }

    /**
     *
     * @returns {string}
     */
    get renderedType() {
        return this._renderedType
    }

    /**
     *
     * @returns {string}
     */
    get description() {
        return this._description
    }

    /**
     *
     * @param {string} str
     * @returns {string}
     * @private
     */
    _toCamelCase(str) {
        const parts = str.split('_')

        if (!parts.length) return str

        const capitalized = parts.slice(1).map(part => part[0].toUpperCase() + part.substr(1))

        capitalized.unshift(parts[0]);

        return capitalized.join('')
    }

    /**
     *
     * @param {string} typeName
     * @param {string} type
     * @returns {string}
     * @private
     */
    _renderType(typeName, type) {
        if (type !== '') {
            switch (type) {
                case 'array':
                    return `${typeName}[]`
                break

                case '2d array':
                    return `${typeName}[][]`
                break
            }
        }

        return typeName
    }
}

module.exports = SchemeClassField