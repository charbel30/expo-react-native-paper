import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import {
  Surface,
  Card,
  Text,
  Button,
  ProgressBar,
  IconButton,
} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const DashboardScreen = () => {
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
    <Surface style={styles.screen}>
      <ScrollView style={styles.scrollView}>
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
          <Card.Content>
            <ProgressBar progress={0.5} style={styles.progressBar} />
            <Text style={styles.subText}>50% completed today</Text>
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
          <Card.Title title="Health Metrics" />
          <Card.Content>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Blood Pressure</Text>
                <Text style={styles.metricValue}>
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
        <Button
          mode="contained"
          style={styles.emergencyButton}
          icon="phone"
          onPress={() => {}}
        >
          Emergency Contact
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
    elevation: 2,
  },
  progressBar: {
    marginVertical: 8,
  },
  subText: {
    fontSize: 12,
    marginBottom: 8,
    color: '#666',
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
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
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
    marginVertical: 16,
    backgroundColor: '#ff4444',
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
