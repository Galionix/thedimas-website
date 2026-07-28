import s from './Footer.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useStore } from '../../utils/state';
import { getContentLocale } from "../i18n";

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
	const currentLocale = getContentLocale(router.locale)
	const alternateLocale = currentLocale === "en" ? "ua" : "en"
	const localizedData = data[currentLocale]

	const routeRoot = `/${router.pathname.split('/')[1] || ''}`
	const selected = localizedData.comps.findIndex(
		(item: headerLink) =>
			item.href === routeRoot
	)

	const currentHref = selected >= 0
		? localizedData.comps[selected].href
		: ''
	const lightLabel = currentLocale === 'en' ? 'Light' : 'Світла'
	const darkLabel = currentLocale === 'en' ? 'Dark' : 'Темна'

	const {
		theme,
		switchTheme,
		skip_intro
	} = useStore();
	const [isMounted, setIsMounted] = useState(false);

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

	useEffect(() => {
		setIsMounted(true)
	}, [])

	// const styles = cx({

	// })
	return (
		<ul className={` ${s.footer} cols  ${s[preset || '']} `}>
			{localizedData.comps.map(
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
								locale: alternateLocale,
								shallow: true,
							}
						)
					}}
				>
					{alternateLocale}
				</button>
			</li>
			<li>
				<button onClick={changeTheme} suppressHydrationWarning>
					{isMounted ? (theme !== "Light" ? darkLabel : lightLabel) : lightLabel}
				</button>
			</li>
		</ul>

	)
}
