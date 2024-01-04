export module Projects {
	export interface Types {
		id: number
		mobile: string
		tablet: string
		desktop: string
	}

	export interface ProviderMetadata {
		public_id: string
		resource_type: string
	}

	export interface Image {
		id: number
		name: string
		alternativeText: string
		caption: string
		width: number
		height: number
		formats?: any
		hash: string
		ext: string
		mime: string
		size: number
		url: string
		previewUrl?: any
		provider: string
		provider_metadata: ProviderMetadata
		created_at: Date
		updated_at: Date
	}

	export interface Comp {
		__component: string
		id: number
		text: string
		types: Types
		type?: any
		images: Image[]
		href: string
		label: string
		target: string
	}

	export interface ProviderMetadata2 {
		public_id: string
		resource_type: string
	}

	export interface Large {
		ext: string
		url: string
		hash: string
		mime: string
		name: string
		path?: any
		size: number
		width: number
		height: number
		provider_metadata: ProviderMetadata2
	}

	export interface ProviderMetadata3 {
		public_id: string
		resource_type: string
	}

	export interface Small {
		ext: string
		url: string
		hash: string
		mime: string
		name: string
		path?: any
		size: number
		width: number
		height: number
		provider_metadata: ProviderMetadata3
	}

	export interface ProviderMetadata4 {
		public_id: string
		resource_type: string
	}

	export interface Medium {
		ext: string
		url: string
		hash: string
		mime: string
		name: string
		path?: any
		size: number
		width: number
		height: number
		provider_metadata: ProviderMetadata4
	}

	export interface ProviderMetadata5 {
		public_id: string
		resource_type: string
	}

	export interface Thumbnail {
		ext: string
		url: string
		hash: string
		mime: string
		name: string
		path?: any
		size: number
		width: number
		height: number
		provider_metadata: ProviderMetadata5
	}

	export interface Formats {
		large: Large
		small: Small
		medium: Medium
		thumbnail: Thumbnail
	}

	export interface ProviderMetadata6 {
		public_id: string
		resource_type: string
	}

	export interface Image2 {
		id: number
		name: string
		alternativeText: string
		caption: string
		width: number
		height: number
		formats: Formats
		hash: string
		ext: string
		mime: string
		size: number
		url: string
		previewUrl?: any
		provider: string
		provider_metadata: ProviderMetadata6
		created_at: Date
		updated_at: Date
	}

	export interface Intro {
		id: number
		project_name: string
		description: string
		intro: string
		types?: any
		image: Image2
	}

	export interface Seo {
		id: number
		title: string
		description: string
		keywords: string
	}

	export interface Localization {
		id: number
		locale: string
	}

	export interface RootObject {
		id: number
		locale: string
		created_at: Date
		updated_at: Date
		comps: Comp[]
		custom_data?: any
		intro: Intro
		seo: Seo
		localizations: Localization[]
	}
}

export module Header {
	export interface Item {
		__component: string
		id: number
		href: string
		label: string
		target?: any
	}

	export interface Localization {
		id: number
		locale: string
	}

	export interface RootObject {
		id: number
		created_at: Date
		updated_at: Date
		locale: string
		items: Item[]
		projects: any[]
		localizations: Localization[]
	}
}
