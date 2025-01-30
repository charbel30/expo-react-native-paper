import React from 'react'
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native'
import {
  Surface,
  Card,
  Text,
  Button,
  TextInput,
  SegmentedButtons,
  List,
  IconButton,
  useTheme,
  Chip,
  Portal,
  Modal,
  Divider,
} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')

const HealthMonitoringScreen = () => {
  const theme = useTheme()
  const [bloodPressure, setBloodPressure] = React.useState({
    systolic: '',
    diastolic: '',
  })
  const [weight, setWeight] = React.useState('')
  const [glucose, setGlucose] = React.useState('')
  const [painLevel, setPainLevel] = React.useState('0')
  const [selectedTimeRange, setSelectedTimeRange] = React.useState('week')
  const [showAddSymptom, setShowAddSymptom] = React.useState(false)
  const [symptomType, setSymptomType] = React.useState('')

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
    ],
  }

  const symptoms = [
    {
      date: '2024-01-26',
      type: 'Headache',
      severity: '6',
      duration: '2 hours',
    },
    {
      date: '2024-01-25',
      type: 'Joint Pain',
      severity: '4',
      duration: '3 hours',
    },
  ]

  const symptomTypes = [
    'Headache',
    'Nausea',
    'Fatigue',
    'Dizziness',
    'Joint Pain',
    'Chest Pain',
    'Shortness of Breath',
  ]

  return (
    <Surface
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView style={styles.scrollView}>
        {/* Quick Entry Form */}
        <Card style={[styles.card, { elevation: 2 }]}>
          <Card.Title
            title="Quick Health Check"
            titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            subtitle="Record your daily measurements"
          />
          <Card.Content>
            <Card
              style={[
                styles.measurementCard,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <Card.Content>
                <Text
                  variant="titleMedium"
                  style={{
                    marginBottom: 8,
                    color: theme.colors.onSurfaceVariant,
                  }}
                >
                  Blood Pressure (mmHg)
                </Text>
                <View style={styles.bpContainer}>
                  <TextInput
                    label="Systolic"
                    value={bloodPressure.systolic}
                    onChangeText={(text) =>
                      setBloodPressure({ ...bloodPressure, systolic: text })
                    }
                    keyboardType="numeric"
                    style={[
                      styles.bpInput,
                      { backgroundColor: theme.colors.surface },
                    ]}
                    mode="outlined"
                  />
                  <Text
                    style={[
                      styles.bpSeparator,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    /
                  </Text>
                  <TextInput
                    label="Diastolic"
                    value={bloodPressure.diastolic}
                    onChangeText={(text) =>
                      setBloodPressure({ ...bloodPressure, diastolic: text })
                    }
                    keyboardType="numeric"
                    style={[
                      styles.bpInput,
                      { backgroundColor: theme.colors.surface },
                    ]}
                    mode="outlined"
                  />
                </View>
              </Card.Content>
            </Card>

            <Card
              style={[
                styles.measurementCard,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <Card.Content>
                <Text
                  variant="titleMedium"
                  style={{
                    marginBottom: 8,
                    color: theme.colors.onSurfaceVariant,
                  }}
                >
                  Weight & Glucose
                </Text>
                <View style={styles.measurementRow}>
                  <TextInput
                    label="Weight (kg)"
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                    style={[
                      styles.input,
                      { backgroundColor: theme.colors.surface },
                    ]}
                    mode="outlined"
                  />
                  <TextInput
                    label="Glucose (mg/dL)"
                    value={glucose}
                    onChangeText={setGlucose}
                    keyboardType="numeric"
                    style={[
                      styles.input,
                      { backgroundColor: theme.colors.surface },
                    ]}
                    mode="outlined"
                  />
                </View>
              </Card.Content>
            </Card>

            <Button
              mode="contained"
              onPress={() => {}}
              style={styles.saveButton}
              icon="content-save"
            >
              Save Measurements
            </Button>
          </Card.Content>
        </Card>

        {/* Trends */}
        <Card style={[styles.card, { marginTop: 16 }]}>
          <Card.Title
            title="Health Trends"
            titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            right={(props) => (
              <IconButton {...props} icon="download" onPress={() => {}} />
            )}
          />
          <Card.Content>
            <View style={styles.trendsHeader}>
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
            </View>

            <View
              style={[
                styles.chartContainer,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <View style={styles.chartPlaceholder}>
                <MaterialCommunityIcons
                  name="chart-line-variant"
                  size={48}
                  color={theme.colors.primary}
                />
                <Text
                  style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}
                >
                  Health Metrics Visualization
                </Text>
              </View>
            </View>

            {/* Recent Readings */}
            <List.Section>
              <List.Subheader>Recent Readings</List.Subheader>
              {healthData.bloodPressure.map((reading, index) => (
                <List.Item
                  key={index}
                  title={`Blood Pressure: ${reading.value}`}
                  description={reading.date}
                  left={(props) => <List.Icon {...props} icon="heart-pulse" />}
                />
              ))}
            </List.Section>
          </Card.Content>
        </Card>

        {/* Symptom Tracking */}
        <Card style={[styles.card, { marginTop: 16 }]}>
          <Card.Title
            title="Symptom Tracking"
            titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            right={(props) => (
              <IconButton
                {...props}
                icon="plus"
                onPress={() => setShowAddSymptom(true)}
                style={{ backgroundColor: theme.colors.primaryContainer }}
              />
            )}
          />
          <Card.Content>
            <View style={styles.painScale}>
              <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                Pain Level
              </Text>
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

            <View
              style={[
                styles.bodyMapContainer,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <View style={styles.bodyMapPlaceholder}>
                <MaterialCommunityIcons
                  name="human"
                  size={48}
                  color={theme.colors.primary}
                />
                <Text
                  style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}
                >
                  Tap to indicate pain location
                </Text>
              </View>
            </View>

            <Divider style={{ marginVertical: 16 }} />

            <Text variant="titleMedium" style={{ marginBottom: 8 }}>
              Recent Symptoms
            </Text>
            <View style={styles.symptomsContainer}>
              {symptoms.map((symptom, index) => (
                <Card
                  key={index}
                  style={[
                    styles.symptomCard,
                    { backgroundColor: theme.colors.surfaceVariant },
                  ]}
                >
                  <Card.Content>
                    <View style={styles.symptomHeader}>
                      <MaterialCommunityIcons
                        name="bandage"
                        size={24}
                        color={theme.colors.primary}
                      />
                      <Text variant="titleMedium" style={{ marginLeft: 8 }}>
                        {symptom.type}
                      </Text>
                    </View>
                    <Text style={{ color: theme.colors.onSurfaceVariant }}>
                      Severity: {symptom.severity}/10
                    </Text>
                    <Text style={{ color: theme.colors.onSurfaceVariant }}>
                      Duration: {symptom.duration}
                    </Text>
                  </Card.Content>
                </Card>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Data Sharing Controls */}
        <Card style={[styles.card, { marginTop: 16, marginBottom: 24 }]}>
          <Card.Title
            title="Data Sharing"
            titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            subtitle="Share your health data with healthcare providers"
          />
          <Card.Content>
            <List.Item
              title="Share with Dr. Smith"
              description="Cardiologist"
              right={(props) => (
                <IconButton {...props} icon="share" onPress={() => {}} />
              )}
            />
            <List.Item
              title="Share with Dr. Johnson"
              description="Primary Care"
              right={(props) => (
                <IconButton {...props} icon="share" onPress={() => {}} />
              )}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Add Symptom Modal */}
      <Portal>
        <Modal
          visible={showAddSymptom}
          onDismiss={() => setShowAddSymptom(false)}
          contentContainerStyle={[
            styles.modal,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text variant="titleLarge" style={{ marginBottom: 16 }}>
            Add New Symptom
          </Text>
          <View style={styles.symptomTypes}>
            {symptomTypes.map((type) => (
              <Chip
                key={type}
                selected={type === symptomType}
                onPress={() => setSymptomType(type)}
                style={{ margin: 4 }}
              >
                {type}
              </Chip>
            ))}
          </View>
          <Button
            mode="contained"
            onPress={() => setShowAddSymptom(false)}
            style={{ marginTop: 16 }}
          >
            Add Symptom
          </Button>
        </Modal>
      </Portal>
    </Surface>
  )
}

const styles = StyleSheet.create({
  modal: {
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  symptomTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  measurementCard: {
    marginBottom: 16,
    borderRadius: 8,
  },
  bpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bpInput: {
    flex: 1,
  },
  bpSeparator: {
    fontSize: 24,
    marginHorizontal: 8,
  },
  measurementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  input: {
    flex: 1,
  },
  saveButton: {
    marginTop: 8,
  },
  trendsHeader: {
    marginBottom: 16,
  },
  timeRangeSelector: {
    marginBottom: 16,
  },
  chartContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartNote: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  painScale: {
    marginBottom: 16,
  },
  bodyMapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
  },
  bodyMapPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symptomsContainer: {
    gap: 12,
  },
  symptomCard: {
    borderRadius: 8,
  },
  symptomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bodyMapNote: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
})

export default HealthMonitoringScreen
