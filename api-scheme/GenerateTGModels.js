'use strict'

const ModelsGenerator = require('./models/ModelsGenerator')
const fs = require('fs')
const net = require('tiny_request')

net.get('https://core.telegram.org/bots/api', data => {
    const generator = new ModelsGenerator(data)

    const models = generator.generateModels()

    console.info(`${models.length} models generated\n`)

    models.forEach(model => {
        fs.writeFile(`./lib/models/${model.name}.js`, model.modelCode, err => {
            if(err) {
                return console.error(`Failed to save model: ${model.name}`, err)
            }
            console.info(`Saved model: ${model.name}`)
        })
    })

    fs.writeFile(`./lib/models/Models.js`, generateAllModelsExport(models), err => {
        if(err) {
            return console.error(`Failed to save models export file:`, err)
        }
        console.info(`Saved models export file`)
    })

})

function generateAllModelsExport(models) {
    let code = ``
    code += `module.exports = {\n`

    models.forEach(model => code += `   ${model.name}: require('./${model.name}'),\n`)
    code += `   InputMessageContent: require('./InputMessageContent'),\n`
    code += `   InlineQueryResult: require('./InlineQueryResult'),\n`

    code += '}'

    return code
}