// import withAuth from '@/hoc/withAuth';
import { redirect } from 'next/navigation';

const Dashboard=()=> {
  // const session = await auth();
  redirect('/dashboard/overview');

  // if (!session?.user) {
  //   return redirect('/');
  // } else {
  //   redirect('/dashboard/overview');
  // }
}
export default Dashboard;