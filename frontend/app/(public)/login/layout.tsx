import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | Algor Brasil',
    description: 'Acesse seu console de governança de IA',
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
