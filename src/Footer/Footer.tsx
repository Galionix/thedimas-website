import s from './Footer.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useStore } from '../../utils/state';

const cx = classNames.bind(s);
interface headerLink {
	__component: string
	id: number
	href: string
	label: string
	target?: any
}


export const Footer = ({ data, preset }: {
	data: any
	preset?: string
}) => {
	const router = useRouter()

	const selected = data[
		router.locale || 0
	].comps.findIndex(
		(item: headerLink) =>
			item.href ===
			`/${router.pathname.split('/')[1]}`
	)

	const currentHref = data[
		router.locale || 0
	].comps[selected].href

	const {
		theme,
		switchTheme,
		skip_intro
	} = useStore();

	// const [darkTheme, setDarkTheme] =
	// 	useState(false)

	const changeTheme = (e: any) => {
		// setDarkTheme(!darkTheme)
		switchTheme(theme === "Light" ? "Dark" : "Light")
		// if (theme === "Light") {
		// 	document.documentElement.style.setProperty(
		// 		'--main-color',
		// 		'rgba(255, 255, 255, 0.7)'
		// 	)
		// 	document.documentElement.style.setProperty(
		// 		'--main-bg-color',
		// 		'rgba(0, 0, 0, 0.7)'
		// 	)
		// } else {
		// 	document.documentElement.style.setProperty(
		// 		'--main-color',
		// 		'rgba(0, 0, 0, 0.7)'
		// 	)
		// 	document.documentElement.style.setProperty(
		// 		'--main-bg-color',
		// 		'rgba(255, 255, 255, 0.7)'
		// 	)
		// }

	}

	// const styles = cx({

	// })
	return (
		<ul className={` ${s.footer} cols  ${s[preset || '']} `}>
			{data[router.locale || 0].comps.map(
				(link: any, i: number) => (

					<li
						key={i}
						className={
							cx({
								selected: selected === i,
								dashed: selected === i && currentHref !== router.pathname
							})

						}
					>
						<Link legacyBehavior key={i} href={link.href} passHref >
							<motion.a
								whileHover={{
									scale:
										router.asPath === link.href
											? 1
											: 1.1,
								}}
								whileTap={{ scale: 0.9 }}
								className={` ${router.asPath === link.href
									? s.selected
									: ''
									} link`}
							>
								{link.label}
							</motion.a>
						</Link>
					</li>

				)
			)}


			<li>
				<button
					onClick={() => {
						router.replace(
							router.asPath,
							undefined,
							{
								locale: router.locales!.find(
									item => item !== router.locale
								),
								shallow: true,
							}
						)
					}}
				>
					{router.locales!.find(
						item => item !== router.locale
					)?.split('-')[0]}
				</button>
			</li>
			<li>
				<button onClick={changeTheme}>
					{theme !== "Light" ? 'Dark' : 'Light'}
				</button>
			</li>
		</ul>

	)
}
