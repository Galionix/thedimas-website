// const cms_base_url =
// 	'https://strapi-cms-dimascf.herokuapp.com'

import { staticData } from '../src/jsonData'

// import { staticData } from ''

// import staticData
enum KnownEndpoints {
	'header',
	'projects',
	'footer',
	'main_page',
	'projects_page',
	'blog',
	'posts',
}

type EndpointsStrings =
	keyof typeof KnownEndpoints
type Langs = ['ua', 'en']

// this function should return array of two objects with keys
// corresponding to languages.
//suppose we have only two languages
export const get_endpoint_data = async ({
	endpoint,
	// locales,
}: {
	endpoint: EndpointsStrings
	// locales: string[]
}) => {
	// const translationsPromises =
	// 	locales &&
	// 	locales.map(
	// 		async locale =>
	// 			await fetch(
	// 				`${cms_base_url}/${endpoint}?_locale=${locale}`
	// 			)
	// 	)

	// const translations = await Promise.all(
	// 	translationsPromises
	// ).then(async ([aa, bb]) => {
	// 	const a = await aa.json()
	// 	const b = await bb.json()
	// 	return { [locales[0]]: a, [locales[1]]: b }
	// })

	// return translations
	return staticData[endpoint]
}
