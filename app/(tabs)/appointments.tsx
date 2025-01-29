import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Surface, Card, Text, Button, List, IconButton, Searchbar, Chip } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const AppointmentsScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<string | null>(null)

  // Mock data - in real app this would come from backend/state management
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Smith',
      specialty: 'Cardiologist',
      date: '2024-02-01',
      time: '10:00 AM',
      location: 'Heart Care Center',
      instructions: 'Please bring your latest ECG report',
      contact: {
        phone: '+1 (555) 123-4567',
        email: 'dr.smith@heartcare.com'
      }
    },
    {
      id: 2,
      doctor: 'Dr. Johnson',
      specialty: 'Primary Care',
      date: '2024-02-15',
      time: '2:30 PM',
      location: 'Family Health Clinic',
      instructions: 'Fasting required for blood work',
      contact: {
        phone: '+1 (555) 987-6543',
        email: 'dr.johnson@familyhealth.com'
      }
    }
  ]

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ]

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push(date)
    }
    return days
  }

  const calendarDays = generateCalendarDays()

  return (
    <Surface style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        {/* Calendar View */}
        <Card style={styles.card}>
          <Card.Title title="Schedule" />
          <Card.Content>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.calendarStrip}>
                {calendarDays.map((date, index) => (
                  <Button
                    key={index}
                    mode={date.toDateString() === selectedDate.toDateString() ? 'contained' : 'outlined'}
                    style={styles.dateButton}
                    onPress={() => setSelectedDate(date)}
                  >
                    <Text style={styles.dayName}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</Text>
                    <Text style={styles.dayNumber}>{date.getDate()}</Text>
                  </Button>
                ))}
              </View>
            </ScrollView>
          </Card.Content>
        </Card>

        {/* Upcoming Appointments */}
        <Card style={styles.card}>
          <Card.Title title="Upcoming Appointments" />
          <Card.Content>
            {appointments.map((apt, index) => (
              <List.Item
                key={index}
                title={apt.doctor}
                description={`${apt.specialty}\n${apt.date} at ${apt.time}`}
                left={props => (
                  <MaterialCommunityIcons name="calendar-clock" size={24} color="#666" />
                )}
                right={props => (
                  <View style={styles.appointmentActions}>
                    <IconButton icon="phone" onPress={() => {}} />
                    <IconButton icon="email" onPress={() => {}} />
                  </View>
                )}
              />
            ))}
          </Card.Content>
        </Card>

        {/* Book New Appointment */}
        <Card style={styles.card}>
          <Card.Title title="Book New Appointment" />
          <Card.Content>
            <Searchbar
              placeholder="Search for doctors or specialties"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
            />

            <Text style={styles.sectionTitle}>Available Time Slots</Text>
            <View style={styles.timeSlots}>
              {timeSlots.map((time, index) => (
                <Chip
                  key={index}
                  selected={selectedTimeSlot === time}
                  onPress={() => setSelectedTimeSlot(time)}
                  style={styles.timeSlot}
                >
                  {time}
                </Chip>
              ))}
            </View>

            <Button
              mode="contained"
              onPress={() => {}}
              style={styles.bookButton}
              disabled={!selectedTimeSlot}
            >
              Book Appointment
            </Button>
          </Card.Content>
        </Card>

        {/* Appointment Details */}
        {appointments.map((apt, index) => (
          <Card key={index} style={styles.card}>
            <Card.Title
              title="Appointment Details"
              right={(props) => (
                <IconButton {...props} icon="pencil" onPress={() => {}} />
              )}
            />
            <Card.Content>
              <List.Item
                title="Location"
                description={apt.location}
                left={props => <List.Icon {...props} icon="map-marker" />}
              />
              <List.Item
                title="Instructions"
                description={apt.instructions}
                left={props => <List.Icon {...props} icon="information" />}
              />
              <View style={styles.contactButtons}>
                <Button
                  mode="outlined"
                  icon="phone"
                  onPress={() => {}}
                  style={styles.contactButton}
                >
                  Call
                </Button>
                <Button
                  mode="outlined"
                  icon="email"
                  onPress={() => {}}
                  style={styles.contactButton}
                >
                  Email
                </Button>
                <Button
                  mode="outlined"
                  icon="calendar"
                  onPress={() => {}}
                  style={styles.contactButton}
                >
                  Add to Calendar
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
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
  calendarStrip: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  dateButton: {
    marginRight: 8,
    paddingHorizontal: 12,
  },
  dayName: {
    fontSize: 12,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  appointmentActions: {
    flexDirection: 'row',
  },
  searchBar: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  timeSlot: {
    margin: 4,
  },
  bookButton: {
    marginTop: 8,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  contactButton: {
    flex: 1,
    marginHorizontal: 4,
  },
})

export default AppointmentsScreen
