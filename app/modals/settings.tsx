import * as SecureStore from 'expo-secure-store'
import React from 'react'
import { Platform, useColorScheme, ScrollView, StyleSheet } from 'react-native'
import {
  Surface,
  List,
  Menu,
  Button,
  IconButton,
  Snackbar,
  Icon,
  Card,
  useTheme,
} from 'react-native-paper'

import {
  Color,
  Colors,
  Language,
  Languages,
  LoadingIndicator,
  Locales,
  Setting,
} from '@/lib'

const Settings = () => {
  const theme = useTheme()
  const colorScheme = useColorScheme()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState({ visible: false, content: '' })
  const [settings, setSettings] = React.useState<Setting>({
    color: 'default',
    language: 'auto',
    theme: 'auto',
  })
  const [display, setDisplay] = React.useState({
    color: false,
    language: false,
    theme: false,
  })

  React.useEffect(() => {
    setLoading(true)

    if (Platform.OS !== 'web') {
      SecureStore.getItemAsync('settings')
        .then((result) =>
          setSettings(JSON.parse(result ?? JSON.stringify(settings))),
        )
        .catch((res) =>
          setMessage({
            visible: true,
            content: res.message,
          }),
        )
    }

    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const themeColors =
    Colors[
      settings.theme === 'auto' ? (colorScheme ?? 'light') : settings.theme
    ]

  return (
    <Surface
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
    >
      {loading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView style={styles.scrollView}>
          <List.AccordionGroup>
            {/* Health Data Management */}
            <Card style={styles.card}>
              <List.Accordion
                id="1"
                title="Health Data Management"
                titleStyle={styles.accordionTitle}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="heart-settings"
                    color={themeColors.default.primary}
                  />
                )}
              >
                <List.Item
                  title="Medication Reminders"
                  description="Set reminder frequency and timing"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="pill"
                      color={themeColors.default.primary}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="chevron-right"
                      onPress={() => {}}
                    />
                  )}
                  style={styles.listItem}
                />

                <List.Item
                  title="Appointment Notifications"
                  description="Configure appointment alerts"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="calendar-clock"
                      color={themeColors.default.primary}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="chevron-right"
                      onPress={() => {}}
                    />
                  )}
                  style={styles.listItem}
                />

                <List.Item
                  title="Health Data Sync"
                  description="Manage data synchronization"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="sync"
                      color={themeColors.default.primary}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="chevron-right"
                      onPress={() => {}}
                    />
                  )}
                  style={styles.listItem}
                />

                <List.Item
                  title="Health Metrics"
                  description="Customize tracking parameters"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="chart-line"
                      color={themeColors.default.primary}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="chevron-right"
                      onPress={() => {}}
                    />
                  )}
                  style={styles.listItem}
                />
              </List.Accordion>
            </Card>

            {/* Emergency Settings */}
            <Card style={styles.card}>
              <List.Accordion
                id="2"
                title="Emergency Settings"
                titleStyle={styles.accordionTitle}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="phone-alert"
                    color={themeColors.default.error}
                  />
                )}
              >
                <List.Item
                  title="Emergency Contacts"
                  description="Manage emergency contact list"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="contacts"
                      color={themeColors.default.error}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="chevron-right"
                      onPress={() => {}}
                    />
                  )}
                  style={styles.listItem}
                />

                <List.Item
                  title="Quick Access Numbers"
                  description="Set speed dial for emergency services"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="phone-fast"
                      color={themeColors.default.error}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="chevron-right"
                      onPress={() => {}}
                    />
                  )}
                  style={styles.listItem}
                />

                <List.Item
                  title="Emergency Instructions"
                  description="Set custom emergency protocols"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="clipboard-alert"
                      color={themeColors.default.error}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="chevron-right"
                      onPress={() => {}}
                    />
                  )}
                  style={styles.listItem}
                />
              </List.Accordion>
            </Card>

            {/* Privacy & Security */}
            <Card style={styles.card}>
              <List.Accordion
                id="3"
                title="Privacy & Security"
                titleStyle={styles.accordionTitle}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="shield-lock"
                    color={themeColors.default.primary}
                  />
                )}
              >
                <List.Item
                  title="Data Sharing"
                  description="Manage healthcare provider access"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="share-variant"
                      color={themeColors.default.primary}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="chevron-right"
                      onPress={() => {}}
                    />
                  )}
                  style={styles.listItem}
                />

                <List.Item
                  title="Privacy Settings"
                  description="Control data visibility"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="eye-settings"
                      color={themeColors.default.primary}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="chevron-right"
                      onPress={() => {}}
                    />
                  )}
                  style={styles.listItem}
                />

                <List.Item
                  title="Biometric Lock"
                  description="Secure app access"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="fingerprint"
                      color={themeColors.default.primary}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="chevron-right"
                      onPress={() => {}}
                    />
                  )}
                  style={styles.listItem}
                />
              </List.Accordion>
            </Card>

            {/* Accessibility */}
            <Card style={styles.card}>
              <List.Accordion
                id="4"
                title="Accessibility"
                titleStyle={styles.accordionTitle}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="access-point"
                    color={themeColors.default.primary}
                  />
                )}
              >
                <List.Item
                  title="Text Size"
                  description="Adjust application text size"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="format-size"
                      color={themeColors.default.primary}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="chevron-right"
                      onPress={() => {}}
                    />
                  )}
                  style={styles.listItem}
                />

                <List.Item
                  title="Voice Commands"
                  description="Enable voice control features"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="microphone"
                      color={themeColors.default.primary}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="chevron-right"
                      onPress={() => {}}
                    />
                  )}
                  style={styles.listItem}
                />

                <List.Item
                  title="Screen Reader"
                  description="Configure screen reader settings"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="text-to-speech"
                      color={themeColors.default.primary}
                    />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="chevron-right"
                      onPress={() => {}}
                    />
                  )}
                  style={styles.listItem}
                />
              </List.Accordion>
            </Card>

            {/* Appearance Settings */}
            <Card style={styles.card}>
              <List.Accordion
                id="5"
                title={Locales.t('appearance')}
                titleStyle={styles.accordionTitle}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="palette"
                    color={themeColors.default.primary}
                  />
                )}
              >
                <List.Item
                  title={Locales.t('language')}
                  description={Locales.t('changeLanguage')}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="translate"
                      color={themeColors.default.primary}
                    />
                  )}
                  right={(props) => (
                    <Menu
                      visible={display.language}
                      onDismiss={() =>
                        setDisplay({ ...display, language: false })
                      }
                      anchor={
                        <IconButton
                          {...props}
                          icon="pencil"
                          onPress={() =>
                            setDisplay({ ...display, language: true })
                          }
                        />
                      }
                    >
                      <Menu.Item
                        title="System"
                        trailingIcon={
                          settings.language === 'auto' ? 'check' : undefined
                        }
                        onPress={() => {
                          setSettings({ ...settings, language: 'auto' })
                          setDisplay({ ...display, language: false })
                        }}
                      />
                      {Object.entries(Languages).map((lang) => (
                        <Menu.Item
                          key={lang[0]}
                          title={`${lang[1].name} / ${lang[1].nativeName}`}
                          trailingIcon={
                            settings.language === lang[0] ? 'check' : undefined
                          }
                          onPress={() => {
                            setSettings({
                              ...settings,
                              language: lang[0] as Language,
                            })
                            setDisplay({ ...display, language: false })
                          }}
                        />
                      ))}
                    </Menu>
                  )}
                  style={styles.listItem}
                />

                <List.Item
                  title={Locales.t('mode')}
                  description={Locales.t('changeMode')}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon={
                        settings.theme === 'auto'
                          ? 'theme-light-dark'
                          : settings.theme === 'light'
                            ? 'weather-sunny'
                            : 'weather-night'
                      }
                      color={themeColors.default.primary}
                    />
                  )}
                  right={(props) => (
                    <Menu
                      visible={display.theme}
                      onDismiss={() => setDisplay({ ...display, theme: false })}
                      anchor={
                        <IconButton
                          {...props}
                          icon="pencil"
                          onPress={() =>
                            setDisplay({ ...display, theme: true })
                          }
                        />
                      }
                    >
                      <Menu.Item
                        title={Locales.t('system')}
                        leadingIcon="theme-light-dark"
                        trailingIcon={
                          settings.theme === 'auto' ? 'check' : undefined
                        }
                        onPress={() => {
                          setSettings({ ...settings, theme: 'auto' })
                          setDisplay({ ...display, theme: false })
                        }}
                      />
                      <Menu.Item
                        title={Locales.t('lightMode')}
                        leadingIcon="weather-sunny"
                        trailingIcon={
                          settings.theme === 'light' ? 'check' : undefined
                        }
                        onPress={() => {
                          setSettings({ ...settings, theme: 'light' })
                          setDisplay({ ...display, theme: false })
                        }}
                      />
                      <Menu.Item
                        title={Locales.t('darkMode')}
                        leadingIcon="weather-night"
                        trailingIcon={
                          settings.theme === 'dark' ? 'check' : undefined
                        }
                        onPress={() => {
                          setSettings({ ...settings, theme: 'dark' })
                          setDisplay({ ...display, theme: false })
                        }}
                      />
                    </Menu>
                  )}
                  style={styles.listItem}
                />

                <List.Item
                  title={Locales.t('color')}
                  description={Locales.t('changeColor')}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="palette-swatch-variant"
                      color={themeColors[settings.color]?.primary}
                    />
                  )}
                  right={(props) => (
                    <Menu
                      visible={display.color}
                      onDismiss={() => setDisplay({ ...display, color: false })}
                      anchor={
                        <IconButton
                          {...props}
                          icon="pencil"
                          onPress={() =>
                            setDisplay({ ...display, color: true })
                          }
                        />
                      }
                    >
                      {Object.keys(Colors.light).map((color) => (
                        <Surface
                          key={color}
                          elevation={0}
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Surface
                            elevation={0}
                            style={{
                              padding: 4,
                              marginLeft: 8,
                              borderRadius: 16,
                              backgroundColor:
                                color !== settings.color
                                  ? undefined
                                  : themeColors[color as Color]?.primary,
                            }}
                          >
                            <Icon
                              size={24}
                              source="palette"
                              color={
                                color !== settings.color
                                  ? themeColors[color as Color]?.primary
                                  : themeColors[color as Color]?.onPrimary
                              }
                            />
                          </Surface>

                          <Menu.Item
                            key={color}
                            title={Locales.t(color)}
                            onPress={() => {
                              setSettings({
                                ...settings,
                                color: color as Color,
                              })
                              setDisplay({ ...display, color: false })
                            }}
                          />
                        </Surface>
                      ))}
                    </Menu>
                  )}
                  style={styles.listItem}
                />
              </List.Accordion>
            </Card>
          </List.AccordionGroup>
        </ScrollView>
      )}

      <Button
        mode="contained"
        style={styles.saveButton}
        icon="content-save"
        onPress={() =>
          Platform.OS !== 'web'
            ? SecureStore.setItemAsync('settings', JSON.stringify(settings))
                .then(() =>
                  setMessage({
                    visible: true,
                    content: Locales.t('restartApp'),
                  }),
                )
                .catch((res) =>
                  setMessage({
                    visible: true,
                    content: res.message,
                  }),
                )
            : setMessage({
                visible: true,
                content: Locales.t('notAvailable'),
              })
        }
      >
        {Locales.t('save')}
      </Button>

      <Snackbar
        visible={message.visible}
        onDismiss={() => setMessage({ ...message, visible: false })}
        onIconPress={() => setMessage({ ...message, visible: false })}
      >
        {message.content}
      </Snackbar>
    </Surface>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  accordionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    paddingVertical: 8,
  },
  saveButton: {
    margin: 16,
  },
})

export default Settings
