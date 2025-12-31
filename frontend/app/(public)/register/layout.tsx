import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cadastro | Algor Brasil',
    description: 'Crie sua conta e acesse a plataforma de governança de IA',
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
