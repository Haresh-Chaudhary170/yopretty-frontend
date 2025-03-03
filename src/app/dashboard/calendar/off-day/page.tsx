"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Suspense, useEffect, useState } from 'react'
import PageContainer from '@/components/layout/page-container'
import { Heading } from '@/components/ui/heading'
// import Link from 'next/link'
// import { cn } from '@/lib/utils'
// import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@radix-ui/react-separator'
import axios from 'axios'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import AppointmentTableAction from '@/features/appointments/components/appointment-tables/appointment-table-action'
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton'


interface Event {
    id: string,
    service: {
        name: string,
        id: string
    },
    timeSlot: {
        startTime: string,
        endTime: string
    }

}

export default function Home() {

    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [view, setView] = useState("CALENDAR");


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings/provider`, { withCredentials: true });
                const {bookings } = response.data;


                // setAllEvents(data.map((event: { service: { name: string }, timeSlot: { startTime: string, endTime: string }, id: number }) => ({
                //     title: event.service.name,
                //     start: new Date(event.timeSlot.startTime),
                //     end: new Date(event.timeSlot.endTime),
                //     allDay: false,
                //     id: event.service.name,
                // })));

                setAllEvents(bookings)

                console.log(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);
    // useEffect(() => {
    //     const draggableEl = document.getElementById('draggable-el')
    //     if (draggableEl) {
    //         new Draggable(draggableEl, {
    //             itemSelector: ".fc-event",
    //             eventData: function (eventEl) {
    //                 const title = eventEl.getAttribute("title")
    //                 const id = eventEl.getAttribute("data")
    //                 const start = eventEl.getAttribute("start")
    //                 return { title, id, start }
    //             }
    //         })
    //     }
    // }, [])


    return (
        <PageContainer scrollable={false}>
            <div className='flex flex-1 flex-col space-y-4'>
                <div className='flex items-start justify-between'>
                    <Heading
                        title='Appointments'
                        description='Manage Schedule and Appointments '
                    />
                    <Select
                        onValueChange={
                            (value) => {
                                setView(value)
                            }
                        }
                        value={view}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="View" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="CALENDAR">Calendar View</SelectItem>
                            <SelectItem value="TABLE">Table View</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
                <Separator />
                <main className="">
                    <div className="">
                        {
                            view == "CALENDAR" ? (
                                <div className="">
                                    <FullCalendar
                                        select={
                                            (e) => {
                                                console.log(e)
                                            }
                                        }
                                        plugins={[
                                            dayGridPlugin,
                                            interactionPlugin,
                                            timeGridPlugin
                                        ]}
                                        headerToolbar={{
                                            left: 'prev,next today',
                                            center: 'title',
                                            right: 'resourceTimelineWook, dayGridMonth,timeGridWeek,timeGridDay'
                                        }}
                                        // validRange={{
                                        //     start: new Date()
                                        // }}
                                        events={
                                            allEvents?.map(
                                                (event) => ({
                                                    id: event.id,
                                                    title: event.service.name,
                                                    start: event.timeSlot.startTime,
                                                    end: event.timeSlot.endTime,
                                                    allDay: false
                                                })
                                            )
                                        }
                                        nowIndicator={true}
                                        editable={true}
                                        droppable={true}
                                        selectable={true}
                                        selectMirror={true}
                                    // dateClick={}
                                    // drop={(data: DropArg) => addEvent(data)}
                                    // eventClick={(data: { event: { id: string } }) => handleDeleteModal(data)}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <Separator />
                                    <AppointmentTableAction />
                                    <Suspense
                                        key="unique-key"
                                        fallback={<DataTableSkeleton columnCount={4} rowCount={10} />}
                                    >
                                        {/* normal table  */}
                                        <div className="">
                                            <table className="w-full">
                                                <thead>
                                                    <tr>
                                                        <th>Service</th>
                                                        <th>Start Time</th>
                                                        <th>End Time</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        allEvents?.map((event) => (
                                                            <tr key={event.id}>
                                                                <td>{event.service.name}</td>
                                                                <td>{event.timeSlot.startTime}</td>
                                                                <td>{event.timeSlot.endTime}</td>
                                                                <td>Pending</td>
                                                                <td>
                                                                    <AppointmentTableAction />
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>

                                    </Suspense>
                                </div>
                            )
                        }


                    </div>
                </main >
            </div>
        </PageContainer>


    )
}
