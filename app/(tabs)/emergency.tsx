import React from 'react'
import { ScrollView, View, StyleSheet, Linking, Dimensions } from 'react-native'
import {
  Surface,
  Card,
  Text,
  Button,
  List,
  IconButton,
  Portal,
  Dialog,
  useTheme,
  Avatar,
  Divider,
} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')

const EmergencyScreen = () => {
  const theme = useTheme()
  const [confirmDialogVisible, setConfirmDialogVisible] = React.useState(false)
  const [selectedContact, setSelectedContact] = React.useState<null | {
    name: string
    number: string
  }>(null)

  // Mock data - in real app this would come from backend/state management
  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', type: 'emergency' },
    {
      name: 'Dr. Smith (Cardiologist)',
      number: '+1 (555) 123-4567',
      type: 'doctor',
    },
    {
      name: 'Dr. Johnson (Primary)',
      number: '+1 (555) 987-6543',
      type: 'doctor',
    },
    {
      name: 'Sarah (Caregiver)',
      number: '+1 (555) 234-5678',
      type: 'caregiver',
    },
    { name: 'Local Pharmacy', number: '+1 (555) 345-6789', type: 'service' },
  ]

  const emergencyProtocols: {
    condition: string
    steps: string[]
    icon: keyof typeof MaterialCommunityIcons.glyphMap
  }[] = [
    {
      condition: 'Chest Pain',
      steps: [
        'Sit down and try to remain calm',
        'Take prescribed nitroglycerin if available',
        'Call emergency services (911) immediately',
        'Chew an aspirin if recommended by your doctor',
        'Stay still and wait for help',
      ],
      icon: 'heart-pulse',
    },
    {
      condition: 'Severe Low Blood Sugar',
      steps: [
        'Check blood sugar level if possible',
        'Take 15g of fast-acting carbohydrates',
        'Wait 15 minutes and recheck blood sugar',
        'If symptoms persist, call for help',
        'Contact your doctor after the episode',
      ],
      icon: 'water',
    },
    {
      condition: 'Severe Allergic Reaction',
      steps: [
        'Use EpiPen if prescribed and available',
        'Call emergency services (911)',
        'Lie down with legs elevated',
        'Stay calm and still',
        'Monitor breathing and consciousness',
      ],
      icon: 'alert',
    },
  ]

  const handleCallPress = (contact: { name: string; number: string }) => {
    setSelectedContact(contact)
    setConfirmDialogVisible(true)
  }

  const makeCall = () => {
    if (selectedContact) {
      setConfirmDialogVisible(false)
      Linking.openURL(`tel:${selectedContact.number}`)
    }
  }

  return (
    <Surface
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView style={styles.scrollView}>
        {/* Quick Emergency Actions */}
        <Card
          style={[
            styles.card,
            { backgroundColor: theme.colors.error, elevation: 4 },
          ]}
        >
          <Card.Content style={styles.emergencyContent}>
            <View style={styles.emergencyHeader}>
              <MaterialCommunityIcons
                name="phone-alert"
                size={40}
                color="white"
              />
              <View style={styles.emergencyTitleContainer}>
                <Text
                  variant="headlineSmall"
                  style={{ color: 'white', fontWeight: 'bold' }}
                >
                  Emergency Services
                </Text>
                <Text style={{ color: 'white', opacity: 0.9 }}>
                  Get immediate medical assistance
                </Text>
              </View>
            </View>
            <View style={styles.emergencyActions}>
              <Button
                mode="contained"
                icon="phone"
                style={[styles.emergencyButton, { backgroundColor: 'white' }]}
                labelStyle={[
                  styles.emergencyButtonLabel,
                  { color: theme.colors.error },
                ]}
                onPress={() => handleCallPress(emergencyContacts[0])}
              >
                Call 911
              </Button>
              <Button
                mode="contained"
                icon="map-marker"
                style={[
                  styles.emergencyButton,
                  { backgroundColor: 'white', marginTop: 8 },
                ]}
                labelStyle={[
                  styles.emergencyButtonLabel,
                  { color: theme.colors.error },
                ]}
                onPress={() => {}}
              >
                Share Location
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Emergency Contacts */}
        <Card style={[styles.card, { marginTop: 16 }]}>
          <Card.Title
            title="Emergency Contacts"
            titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            subtitle="Quick access to your healthcare providers"
          />
          <Card.Content>
            {emergencyContacts.slice(1).map((contact, index) => (
              <Card
                key={index}
                style={[
                  styles.contactCard,
                  { backgroundColor: theme.colors.surfaceVariant },
                ]}
              >
                <Card.Content>
                  <View style={styles.contactHeader}>
                    <Avatar.Icon
                      size={40}
                      icon={
                        contact.type === 'doctor'
                          ? 'doctor'
                          : contact.type === 'caregiver'
                            ? 'account-heart'
                            : 'phone'
                      }
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <View style={styles.contactInfo}>
                      <Text variant="titleMedium">{contact.name}</Text>
                      <Text
                        variant="bodyMedium"
                        style={{ color: theme.colors.onSurfaceVariant }}
                      >
                        {contact.number}
                      </Text>
                    </View>
                    <IconButton
                      icon="phone"
                      mode="contained"
                      containerColor={theme.colors.primaryContainer}
                      iconColor={theme.colors.primary}
                      onPress={() => handleCallPress(contact)}
                    />
                  </View>
                </Card.Content>
              </Card>
            ))}
          </Card.Content>
        </Card>

        {/* Emergency Protocols */}
        <Card style={[styles.card, { marginTop: 16 }]}>
          <Card.Title
            title="Emergency Protocols"
            titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            subtitle="Step-by-step emergency guidelines"
          />
          <Card.Content>
            {emergencyProtocols.map((protocol, index) => (
              <Card
                key={index}
                style={[
                  styles.protocolCard,
                  { backgroundColor: theme.colors.surfaceVariant },
                ]}
              >
                <Card.Title
                  title={protocol.condition}
                  titleStyle={{ color: theme.colors.onSurface }}
                  left={(props) => (
                    <Avatar.Icon
                      {...props}
                      icon={protocol.icon}
                      size={40}
                      style={{ backgroundColor: theme.colors.errorContainer }}
                      color={theme.colors.error}
                    />
                  )}
                />
                <Divider style={{ marginVertical: 8 }} />
                <Card.Content>
                  <View style={styles.stepsList}>
                    {protocol.steps.map((step, stepIndex) => (
                      <View key={stepIndex} style={styles.stepItem}>
                        <View
                          style={[
                            styles.stepNumber,
                            { backgroundColor: theme.colors.error },
                          ]}
                        >
                          <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            {stepIndex + 1}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.stepText,
                            { color: theme.colors.onSurface },
                          ]}
                        >
                          {step}
                        </Text>
                      </View>
                    ))}
                  </View>
                </Card.Content>
              </Card>
            ))}
          </Card.Content>
        </Card>

        {/* Additional Resources */}
        <Card style={[styles.card, { marginTop: 16, marginBottom: 24 }]}>
          <Card.Title
            title="Additional Resources"
            titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
          />
          <Card.Content>
            <List.Item
              title="Nearest Hospital"
              description="City General Hospital - 1.2 miles"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="hospital-building"
                  color={theme.colors.primary}
                />
              )}
              right={(props) => (
                <IconButton {...props} icon="directions" onPress={() => {}} />
              )}
            />
            <List.Item
              title="Poison Control"
              description="1-800-222-1222"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="alert-circle"
                  color={theme.colors.error}
                />
              )}
              right={(props) => (
                <IconButton {...props} icon="phone" onPress={() => {}} />
              )}
            />
            <List.Item
              title="Medical ID"
              description="View your medical information"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="card-account-details-outline"
                  color={theme.colors.primary}
                />
              )}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="chevron-right"
                  onPress={() => {}}
                />
              )}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Call Confirmation Dialog */}
      <Portal>
        <Dialog
          visible={confirmDialogVisible}
          onDismiss={() => setConfirmDialogVisible(false)}
        >
          <Dialog.Title>Confirm Call</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to call {selectedContact?.name}?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setConfirmDialogVisible(false)}>
              Cancel
            </Button>
            <Button onPress={makeCall}>Call</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface>
  )
}

const styles = StyleSheet.create({
  emergencyContent: {
    padding: 16,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyTitleContainer: {
    marginLeft: 16,
  },
  emergencyActions: {
    marginTop: 8,
  },
  screen: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 12,
  },
  emergencyButton: {
    borderRadius: 8,
    elevation: 2,
  },
  emergencyButtonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactCard: {
    marginBottom: 8,
    borderRadius: 8,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  protocolCard: {
    marginBottom: 12,
    borderRadius: 8,
  },
  stepsList: {
    gap: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
  },
  locationButton: {
    marginVertical: 8,
  },
  locationNote: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
})

export default EmergencyScreen
