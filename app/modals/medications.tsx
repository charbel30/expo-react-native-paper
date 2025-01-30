import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import {
  Surface,
  Card,
  Text,
  Button,
  IconButton,
  List,
  FAB,
  Chip,
} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const MedicationsScreen = () => {
  // Mock data - in real app this would come from backend/state management
  const medications = [
    {
      name: 'Aspirin',
      dosage: '81mg',
      frequency: 'Once daily',
      type: 'Heart',
      color: '#FF5252',
      nextDose: '8:00 AM',
      refillDate: '2024-02-15',
      taken: false,
    },
    {
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      type: 'Diabetes',
      color: '#448AFF',
      nextDose: '9:00 AM',
      refillDate: '2024-02-20',
      taken: true,
    },
    {
      name: 'Vitamin D',
      dosage: '2000 IU',
      frequency: 'Once daily',
      type: 'Supplement',
      color: '#4CAF50',
      nextDose: '9:00 AM',
      refillDate: '2024-03-01',
      taken: true,
    },
  ]

  const timelineEvents = [
    { time: '8:00 AM', medications: ['Aspirin'], status: 'upcoming' },
    {
      time: '9:00 AM',
      medications: ['Metformin', 'Vitamin D'],
      status: 'taken',
    },
    { time: '8:00 PM', medications: ['Metformin'], status: 'upcoming' },
  ]

  return (
    <Surface style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        {/* Current Medications List */}
        <Card style={styles.card}>
          <Card.Title title="Current Medications" />
          <Card.Content>
            {medications.map((med, index) => (
              <List.Item
                key={index}
                title={med.name}
                description={`${med.dosage} - ${med.frequency}`}
                left={(props) => (
                  <View
                    style={[
                      styles.medicationType,
                      { backgroundColor: med.color },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="pill"
                      size={24}
                      color="white"
                    />
                  </View>
                )}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon={
                      med.taken
                        ? 'check-circle'
                        : 'checkbox-blank-circle-outline'
                    }
                    onPress={() => {}}
                  />
                )}
              />
            ))}
          </Card.Content>
        </Card>

        {/* Daily Schedule Timeline */}
        <Card style={styles.card}>
          <Card.Title title="Today's Schedule" />
          <Card.Content>
            <View style={styles.timeline}>
              {timelineEvents.map((event, index) => (
                <View key={index} style={styles.timelineEvent}>
                  <Text style={styles.timelineTime}>{event.time}</Text>
                  <View style={styles.timelineContent}>
                    <View
                      style={[
                        styles.timelineDot,
                        {
                          backgroundColor:
                            event.status === 'taken' ? '#4CAF50' : '#757575',
                        },
                      ]}
                    />
                    <View style={styles.timelineMeds}>
                      {event.medications.map((med, medIndex) => (
                        <Chip
                          key={medIndex}
                          style={[
                            styles.timelineChip,
                            {
                              backgroundColor:
                                event.status === 'taken'
                                  ? '#E8F5E9'
                                  : '#F5F5F5',
                            },
                          ]}
                        >
                          {med}
                        </Chip>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Refill Reminders */}
        <Card style={styles.card}>
          <Card.Title title="Refill Reminders" />
          <Card.Content>
            {medications
              .filter(
                (med) => new Date(med.refillDate) <= new Date('2024-02-15'),
              )
              .map((med, index) => (
                <List.Item
                  key={index}
                  title={med.name}
                  description={`Refill needed by ${med.refillDate}`}
                  right={(props) => (
                    <Button mode="outlined" onPress={() => {}}>
                      Request Refill
                    </Button>
                  )}
                />
              ))}
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Add Medication FAB */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {}}
        label="Add Medication"
      />
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
  medicationType: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  timeline: {
    paddingLeft: 8,
  },
  timelineEvent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineTime: {
    width: 70,
    fontSize: 14,
    color: '#666',
  },
  timelineContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  timelineMeds: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timelineChip: {
    marginRight: 8,
    marginBottom: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

export default MedicationsScreen
