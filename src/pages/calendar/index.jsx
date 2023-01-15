import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import { formatDate } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

import {
  Box,
  Typography,
  List,
  ListItem,
  useTheme,
  ListItemText
} from '@mui/material'
import Header from '../../components/Header'
import { tokens } from '../../theme'

const Calendar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [currentEvents, setCurrentEvents] = useState([])

  const handleDateClick = (selected) => {
    const title = prompt('Please enter a new title for your event')
    const calendarAPI = selected.view.calendar
    calendarAPI.unselect()
    if (title) {
      calendarAPI.addEvent({
        id: `${selected.dateStr}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay
      })
    }
  }

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove()
    }
  }
  return (
    <Box m="20px">
      <Header title="CALENDAR" subTitle="Full Calendar Interive Page" />
      <Box display="flex" justifyContent="space-between">
        {/** CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          padding="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((e) => (
              <ListItem
                key={e.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: '10px 0',
                  borderRadius: '2px'
                }}
              >
                <ListItemText
                  primary={e.title}
                  secondary={
                    <Typography>
                      {formatDate(e.start, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/** CALENDAR */}
        <Box flex={'1 1 100%'} ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin
            ]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: '1234',
                title: 'All Day Event',
                date: '2023-01-10'
              },
              {
                id: '45451',
                title: 'Timed Event',
                date: '2023-01-15'
              },
              {
                id: '81878',
                title: 'Love',
                date: '2023-01-12'
              }
            ]}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Calendar
