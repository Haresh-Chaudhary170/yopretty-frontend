// "use client"
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import { Suspense, useEffect, useState } from 'react'
// import PageContainer from '@/components/layout/page-container'
// import { Heading } from '@/components/ui/heading'
// import { Separator } from '@radix-ui/react-separator'
// import axios from 'axios'
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton'

// interface Event {
//     id: string,
//     service: {
//         name: string,
//         id: string
//     },
//     timeSlot: {
//         startTime: string,
//         endTime: string
//     }
// }

// export default function Home() {
//     const [allEvents, setAllEvents] = useState<Event[]>([]);
//     const [view, setView] = useState("CALENDAR");

//     const offDays: Record<string, string> = {
//         '2025-03-05': 'Maintenance',
//         '2025-03-10': 'Public Holiday',
//         '2025-03-15': 'Company Event'
//     };

//     const isOffDay = (date: Date): { isOff: boolean; reason: string } => {
//         const dateStr: string = date.toISOString().split('T')[0];
//         return offDays[dateStr]
//             ? { isOff: true, reason: offDays[dateStr] }
//             : { isOff: false, reason: '' };
//     };
//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings/provider`, { withCredentials: true });
//                 const { bookings } = response.data;
//                 setAllEvents(bookings);
//                 console.log(response.data);
//             } catch (error) {
//                 console.error('Error fetching events:', error);
//             }
//         };

//         fetchEvents();
//     }, []);

//     return (
//         <PageContainer scrollable={false}>
//             <div className='flex flex-1 flex-col space-y-4'>
//                 <div className='flex items-start justify-between'>
//                     <Heading
//                         title='Appointments'
//                         description='Manage Schedule and Appointments '
//                     />
//                     <Select
//                         onValueChange={(value) => setView(value)}
//                         value={view}
//                     >
//                         <SelectTrigger className="w-[180px]">
//                             <SelectValue placeholder="View" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="CALENDAR">Calendar View</SelectItem>
//                             <SelectItem value="TABLE">Table View</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>
//                 <Separator />
//                 <main className="">
//                     <div className="">
//                         {
//                             view == "CALENDAR" ? (
//                                 <div className="">
//                                     <FullCalendar
//                                         plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
//                                         headerToolbar={{
//                                             left: 'prev,next today',
//                                             center: 'title',
//                                             right: 'resourceTimelineWeek, dayGridMonth, timeGridWeek, timeGridDay'
//                                         }}
//                                         businessHours={{
//                                             daysOfWeek: [0, 1, 2, 3, 4, 5], // Monday - Thursday
//                                             startTime: '10:00',
//                                             endTime: '18:00',
//                                         }}
//                                         dayCellDidMount={(info) => {
//                                             const { isOff, reason } = isOffDay(info.date);
//                                             if (isOff) {
//                                                 info.el.classList.add('fc-off-day');

//                                                 // Insert reason label
//                                                 const reasonLabel = document.createElement('div');
//                                                 reasonLabel.innerText = reason;
//                                                 reasonLabel.classList.add('off-day-reason');

//                                                 info.el.appendChild(reasonLabel);
//                                             }
//                                         }}
//                                         events={allEvents?.map(event => ({
//                                             id: event.id,
//                                             title: event.service.name,
//                                             start: event.timeSlot.startTime,
//                                             end: event.timeSlot.endTime,
//                                             allDay: false
//                                         }))}
//                                         nowIndicator={true}
//                                         editable={true}
//                                         droppable={true}
//                                         selectable={true}
//                                         selectMirror={true}
//                                     />
//                                 </div>
//                             ) : (
//                                 <div>
//                                     <Separator />
//                                     <Suspense
//                                         key="unique-key"
//                                         fallback={<DataTableSkeleton columnCount={4} rowCount={10} />}
//                                     >
//                                         <div className="">
//                                             <table className="w-full">
//                                                 <thead>
//                                                     <tr>
//                                                         <th>Service</th>
//                                                         <th>Start Time</th>
//                                                         <th>End Time</th>
//                                                         <th>Status</th>
//                                                         <th>Action</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {
//                                                         allEvents?.map((event) => (
//                                                             <tr key={event.id}>
//                                                                 <td>{event.service.name}</td>
//                                                                 <td>{event.timeSlot.startTime}</td>
//                                                                 <td>{event.timeSlot.endTime}</td>
//                                                                 <td>Pending</td>
//                                                                 <td>
//                                                                     <button className="btn btn-primary">Edit</button>
//                                                                     <button className="btn btn-danger">Delete</button> 

//                                                                     {/* TODO: Implement appointment modal */}
//                                                                     {/* <button className="btn btn-info">View Details</button> */}
//                                                                 </td>
//                                                             </tr>
//                                                         ))
//                                                     }
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </Suspense>
//                                 </div>
//                             )
//                         }
//                     </div>
//                 </main>
//             </div>
//         </PageContainer>
//     )
// }

"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Suspense, useEffect, useState } from "react";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import AppointmentListingPage from "@/features/appointments/components/appointment-listing";

interface Event {
    id: string;
    service: {
        name: string;
        id: string;
    };
    timeSlot: {
        startTime: string;
        endTime: string;
    };
}

interface OffDay {
    id: string;
    startDate: string;
    endDate: string;
    reason: string;
}

export default function Home() {
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [offDays, setOffDays] = useState<Record<string, string>>({});
    const [calendarKey, setCalendarKey] = useState(0);
    const [view, setView] = useState("CALENDAR");

    // Convert date to "YYYY-MM-DD" format
    //   const formatDate = (date: Date) => date.toISOString().split("T")[0];

    // Fetch Off Days and store them as a record
    const fetchOffDays = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calendar/get-date-exclusion`,
                { withCredentials: true }
            );

            const fetchedOffDays = response.data.dateExclusions || [];
            console.log("Fetched Off Days:", fetchedOffDays); // ✅ Correct

            const formattedOffDays: Record<string, string> = {};
            fetchedOffDays.forEach((off: OffDay) => {
                const start = new Date(off.startDate);
                const end = new Date(off.endDate);

                for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
                    formattedOffDays[d.toISOString().split("T")[0]] = off.reason;
                }
            });

            setOffDays(formattedOffDays);
            setCalendarKey((prev) => prev + 1); // 🔹 Trigger re-render
        } catch (error) {
            console.error("Error fetching off days:", error);
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings/provider`,
                    { withCredentials: true }
                );
                setAllEvents(response.data.bookings);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
        fetchOffDays(); // Fetch off days along with events
    }, []);

    return (
        <PageContainer scrollable={false}>
            <div className="flex flex-1 flex-col space-y-4">
                <div className="flex items-start justify-between">
                    <Heading
                        title="Appointments"
                        description="Manage Schedule and Appointments"
                    />
                    <Select onValueChange={(value) => setView(value)} value={view}>
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
                        {view == "CALENDAR" ? (
                            <div className="">
                                <FullCalendar
                                    key={calendarKey} // 🔹 Ensures component re-renders when offDays change
                                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                                    headerToolbar={{
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: 'resourceTimelineWeek, dayGridMonth, timeGridWeek, timeGridDay'
                                    }}
                                    businessHours={{
                                        daysOfWeek: [0, 1, 2, 3, 4, 5],
                                        startTime: '10:00',
                                        endTime: '18:00',
                                    }}
                                    dayCellDidMount={(info) => {
                                        const dateStr = info.date.toISOString().split('T')[0];
                                        if (offDays[dateStr]) {
                                            info.el.classList.add('fc-off-day');

                                            // Insert reason label
                                            const reasonLabel = document.createElement('div');
                                            reasonLabel.innerText = offDays[dateStr];
                                            reasonLabel.classList.add('off-day-reason');


                                            info.el.appendChild(reasonLabel);
                                        }
                                    }}
                                    events={allEvents.map(event => ({
                                        id: event.id,
                                        title: event.service.name,
                                        start: event.timeSlot.startTime,
                                        end: event.timeSlot.endTime,
                                        allDay: false
                                    }))}
                                    nowIndicator={true}
                                    editable={true}
                                    droppable={true}
                                    selectable={true}
                                    selectMirror={true}
                                />
                            </div>
                        ) : (
                            <div>
                                <Separator />
                                <Suspense
                                    key="unique-key"
                                    fallback={<DataTableSkeleton columnCount={4} rowCount={10} />}
                                >
                                    <AppointmentListingPage />
                                </Suspense>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </PageContainer>
    );
}
