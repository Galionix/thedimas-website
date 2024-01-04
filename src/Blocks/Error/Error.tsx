// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'

// SyntaxHighlighter.registerLanguage(
// 	'javascript',
// 	js
// )
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

// SyntaxHighlighter.registerLanguage(
// 	'javascript',
// 	js
// )
import s from './style.module.scss'
import { useState } from 'react'

export const Error = (data: any) => {
	const [revealed, setRevealed] = useState(false)
	return (
		<div className={` ${s.error} cols`}>
			<p>
				{`Component not found: ${data.parsedName}.`}
			</p>
			<button
				onClick={e => setRevealed(!revealed)}
			>{`${revealed ? 'Hide' : 'Show'}`}</button>
			<h1>
				{`${revealed
						? 'Block data:'
						: 'Show block data:'
					}`}
			</h1>
			{revealed && (
				<pre>{JSON.stringify(data, null, 2)}</pre>
			)}
		</div>
	)
}
