import React from 'react'
import { ScrollView, View, StyleSheet, Linking } from 'react-native'
import {
  Surface,
  Card,
  Text,
  Button,
  List,
  IconButton,
  Portal,
  Dialog,
} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const EmergencyScreen = () => {
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
    <Surface style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        {/* Quick Emergency Actions */}
        <Card style={[styles.card, styles.emergencyCard]}>
          <Card.Title
            title="Emergency Services"
            titleStyle={styles.emergencyTitle}
          />
          <Card.Content>
            <Button
              mode="contained"
              icon="phone"
              style={styles.emergencyButton}
              labelStyle={styles.emergencyButtonLabel}
              onPress={() => handleCallPress(emergencyContacts[0])}
            >
              Call 911
            </Button>
          </Card.Content>
        </Card>

        {/* Emergency Contacts */}
        <Card style={styles.card}>
          <Card.Title title="Emergency Contacts" />
          <Card.Content>
            {emergencyContacts.slice(1).map((contact, index) => (
              <List.Item
                key={index}
                title={contact.name}
                description={contact.number}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={
                      contact.type === 'doctor'
                        ? 'doctor'
                        : contact.type === 'caregiver'
                          ? 'account-heart'
                          : 'phone'
                    }
                  />
                )}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="phone"
                    onPress={() => handleCallPress(contact)}
                  />
                )}
              />
            ))}
          </Card.Content>
        </Card>

        {/* Emergency Protocols */}
        {emergencyProtocols.map((protocol, index) => (
          <Card key={index} style={styles.card}>
            <Card.Title
              title={protocol.condition}
              left={(props) => (
                <MaterialCommunityIcons
                  {...props}
                  name={protocol.icon}
                  size={24}
                  color="#FF5252"
                />
              )}
            />
            <Card.Content>
              <List.Section>
                {protocol.steps.map((step, stepIndex) => (
                  <List.Item
                    key={stepIndex}
                    title={step}
                    left={(props) => (
                      <Text style={styles.stepNumber}>{stepIndex + 1}</Text>
                    )}
                  />
                ))}
              </List.Section>
            </Card.Content>
          </Card>
        ))}

        {/* Location Sharing */}
        <Card style={styles.card}>
          <Card.Title title="Location Sharing" />
          <Card.Content>
            <Button
              mode="outlined"
              icon="map-marker"
              onPress={() => {}}
              style={styles.locationButton}
            >
              Share Current Location
            </Button>
            <Text style={styles.locationNote}>
              Your location will be shared with emergency contacts
            </Text>
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
  screen: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  emergencyCard: {
    backgroundColor: '#FF5252',
  },
  emergencyTitle: {
    color: 'white',
  },
  emergencyButton: {
    backgroundColor: 'white',
  },
  emergencyButtonLabel: {
    color: '#FF5252',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF5252',
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 8,
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
