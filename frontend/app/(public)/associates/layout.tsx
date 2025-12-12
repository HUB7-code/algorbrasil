import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nossos Associados",
    description: "Conheça a elite da governança de Inteligência Artificial no Brasil. Especialistas técnicos, jurídicos e de compliance.",
};

export default function AssociatesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
