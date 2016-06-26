'use strict'

class SchemeClass {
    /**
     * 
     * @param {string} name
     * @param {SchemeClassField[]} fields
     * @param {string} description
     */
    constructor(name, fields, description) {
        this._name = name
        this._fields = fields
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
     * @returns {SchemeClassField[]}
     */
    get fields() {
        return this._fields
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
     * @returns {string}
     */
    get modelCode() {
        let code = ''

        let extend = ''

        if (this.name.indexOf('MessageContent') > -1) {
            extend = `extends InputMessageContent `
        }
        if (this.name.indexOf('InlineQueryResult') > -1) {
            extend = `extends InlineQueryResult `
        }

        code += "'use strict'\n"
        code += `\n${this._generateRequirements()}`

        code += `/**\n`
        code += ` * ${this.description}\n`
        code += ` */\n\n`

        code += `class ${this.name} ${extend}{\n`
        code += `${this._generateConstructor()}\n`

        this.fields.forEach(field => code += `\n${this._generateGetter(field)}\n`)

        code += `\n${this._generateDeserializeMethod()}\n`

        code += `\n${this._generateSerializeMethod()}\n`
        
        code += `\n${this._generateToJSONMethod()}\n`

        code += `}\n\n`

        code += `module.exports = ${this.name}`

        return code
    }

    /**
     * 
     * @returns {string}
     * @private
     */
    _generateConstructor() {
        let fieldsNames = this.fields.map(field => field.nameCamelCase)

        let code = ''

        code += `   /**\n`
        code += `    *\n`

        this.fields.forEach(field => {
            let paramType = field.isOptional ? `${field.renderedType}|null` : field.renderedType
            code += `    * @param {${paramType}} ${field.isOptional ? '[' + field.nameCamelCase + ']' : field.nameCamelCase }\n`
        })

        code += `   */\n`

        if (this.fields.length > 6) {
            code += `   constructor(\n     ${fieldsNames.join(', \n     ')}\n   ) {\n`
        }
        else {
            code += `   constructor(${fieldsNames.join(', ')}) {\n`
        }

        if(this.name.indexOf('MessageContent') > -1 || this.name.indexOf('InlineQueryResult') > -1)
            code += `       super()\n`

        fieldsNames.forEach(name => code += `       this._${name} = ${name}\n`)
        code += '   }'

        return code
    }

    /**
     * 
     * @param {SchemeClassField} field
     * @returns {string}
     * @private
     */
    _generateGetter(field) {
        let code = ''

        let returnType = field.isOptional ? `${field.renderedType}|null` : `${field.renderedType}`

        code += `   /**\n`
        code += `    * ${field.description}\n`
        code += `    * @returns {${returnType}}\n`
        code += `   */\n`

        code += `   get ${field.nameCamelCase}() {\n`
        code += `       return this._${field.nameCamelCase}\n`
        code += `   }`

        return code
    }

    /**
     *
     * @returns {string}
     * @private
     */
    _generateDeserializeMethod() {
        let code = ''

        code += `   /**\n`
        code += `    *\n`
        code += `    * @param {Object} raw\n`
        code += `    * @returns {${this.name}}\n`
        code += `    */\n`
        code += `   static deserialize(raw) {\n`

        let args = this.fields.map(field => {
            let raw = `raw['${field.name}']`

            if (!field.isStandartType) {
                if (field.type == '2d array') {
                    return `${raw} ? ${raw}.map(arr => arr.map(item => ${field.typeName}.deserialize(item))) : null`
                }
                else if(field.type == 'array') {
                    return `${raw} ? ${raw}.map(item => ${field.typeName}.deserialize(item)) : null`
                }

                return `${raw} ? ${field.typeName}.deserialize(${raw}) : null`
            }

            if (field.isOptional) {
                return `${raw} ? ${raw} : null`
            }

            return raw
        })

        if (this.fields.length > 4) {
            code += `      return new ${this.name}(\n          ${args.join(', \n          ')}\n      )`
        }
        else {
            code += `      return new ${this.name}(${args.join(', ')})`
        }

        code += `\n   }`

        return code
    }

    /**
     *
     * @returns {string}
     * @private
     */
    _generateSerializeMethod() {
        let code = ''

        code += `   /**\n`
        code += `    *\n`
        code += `    * @returns {Object}\n`
        code += `    */\n`
        code += `   serialize() {\n`

        let obj = this.fields.map(field => {
            let getter = `this.${field.nameCamelCase}`


            if (!field.isStandartType) {
                if (field.type == '') {
                    return `${field.name}: ${getter} ? ${getter}.serialize() : undefined`
                }
                if (field.type == '2d array') {
                    return `${field.name}: ${getter} ? ${getter}.map(arr => arr.map(item => item.serialize())) : undefined`
                }
                else if(field.type == 'array') {
                    return `${field.name}: ${getter} ? ${getter}.map(item => item.serialize()) : undefined`
                }
            }

            return `${field.name}: ${getter} ? ${getter} : undefined`
        })


        code += `      return { \n          ${obj.join(', \n          ')}\n      }`


        code += `\n   }`

        return code
    }

    /**
     * @returns {string}
     * @private
     */
    _generateRequirements() {
        let code = ''
        let renderedTypes = []

        this.fields.forEach(field =>  {
            let typeName = field.typeName

            if (!field.isStandartType && renderedTypes.indexOf(typeName) == -1 && typeName != this.name) {
                renderedTypes.push(typeName)

                //because of typo here: https://core.telegram.org/bots/api#inlinequeryresultgif
                const name = typeName[0].toUpperCase() + typeName.slice(1, typeName.length)

                code += `const ${name} = require('./${name}')\n`
            }
        })

        if (this.name.indexOf('MessageContent') > -1) {
            code += `const InputMessageContent = require('./InputMessageContent')`
        }
        if (this.name.indexOf('InlineQueryResult') > -1) {
            code += `const InlineQueryResult = require('./InlineQueryResult')`
        }

        return code == '' ? '' : `${code}\n`
    }

    /**
     *
     * @returns {string}
     * @private
     */
    _generateToJSONMethod() {
        let code = ''

        code += `   /**\n`
        code += `    *\n`
        code += `    * @returns {string}\n`
        code += `    */\n`
        code += `   toJSON() {\n`
        code += `      return this.serialize()`
        code += `\n   }`

        return code
    }
}

module.exports = SchemeClass