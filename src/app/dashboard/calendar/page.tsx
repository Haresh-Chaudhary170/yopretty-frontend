// import withAuth from '@/hoc/withAuth';
import { redirect } from 'next/navigation';

const Calendar=()=> {
  // const session = await auth();
  redirect('/dashboard/calendar/appointments');

  // if (!session?.user) {
  //   return redirect('/');
  // } else {
  //   redirect('/dashboard/overview');
  // }
}
export default Calendar;