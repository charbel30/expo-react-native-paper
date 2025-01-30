/**
 * Themes
 */

import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper'

import Colors from '@/lib/ui/styles/colors'

const fonts = configureFonts({ config: { fontFamily: 'NotoSans_400Regular' } })

const BaseLightTheme = {
  ...MD3LightTheme,
  fonts,
}

const BaseDarkTheme = {
  ...MD3DarkTheme,
  fonts,
}

const Themes = {
  light: {
    default: BaseLightTheme,
    emergency: {
      ...BaseLightTheme,
      colors: {
        ...BaseLightTheme.colors,
        ...Colors.light.emergency,
      },
    },
    appointments: {
      ...BaseLightTheme,
      colors: {
        ...BaseLightTheme.colors,
        ...Colors.light.appointments,
      },
    },
    medications: {
      ...BaseLightTheme,
      colors: {
        ...BaseLightTheme.colors,
        ...Colors.light.medications,
      },
    },
    monitoring: {
      ...BaseLightTheme,
      colors: {
        ...BaseLightTheme.colors,
        ...Colors.light.monitoring,
      },
    },
    profile: {
      ...BaseLightTheme,
      colors: {
        ...BaseLightTheme.colors,
        ...Colors.light.profile,
      },
    },
  },
  dark: {
    default: BaseDarkTheme,
    emergency: {
      ...BaseDarkTheme,
      colors: {
        ...BaseDarkTheme.colors,
        ...Colors.dark.emergency,
      },
    },
    appointments: {
      ...BaseDarkTheme,
      colors: {
        ...BaseDarkTheme.colors,
        ...Colors.dark.appointments,
      },
    },
    medications: {
      ...BaseDarkTheme,
      colors: {
        ...BaseDarkTheme.colors,
        ...Colors.dark.medications,
      },
    },
    monitoring: {
      ...BaseDarkTheme,
      colors: {
        ...BaseDarkTheme.colors,
        ...Colors.dark.monitoring,
      },
    },
    profile: {
      ...BaseDarkTheme,
      colors: {
        ...BaseDarkTheme.colors,
        ...Colors.dark.profile,
      },
    },
  },
}

export default Themes
