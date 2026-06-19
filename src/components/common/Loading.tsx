import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <Loader2 className='w-8 h-8 animate-spin text-orange-400' />
        </div>
    )
}