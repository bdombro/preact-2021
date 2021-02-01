/**
 * Filters out link modulepreloads from index.html based on keywords
 * 
 * What? snowpack is configured to add <link rel='modulepreload'> for every
 * js file, but we don't want ALL of them to be preloaded. This file applies
 * filters to those modulepreloads -- such as icons.
 */
const fs = require('fs')
const path = require('path')

const excludeKeywords = ['mdi-paths-split']
const index = path.join(__dirname, '../build/index.html')

const html = fs.readFileSync(index, 'utf-8')!
const filtered = html.replace(
	/<link rel="modulepreload".*/, 
	html.match(/<link rel="modulepreload".*/)[0]
		.split('><')
		.filter((mp: string) => !excludeKeywords.some(ek => mp.includes(ek)))
		.join('><')
)
fs.writeFileSync(index, filtered)