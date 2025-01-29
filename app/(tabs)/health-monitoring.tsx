import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Surface, Card, Text, Button, TextInput, SegmentedButtons, List, IconButton } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const HealthMonitoringScreen = () => {
  const [bloodPressure, setBloodPressure] = React.useState({ systolic: '', diastolic: '' })
  const [weight, setWeight] = React.useState('')
  const [glucose, setGlucose] = React.useState('')
  const [painLevel, setPainLevel] = React.useState('0')
  const [selectedTimeRange, setSelectedTimeRange] = React.useState('week')

  // Mock data - in real app this would come from backend/state management
  const healthData = {
    bloodPressure: [
      { date: '2024-01-22', value: '120/80' },
      { date: '2024-01-23', value: '118/79' },
      { date: '2024-01-24', value: '122/82' },
      { date: '2024-01-25', value: '119/78' },
      { date: '2024-01-26', value: '121/81' },
    ],
    weight: [
      { date: '2024-01-22', value: '70.5' },
      { date: '2024-01-23', value: '70.3' },
      { date: '2024-01-24', value: '70.4' },
      { date: '2024-01-25', value: '70.2' },
      { date: '2024-01-26', value: '70.1' },
    ],
    glucose: [
      { date: '2024-01-22', value: '95' },
      { date: '2024-01-23', value: '98' },
      { date: '2024-01-24', value: '92' },
      { date: '2024-01-25', value: '94' },
      { date: '2024-01-26', value: '96' },
    ]
  }

  const symptoms = [
    { date: '2024-01-26', type: 'Headache', severity: '6', duration: '2 hours' },
    { date: '2024-01-25', type: 'Joint Pain', severity: '4', duration: '3 hours' },
  ]

  return (
    <Surface style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        {/* Quick Entry Form */}
        <Card style={styles.card}>
          <Card.Title title="Quick Health Check" />
          <Card.Content>
            <View style={styles.bpContainer}>
              <TextInput
                label="Systolic"
                value={bloodPressure.systolic}
                onChangeText={text => setBloodPressure({ ...bloodPressure, systolic: text })}
                keyboardType="numeric"
                style={styles.bpInput}
              />
              <Text style={styles.bpSeparator}>/</Text>
              <TextInput
                label="Diastolic"
                value={bloodPressure.diastolic}
                onChangeText={text => setBloodPressure({ ...bloodPressure, diastolic: text })}
                keyboardType="numeric"
                style={styles.bpInput}
              />
            </View>

            <TextInput
              label="Weight (kg)"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              label="Blood Glucose (mg/dL)"
              value={glucose}
              onChangeText={setGlucose}
              keyboardType="numeric"
              style={styles.input}
            />

            <Button mode="contained" onPress={() => {}} style={styles.saveButton}>
              Save Measurements
            </Button>
          </Card.Content>
        </Card>

        {/* Trends */}
        <Card style={styles.card}>
          <Card.Title title="Health Trends" />
          <Card.Content>
            <SegmentedButtons
              value={selectedTimeRange}
              onValueChange={setSelectedTimeRange}
              buttons={[
                { value: 'week', label: 'Week' },
                { value: 'month', label: 'Month' },
                { value: 'year', label: 'Year' },
              ]}
              style={styles.timeRangeSelector}
            />

            {/* Mock Chart - In real app, use a charting library */}
            <View style={styles.chartPlaceholder}>
              <Text>Trend Visualization Chart</Text>
              <Text style={styles.chartNote}>
                (Using a charting library like react-native-chart-kit)
              </Text>
            </View>

            {/* Recent Readings */}
            <List.Section>
              <List.Subheader>Recent Readings</List.Subheader>
              {healthData.bloodPressure.map((reading, index) => (
                <List.Item
                  key={index}
                  title={`Blood Pressure: ${reading.value}`}
                  description={reading.date}
                  left={props => <List.Icon {...props} icon="heart-pulse" />}
                />
              ))}
            </List.Section>
          </Card.Content>
        </Card>

        {/* Symptom Tracking */}
        <Card style={styles.card}>
          <Card.Title 
            title="Symptom Tracking"
            right={(props) => (
              <IconButton {...props} icon="plus" onPress={() => {}} />
            )}
          />
          <Card.Content>
            <View style={styles.painScale}>
              <Text>Pain Level:</Text>
              <SegmentedButtons
                value={painLevel}
                onValueChange={setPainLevel}
                buttons={[
                  { value: '0', label: '0' },
                  { value: '2', label: '2' },
                  { value: '4', label: '4' },
                  { value: '6', label: '6' },
                  { value: '8', label: '8' },
                  { value: '10', label: '10' },
                ]}
              />
            </View>

            {/* Body Map Placeholder */}
            <View style={styles.bodyMapPlaceholder}>
              <Text>Body Map for Pain Location</Text>
              <Text style={styles.bodyMapNote}>
                (Interactive body map for selecting pain locations)
              </Text>
            </View>

            {/* Recent Symptoms */}
            <List.Section>
              <List.Subheader>Recent Symptoms</List.Subheader>
              {symptoms.map((symptom, index) => (
                <List.Item
                  key={index}
                  title={symptom.type}
                  description={`Severity: ${symptom.severity}/10 - Duration: ${symptom.duration}`}
                  left={props => <List.Icon {...props} icon="bandage" />}
                />
              ))}
            </List.Section>
          </Card.Content>
        </Card>

        {/* Data Sharing Controls */}
        <Card style={styles.card}>
          <Card.Title title="Data Sharing" />
          <Card.Content>
            <List.Item
              title="Share with Dr. Smith"
              description="Cardiologist"
              right={props => (
                <IconButton
                  {...props}
                  icon="share"
                  onPress={() => {}}
                />
              )}
            />
            <List.Item
              title="Share with Dr. Johnson"
              description="Primary Care"
              right={props => (
                <IconButton
                  {...props}
                  icon="share"
                  onPress={() => {}}
                />
              )}
            />
          </Card.Content>
        </Card>
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
  bpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bpInput: {
    flex: 1,
  },
  bpSeparator: {
    fontSize: 24,
    marginHorizontal: 8,
  },
  input: {
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 8,
  },
  timeRangeSelector: {
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  chartNote: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  painScale: {
    marginBottom: 16,
  },
  bodyMapPlaceholder: {
    height: 200,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 16,
  },
  bodyMapNote: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
})

export default HealthMonitoringScreen
