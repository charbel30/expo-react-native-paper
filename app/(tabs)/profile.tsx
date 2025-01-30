import { router } from 'expo-router'
import React from 'react'
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native'
import {
  Surface,
  Card,
  Text,
  Button,
  List,
  Switch,
  Avatar,
  Divider,
  useTheme,
  IconButton,
  Chip,
} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')

const Profile = () => {
  const theme = useTheme()
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
    <Surface
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View
          style={[
            styles.profileHeader,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Avatar.Text
            size={100}
            label={userData.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
            style={[
              styles.avatar,
              { backgroundColor: theme.colors.primaryContainer },
            ]}
            labelStyle={{ color: theme.colors.primary }}
          />
          <Text
            variant="headlineSmall"
            style={{ color: 'white', marginTop: 16 }}
          >
            {userData.name}
          </Text>
          <Text variant="bodyLarge" style={{ color: 'white', opacity: 0.9 }}>
            Patient ID: #12345
          </Text>
          <View style={styles.quickActions}>
            <Button
              mode="contained"
              icon="pencil"
              style={{ backgroundColor: 'white' }}
              labelStyle={{ color: theme.colors.primary }}
              onPress={() => {}}
            >
              Edit Profile
            </Button>
          </View>
        </View>

        {/* Personal Information */}
        <Card style={[styles.card, { marginTop: -24, borderRadius: 24 }]}>
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
        <Card style={[styles.card, { marginTop: 16 }]}>
          <Card.Title
            title="Medical History"
            titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            right={(props) => (
              <IconButton {...props} icon="plus" onPress={() => {}} />
            )}
          />
          <Card.Content>
            <List.Section>
              <List.Subheader>Conditions</List.Subheader>
              <View style={styles.conditionsGrid}>
                {userData.medicalHistory.map((condition, index) => (
                  <Card
                    key={index}
                    style={[
                      styles.conditionCard,
                      { backgroundColor: theme.colors.surfaceVariant },
                    ]}
                  >
                    <Card.Content>
                      <View style={styles.conditionHeader}>
                        <MaterialCommunityIcons
                          name="medical-bag"
                          size={24}
                          color={theme.colors.primary}
                        />
                        <Text variant="titleMedium" style={{ marginLeft: 8 }}>
                          {condition.condition}
                        </Text>
                      </View>
                      <Text style={{ color: theme.colors.onSurfaceVariant }}>
                        Diagnosed in {condition.diagnosedYear}
                      </Text>
                    </Card.Content>
                  </Card>
                ))}
              </View>

              <Divider style={styles.divider} />

              <List.Subheader>Allergies</List.Subheader>
              <View style={styles.allergiesContainer}>
                {userData.allergies.map((allergy, index) => (
                  <Chip
                    key={index}
                    icon="alert-circle"
                    mode="outlined"
                    style={styles.allergyChip}
                  >
                    {allergy}
                  </Chip>
                ))}
              </View>
            </List.Section>
          </Card.Content>
        </Card>

        {/* Insurance Details */}
        <Card style={[styles.card, { marginTop: 16 }]}>
          <Card.Title
            title="Insurance Information"
            titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            subtitle="Coverage and policy details"
          />
          <Card.Content>
            <List.Item
              title="Provider"
              description={userData.insurance.provider}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="shield"
                  color={theme.colors.primary}
                />
              )}
            />
            <List.Item
              title="Policy Number"
              description={userData.insurance.policyNumber}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="card-text"
                  color={theme.colors.primary}
                />
              )}
            />
            <List.Item
              title="Group Number"
              description={userData.insurance.groupNumber}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="card-account-details"
                  color={theme.colors.primary}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* Privacy Settings */}
        <Card style={[styles.card, { marginTop: 16 }]}>
          <Card.Title
            title="Privacy Settings"
            titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            subtitle="Manage your data sharing preferences"
          />
          <Card.Content>
            <List.Item
              title="Data Sharing"
              description="Share health data with healthcare providers"
              right={() => (
                <Switch
                  value={dataSharing}
                  onValueChange={setDataSharing}
                  color={theme.colors.primary}
                />
              )}
            />
            <List.Item
              title="Notifications"
              description="Receive medication and appointment reminders"
              right={() => (
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  color={theme.colors.primary}
                />
              )}
            />
          </Card.Content>
        </Card>

        <View style={styles.logoutContainer}>
          <Button
            mode="outlined"
            style={styles.logoutButton}
            icon="logout"
            onPress={() => router.push('/(auth)/login')}
            textColor={theme.colors.error}
          >
            Logout
          </Button>
        </View>
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
  },
  profileHeader: {
    padding: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatar: {
    marginTop: 16,
  },
  quickActions: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 12,
  },
  conditionsGrid: {
    gap: 8,
  },
  conditionCard: {
    borderRadius: 8,
  },
  conditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  allergiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 8,
  },
  allergyChip: {
    marginBottom: 4,
  },
  divider: {
    marginVertical: 16,
  },
  logoutContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  logoutButton: {
    borderColor: 'red',
  },
})

export default Profile
