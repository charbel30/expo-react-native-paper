import React from 'react'
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native'
import {
  Surface,
  Card,
  Text,
  Button,
  ProgressBar,
  IconButton,
  useTheme,
  Avatar,
  Divider,
} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const { width } = Dimensions.get('window')
const cardWidth = width * 0.44 // For grid layout

const DashboardScreen = () => {
  const theme = useTheme()
  // Mock data - in real app this would come from a backend/state management
  const medications = [
    { name: 'Aspirin', time: '8:00 AM', taken: false },
    { name: 'Vitamin D', time: '9:00 AM', taken: true },
  ]

  const appointments = [
    {
      doctor: 'Dr. Smithww',
      specialty: 'Cardiologist',
      date: '2024-02-01',
      time: '10:00 AM',
    },
    {
      doctor: 'Dr. Johnson',
      specialty: 'Primary Care',
      date: '2024-02-15',
      time: '2:30 PM',
    },
  ]

  const healthMetrics = {
    bloodPressure: '120/80',
    weight: '70 kg',
    glucose: '95 mg/dL',
  }

  return (
    <Surface
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView style={styles.scrollView}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeHeader}>
            <Avatar.Text
              size={48}
              label="JD"
              style={{ backgroundColor: theme.colors.primary }}
            />
            <View style={styles.welcomeText}>
              <Text variant="titleLarge">Welcome Back, John</Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Let's check your health status
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          <Card style={[styles.statsCard, { width: cardWidth }]}>
            <Card.Content>
              <View style={styles.statHeader}>
                <MaterialCommunityIcons
                  name="pill"
                  size={24}
                  color={theme.colors.primary}
                />
                <Text variant="titleMedium">Medications</Text>
              </View>
              <Text
                variant="displaySmall"
                style={{ color: theme.colors.primary }}
              >
                50%
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Taken today
              </Text>
            </Card.Content>
          </Card>

          <Card style={[styles.statsCard, { width: cardWidth }]}>
            <Card.Content>
              <View style={styles.statHeader}>
                <MaterialCommunityIcons
                  name="calendar-check"
                  size={24}
                  color={theme.colors.secondary}
                />
                <Text variant="titleMedium">Appointments</Text>
              </View>
              <Text
                variant="displaySmall"
                style={{ color: theme.colors.secondary }}
              >
                2
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                This week
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Medication Summary Widget */}
        <Card style={styles.card}>
          <Card.Title
            title="Today's Medications"
            right={(props) => (
              <IconButton
                {...props}
                icon="pill"
                onPress={() => router.push('./modals/medications')}
              />
            )}
          />
          <Card.Content style={styles.medicationContent}>
            <ProgressBar
              progress={0.5}
              style={[
                styles.progressBar,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
              color={theme.colors.primary}
            />
            <Text style={[styles.subText, { color: theme.colors.primary }]}>
              50% completed today
            </Text>
            <Divider style={styles.divider} />
            {medications.map((med, index) => (
              <View key={index} style={styles.medicationItem}>
                <Text>
                  {med.name} - {med.time}
                </Text>
                <IconButton
                  icon={
                    med.taken ? 'check-circle' : 'checkbox-blank-circle-outline'
                  }
                  size={20}
                  onPress={() => router.push('/modals/medications')}
                />
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Appointments Widget */}
        <Card style={styles.card}>
          <Card.Title
            title="Upcoming Appointments"
            right={(props) => (
              <IconButton {...props} icon="calendar" onPress={() => {}} />
            )}
          />
          <Card.Content>
            {appointments.map((apt, index) => (
              <View key={index} style={styles.appointmentItem}>
                <Text style={styles.doctorName}>{apt.doctor}</Text>
                <Text style={styles.appointmentDetails}>
                  {apt.specialty} - {apt.date} {apt.time}
                </Text>
              </View>
            ))}
            <Button
              mode="outlined"
              style={styles.viewAllButton}
              onPress={() => {}}
            >
              View All Appointments
            </Button>
          </Card.Content>
        </Card>

        {/* Health Metrics Widget */}
        <Card style={styles.card}>
          <Card.Title
            title="Health Metrics"
            titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            right={(props) => (
              <IconButton
                {...props}
                icon="chart-line"
                onPress={() => router.push('/health-monitoring')}
              />
            )}
          />
          <Card.Content>
            <View
              style={[
                styles.metricsGrid,
                {
                  backgroundColor: theme.colors.surfaceVariant,
                  borderRadius: 12,
                  padding: 16,
                },
              ]}
            >
              <View style={styles.metricItem}>
                <Text
                  style={[
                    styles.metricLabel,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  Blood Pressure
                </Text>
                <Text
                  style={[
                    styles.metricValue,
                    { color: theme.colors.onSurface },
                  ]}
                >
                  {healthMetrics.bloodPressure}
                </Text>
                <View style={styles.trendContainer}>
                  <MaterialCommunityIcons
                    name="arrow-down"
                    size={16}
                    color="#4CAF50"
                  />
                  <Text style={[styles.trendText, { color: '#4CAF50' }]}>
                    2%
                  </Text>
                </View>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Weight</Text>
                <Text style={styles.metricValue}>{healthMetrics.weight}</Text>
                <View style={styles.trendContainer}>
                  <MaterialCommunityIcons
                    name="arrow-up"
                    size={16}
                    color="#F44336"
                  />
                  <Text style={[styles.trendText, { color: '#F44336' }]}>
                    1%
                  </Text>
                </View>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Glucose</Text>
                <Text style={styles.metricValue}>{healthMetrics.glucose}</Text>
                <View style={styles.trendContainer}>
                  <MaterialCommunityIcons
                    name="arrow-down"
                    size={16}
                    color="#4CAF50"
                  />
                  <Text style={[styles.trendText, { color: '#4CAF50' }]}>
                    3%
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Emergency Contact Button */}
        <View style={styles.emergencyContainer}>
          <Button
            mode="contained"
            style={styles.emergencyButton}
            icon="phone"
            buttonColor={theme.colors.error}
            onPress={() => router.push('/emergency')}
          >
            Emergency Contact
          </Button>
        </View>
      </ScrollView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  welcomeSection: {
    paddingVertical: 16,
  },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  welcomeText: {
    marginLeft: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    gap: 16,
    paddingVertical: 12,
  },
  statsCard: {
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
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
    marginVertical: 12,
    elevation: 2,
    borderRadius: 12,
  },
  medicationContent: {
    paddingVertical: 16,
  },
  progressBar: {
    marginVertical: 8,
    height: 8,
    borderRadius: 4,
  },
  subText: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  medicationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  appointmentItem: {
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  appointmentDetails: {
    fontSize: 14,
    color: '#666',
  },
  viewAllButton: {
    marginTop: 8,
  },
  divider: {
    marginVertical: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  emergencyContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  metricItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emergencyButton: {
    borderRadius: 8,
    paddingVertical: 8,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  trendText: {
    fontSize: 12,
    marginLeft: 2,
  },
})

export default DashboardScreen
