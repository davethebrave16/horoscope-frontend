// Planet name translations
export const translatePlanet = (planet: string, t: (key: string) => string): string => {
	const planetTranslations: Record<string, string> = {
		'Sun': t('planets.Sun'),
		'Moon': t('planets.Moon'),
		'Mercury': t('planets.Mercury'),
		'Venus': t('planets.Venus'),
		'Mars': t('planets.Mars'),
		'Jupiter': t('planets.Jupiter'),
		'Saturn': t('planets.Saturn'),
		'Uranus': t('planets.Uranus'),
		'Neptune': t('planets.Neptune'),
		'Pluto': t('planets.Pluto')
	}
	return planetTranslations[planet] || planet
}

// Zodiac sign translations
export const translateSign = (sign: string, t: (key: string) => string): string => {
	const signTranslations: Record<string, string> = {
		'Aries': t('signs.Aries'),
		'Taurus': t('signs.Taurus'),
		'Gemini': t('signs.Gemini'),
		'Cancer': t('signs.Cancer'),
		'Leo': t('signs.Leo'),
		'Virgo': t('signs.Virgo'),
		'Libra': t('signs.Libra'),
		'Scorpio': t('signs.Scorpio'),
		'Sagittarius': t('signs.Sagittarius'),
		'Capricorn': t('signs.Capricorn'),
		'Aquarius': t('signs.Aquarius'),
		'Pisces': t('signs.Pisces')
	}
	return signTranslations[sign] || sign
}

// Lenormand card translations
export const translateCard = (card: string, t: (key: string) => string): string => {
	const cardTranslations: Record<string, string> = {
		'Rider': t('cards.Rider'),
		'Clover': t('cards.Clover'),
		'Ship': t('cards.Ship'),
		'House': t('cards.House'),
		'Tree': t('cards.Tree'),
		'Clouds': t('cards.Clouds'),
		'Snake': t('cards.Snake'),
		'Coffin': t('cards.Coffin'),
		'Bouquet': t('cards.Bouquet'),
		'Scythe': t('cards.Scythe'),
		'Whip': t('cards.Whip'),
		'Birds': t('cards.Birds'),
		'Child': t('cards.Child'),
		'Fox': t('cards.Fox'),
		'Bear': t('cards.Bear'),
		'Stars': t('cards.Stars'),
		'Stork': t('cards.Stork'),
		'Dog': t('cards.Dog'),
		'Tower': t('cards.Tower'),
		'Garden': t('cards.Garden'),
		'Mountain': t('cards.Mountain'),
		'Crossroads': t('cards.Crossroads'),
		'Mice': t('cards.Mice'),
		'Heart': t('cards.Heart'),
		'Ring': t('cards.Ring'),
		'Book': t('cards.Book'),
		'Letter': t('cards.Letter'),
		'Man': t('cards.Man'),
		'Woman': t('cards.Woman'),
		'Lily': t('cards.Lily'),
		'Sun': t('cards.Sun'),
		'Moon': t('cards.Moon'),
		'Key': t('cards.Key'),
		'Fish': t('cards.Fish'),
		'Anchor': t('cards.Anchor'),
		'Cross': t('cards.Cross')
	}
	return cardTranslations[card] || card
}

// Month translations
export const translateMonth = (month: string, t: (key: string) => string): string => {
	const monthTranslations: Record<string, string> = {
		'1': t('months.january'),
		'2': t('months.february'),
		'3': t('months.march'),
		'4': t('months.april'),
		'5': t('months.may'),
		'6': t('months.june'),
		'7': t('months.july'),
		'8': t('months.august'),
		'9': t('months.september'),
		'10': t('months.october'),
		'11': t('months.november'),
		'12': t('months.december')
	}
	return monthTranslations[month] || month
}

// Aspect translations
export const translateAspect = (aspect: string, t: (key: string) => string): string => {
	const aspectTranslations: Record<string, string> = {
		'conjunction': t('aspects.conjunction'),
		'opposition': t('aspects.opposition'),
		'trine': t('aspects.trine'),
		'square': t('aspects.square'),
		'sextile': t('aspects.sextile'),
		'quincunx': t('aspects.quincunx')
	}
	return aspectTranslations[aspect.toLowerCase()] || aspect
}

// Angle translations
export const translateAngle = (angle: string, t: (key: string) => string): string => {
	const angleTranslations: Record<string, string> = {
		'Ascendant': t('angles.Ascendant'),
		'Descendant': t('angles.Descendant'),
		'Midheaven': t('angles.Midheaven'),
		'Imum Coeli': t('angles.Imum Coeli')
	}
	return angleTranslations[angle] || angle
}

// Moon phase translations based on fraction
export const translateMoonPhase = (phaseName: string, fraction: number, t: (key: string) => string): string => {
	// First try direct translation if the phase name exists in translations
	const directTranslation = t(`moonPhase.phases.${phaseName}`)
	if (directTranslation !== `moonPhase.phases.${phaseName}`) {
		return directTranslation
	}

	// If no direct translation, determine phase based on fraction
	let phaseKey: string
	
	if (fraction < 0.03 || fraction > 0.97) {
		phaseKey = 'New Moon'
	} else if (fraction < 0.25) {
		phaseKey = 'Waxing Crescent'
	} else if (fraction < 0.27) {
		phaseKey = 'First Quarter'
	} else if (fraction < 0.50) {
		phaseKey = 'Waxing Gibbous'
	} else if (fraction < 0.53) {
		phaseKey = 'Full Moon'
	} else if (fraction < 0.75) {
		phaseKey = 'Waning Gibbous'
	} else if (fraction < 0.77) {
		phaseKey = 'Last Quarter'
	} else {
		phaseKey = 'Waning Crescent'
	}

	return t(`moonPhase.phases.${phaseKey}`)
}
