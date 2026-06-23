import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SECRET } from '../../lib/admin';

export default async function AdminIndexPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session')?.value;

  if (session && session === ADMIN_SECRET) {
    redirect('/admin/blogs');
  }

  redirect('/admin/login');
}
