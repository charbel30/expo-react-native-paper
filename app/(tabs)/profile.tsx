import { router } from 'expo-router'
import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import {
  Surface,
  Card,
  Text,
  Button,
  List,
  Switch,
  Avatar,
  Divider,
} from 'react-native-paper'

const Profile = () => {
  const [dataSharing, setDataSharing] = React.useState(true)
  const [notifications, setNotifications] = React.useState(true)

  // Mock user data - in real app this would come from backend/state management
  const userData = {
    name: 'John Doe',
    dateOfBirth: '1985-06-15',
    gender: 'Male',
    contact: {
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Health St, Medical City, MC 12345',
    },
    medicalHistory: [
      { condition: 'Hypertension', diagnosedYear: '2020' },
      { condition: 'Type 2 Diabetes', diagnosedYear: '2019' },
    ],
    allergies: ['Penicillin', 'Peanuts'],
    insurance: {
      provider: 'HealthCare Plus',
      policyNumber: 'HCP123456789',
      groupNumber: 'GRP987654',
    },
  }

  return (
    <Surface style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        {/* Personal Information */}
        <Card style={styles.card}>
          <View style={styles.headerContainer}>
            <Avatar.Text
              size={80}
              label={userData.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            />
            <View style={styles.headerText}>
              <Text variant="headlineSmall">{userData.name}</Text>
              <Text variant="bodyMedium" style={styles.subText}>
                Patient ID: #12345
              </Text>
            </View>
          </View>

          <Card.Content>
            <List.Section>
              <List.Item
                title="Date of Birth"
                description={userData.dateOfBirth}
                left={(props) => <List.Icon {...props} icon="calendar" />}
              />
              <List.Item
                title="Gender"
                description={userData.gender}
                left={(props) => <List.Icon {...props} icon="account" />}
              />
              <List.Item
                title="Email"
                description={userData.contact.email}
                left={(props) => <List.Icon {...props} icon="email" />}
              />
              <List.Item
                title="Phone"
                description={userData.contact.phone}
                left={(props) => <List.Icon {...props} icon="phone" />}
              />
              <List.Item
                title="Address"
                description={userData.contact.address}
                left={(props) => <List.Icon {...props} icon="map-marker" />}
              />
            </List.Section>
          </Card.Content>
        </Card>

        {/* Medical History */}
        <Card style={styles.card}>
          <Card.Title title="Medical History" />
          <Card.Content>
            <List.Section>
              <List.Subheader>Conditions</List.Subheader>
              {userData.medicalHistory.map((condition, index) => (
                <List.Item
                  key={index}
                  title={condition.condition}
                  description={`Diagnosed in ${condition.diagnosedYear}`}
                  left={(props) => <List.Icon {...props} icon="medical-bag" />}
                />
              ))}

              <Divider style={styles.divider} />

              <List.Subheader>Allergies</List.Subheader>
              {userData.allergies.map((allergy, index) => (
                <List.Item
                  key={index}
                  title={allergy}
                  left={(props) => <List.Icon {...props} icon="alert-circle" />}
                />
              ))}
            </List.Section>
          </Card.Content>
        </Card>

        {/* Insurance Details */}
        <Card style={styles.card}>
          <Card.Title title="Insurance Information" />
          <Card.Content>
            <List.Item
              title="Provider"
              description={userData.insurance.provider}
              left={(props) => <List.Icon {...props} icon="shield" />}
            />
            <List.Item
              title="Policy Number"
              description={userData.insurance.policyNumber}
              left={(props) => <List.Icon {...props} icon="card-text" />}
            />
            <List.Item
              title="Group Number"
              description={userData.insurance.groupNumber}
              left={(props) => (
                <List.Icon {...props} icon="card-account-details" />
              )}
            />
          </Card.Content>
        </Card>

        {/* Privacy Settings */}
        <Card style={styles.card}>
          <Card.Title title="Privacy Settings" />
          <Card.Content>
            <List.Item
              title="Data Sharing"
              description="Share health data with healthcare providers"
              right={() => (
                <Switch value={dataSharing} onValueChange={setDataSharing} />
              )}
            />
            <List.Item
              title="Notifications"
              description="Receive medication and appointment reminders"
              right={() => (
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                />
              )}
            />
          </Card.Content>
        </Card>

        <Button
          mode="outlined"
          style={styles.logoutButton}
          icon="logout"
          onPress={() => router.push('/(auth)/login')}
        >
          Logout
        </Button>
      </ScrollView>
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
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 16,
  },
  subText: {
    color: '#666',
  },
  divider: {
    marginVertical: 8,
  },
  logoutButton: {
    marginVertical: 16,
  },
})

export default Profile
