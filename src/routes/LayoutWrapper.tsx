import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { publicRoutes } from './index'; // import danh sách route của bạn
import DefaultLayout from '@/components/layouts/DefaultLayout';

type LayoutWrapperProps = {
  children: ReactNode;
};

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const router = useRouter();
  const route = publicRoutes.find((r) => r.path === router.pathname);

  const Layout = route?.layout || DefaultLayout;

  return <Layout>{children}</Layout>;
};

export default LayoutWrapper;