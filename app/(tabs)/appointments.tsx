import React from 'react'
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native'
import {
  Surface,
  Card,
  Text,
  Button,
  List,
  IconButton,
  Searchbar,
  Chip,
  useTheme,
  Avatar,
  Divider,
  Portal,
  Modal,
} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')

const AppointmentsScreen = () => {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<string | null>(
    null,
  )
  const [showBookingModal, setShowBookingModal] = React.useState(false)

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
        email: 'dr.smith@heartcare.com',
      },
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
        email: 'dr.johnson@familyhealth.com',
      },
    },
  ]

  const timeSlots = [
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
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
    <Surface
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView style={styles.scrollView}>
        {/* Calendar View */}
        <Card style={[styles.card, { elevation: 2 }]}>
          <Card.Title
            title="Schedule"
            titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            subtitle={selectedDate.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          />
          <Card.Content>
            <View style={styles.calendarContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.calendarStrip}>
                  {calendarDays.map((date, index) => {
                    const isSelected =
                      date.toDateString() === selectedDate.toDateString()
                    return (
                      <Button
                        key={index}
                        mode={isSelected ? 'contained' : 'outlined'}
                        style={[
                          styles.dateButton,
                          isSelected && {
                            backgroundColor: theme.colors.primary,
                          },
                        ]}
                        labelStyle={
                          isSelected ? { color: theme.colors.onPrimary } : {}
                        }
                        onPress={() => setSelectedDate(date)}
                      >
                        <Text
                          style={[
                            styles.dayName,
                            isSelected && { color: theme.colors.onPrimary },
                          ]}
                        >
                          {date.toLocaleDateString('en-US', {
                            weekday: 'short',
                          })}
                        </Text>
                        <Text
                          style={[
                            styles.dayNumber,
                            isSelected && { color: theme.colors.onPrimary },
                          ]}
                        >
                          {date.getDate()}
                        </Text>
                      </Button>
                    )
                  })}
                </View>
              </ScrollView>
            </View>
          </Card.Content>
        </Card>

        {/* Upcoming Appointments */}
        <Card style={[styles.card, { marginTop: 16 }]}>
          <Card.Title
            title="Upcoming Appointments"
            titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            right={(props) => (
              <IconButton {...props} icon="calendar-sync" onPress={() => {}} />
            )}
          />
          <Card.Content>
            {appointments.map((apt, index) => (
              <Card
                key={index}
                style={[
                  styles.appointmentCard,
                  { backgroundColor: theme.colors.surfaceVariant },
                ]}
              >
                <Card.Content>
                  <View style={styles.appointmentHeader}>
                    <Avatar.Icon
                      size={40}
                      icon="doctor"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <View style={styles.appointmentInfo}>
                      <Text variant="titleMedium">{apt.doctor}</Text>
                      <Text
                        variant="bodyMedium"
                        style={{ color: theme.colors.onSurfaceVariant }}
                      >
                        {apt.specialty}
                      </Text>
                    </View>
                  </View>
                  <Divider style={{ marginVertical: 12 }} />
                  <View style={styles.appointmentDetails}>
                    <View style={styles.detailItem}>
                      <MaterialCommunityIcons
                        name="calendar"
                        size={20}
                        color={theme.colors.primary}
                      />
                      <Text style={{ marginLeft: 8 }}>{apt.date}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <MaterialCommunityIcons
                        name="clock"
                        size={20}
                        color={theme.colors.primary}
                      />
                      <Text style={{ marginLeft: 8 }}>{apt.time}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <MaterialCommunityIcons
                        name="map-marker"
                        size={20}
                        color={theme.colors.primary}
                      />
                      <Text style={{ marginLeft: 8 }}>{apt.location}</Text>
                    </View>
                  </View>
                  <View style={styles.actionContainer}>
                    <Button
                      mode="outlined"
                      icon="phone"
                      onPress={() => {}}
                      style={styles.actionButton}
                    >
                      Call
                    </Button>
                    <Button
                      mode="outlined"
                      icon="email"
                      onPress={() => {}}
                      style={styles.actionButton}
                    >
                      Email
                    </Button>
                    <Button
                      mode="outlined"
                      icon="calendar"
                      onPress={() => {}}
                      style={styles.actionButton}
                    >
                      Sync
                    </Button>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </Card.Content>
        </Card>

        {/* Book New Appointment */}
        <Card style={[styles.card, { marginTop: 16 }]}>
          <Card.Title
            title="Book New Appointment"
            titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            subtitle="Find and schedule your next visit"
          />
          <Card.Content>
            <Card
              style={[
                styles.searchCard,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <Card.Content>
                <Searchbar
                  placeholder="Search for doctors or specialties"
                  onChangeText={setSearchQuery}
                  value={searchQuery}
                  style={[
                    styles.searchBar,
                    { backgroundColor: theme.colors.surface },
                  ]}
                  icon="magnify"
                  iconColor={theme.colors.primary}
                />

                <View style={styles.specialtiesContainer}>
                  <Chip
                    selected
                    onPress={() => {}}
                    style={styles.specialtyChip}
                    icon="heart-pulse"
                  >
                    Cardiology
                  </Chip>
                  <Chip
                    onPress={() => {}}
                    style={styles.specialtyChip}
                    icon="brain"
                  >
                    Neurology
                  </Chip>
                  <Chip
                    onPress={() => {}}
                    style={styles.specialtyChip}
                    icon="bone"
                  >
                    Orthopedics
                  </Chip>
                </View>

                <Button
                  mode="contained"
                  onPress={() => setShowBookingModal(true)}
                  style={styles.bookButton}
                  icon="calendar-plus"
                >
                  Book New Appointment
                </Button>
              </Card.Content>
            </Card>
          </Card.Content>
        </Card>

        {/* Instructions Card */}
        <Card style={[styles.card, { marginTop: 16, marginBottom: 24 }]}>
          <Card.Title
            title="Appointment Guidelines"
            titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
          />
          <Card.Content>
            <List.Item
              title="Arrive 15 minutes early"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="clock-fast"
                  color={theme.colors.primary}
                />
              )}
            />
            <List.Item
              title="Bring your insurance card"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="card-account-details"
                  color={theme.colors.primary}
                />
              )}
            />
            <List.Item
              title="Wear a face mask"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="face-mask"
                  color={theme.colors.primary}
                />
              )}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Booking Modal */}
      <Portal>
        <Modal
          visible={showBookingModal}
          onDismiss={() => setShowBookingModal(false)}
          contentContainerStyle={[
            styles.modal,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text variant="titleLarge" style={{ marginBottom: 16 }}>
            Select Time Slot
          </Text>
          <View style={styles.timeSlots}>
            {timeSlots.map((time, index) => (
              <Chip
                key={index}
                selected={selectedTimeSlot === time}
                onPress={() => setSelectedTimeSlot(time)}
                style={styles.timeSlot}
                showSelectedCheck
              >
                {time}
              </Chip>
            ))}
          </View>
          <Button
            mode="contained"
            onPress={() => setShowBookingModal(false)}
            style={{ marginTop: 16 }}
            disabled={!selectedTimeSlot}
          >
            Confirm Booking
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
  calendarContainer: {
    marginVertical: 8,
  },
  calendarStrip: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  dateButton: {
    marginHorizontal: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  dayName: {
    fontSize: 12,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchCard: {
    borderRadius: 8,
    marginBottom: 16,
  },
  searchBar: {
    elevation: 0,
    borderRadius: 8,
    marginBottom: 16,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  specialtyChip: {
    marginBottom: 8,
  },
  appointmentCard: {
    marginBottom: 12,
    borderRadius: 8,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentInfo: {
    marginLeft: 12,
    flex: 1,
  },
  appointmentDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    marginBottom: 8,
  },
  bookButton: {
    marginTop: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
})

export default AppointmentsScreen
