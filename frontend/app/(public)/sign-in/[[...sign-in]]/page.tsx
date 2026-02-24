import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A1A2F]">
            <SignIn />
        </div>
    );
}
