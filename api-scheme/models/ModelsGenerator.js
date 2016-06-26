'use strict'

const SchemeClassField = require('./SchemeClassField')
const SchemeClass = require('./SchemeClass')
const cheerio = require('cheerio')

const JS_TYPES = {
    Integer: 'number',
    String: 'string',
    Float: 'number',
    'Float number': 'number',
    Boolean: 'boolean',
    True: 'boolean',
    False: 'boolean'
}

class ModelsGenerator {
    /**
     *
     * @param {string} docPageData
     */
    constructor(docPageData) {
        this._docPageData = docPageData
    }

    /**
     *
     * @returns {SchemeClass[]}
     */
    generateModels() {
        let models = []

        let scheme = this._generateScheme()

        scheme.forEach(model => {
            models.push(new SchemeClass(
                model.name,
                this._prepareFields(model.fields),
                model.desc
            ))
        })

        return models
    }

    /**
     *
     * @param {string} table
     * @returns {SchemeClassField[]}
     * @private
     */
    _prepareFields(raw) {
        let fields = []



        raw.forEach(item => {
            let type = this._prepareType(item.type)

            fields.push(new SchemeClassField(
                item.field,
                type,
                item.type.indexOf('Array of Array of') > -1 ? '2d array' : (item.type.indexOf('Array of') > -1 ? 'array' : ''),
                this._isStandart(item.type),
                !item.required,
                item.desc
            ))
        })

        return fields
    }

    _prepareType(type) {
        type = type.replace('Array of Array of ', '').replace('Array of ', '')

        if (JS_TYPES[type]) {
            return JS_TYPES[type]
        }

        return type
    }

    _isStandart(type) {
        type = type.replace('Array of Array of ', '').replace('Array of ', '')

        if (JS_TYPES[type]) {
            return true
        }

        return false
    }


    _generateScheme() {
        let $ = cheerio.load(this._docPageData)

        const apiScheme = []

        $("h4").each((index, el) => {
            const nextTag = $(el).next().prop("tagName")
            const nextNextTag = $(el).next().next().prop("tagName")
            const nextNextNextTag = $(el).next().next().next().prop("tagName")

            if (
                nextTag == 'P' &&
                ( nextNextTag == 'TABLE'
                || nextNextTag == 'BLOCKQUOTE' && nextNextNextTag == 'TABLE')
            ) {
                let isModel = true
                var model = {}

                model.name = $(el).text()
                model.desc = $(el).next().text()
                model.fields = []

                if (nextNextTag == 'TABLE') var table =  $(el).next().next().children().children()
                if (nextNextTag == 'BLOCKQUOTE') var table =  $(el).next().next().next().children().children()


                table.each((i, item) => {
                    let fieldRaw = []

                    $(item).children().each((i, line) => fieldRaw.push($(line).text()))

                    if (i === 0) {
                        isModel = fieldRaw[0] == "Field"
                        return
                    }

                    let field = {}
                    field.field = fieldRaw[0]
                    field.type  = fieldRaw[1]

                    if (isModel) {
                        const optionalRegexp = fieldRaw[2].match(/^Optional. (.*)$/)

                        if (optionalRegexp != null) {
                            fieldRaw[3] = optionalRegexp[1]
                        } else {
                            fieldRaw[3] = fieldRaw[2]
                            fieldRaw[2] = true
                        }
                    }

                    field.required = fieldRaw[2] == true
                    field.desc = fieldRaw[3]

                    model.fields.push(field)
                })

                if (isModel) apiScheme.push(model)
            }
        })

        return apiScheme
    }
}

module.exports = ModelsGenerator