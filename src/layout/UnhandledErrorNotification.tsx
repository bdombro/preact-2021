import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

export default function UnhandledErrorNotification() {
    const [event, setEvent] = useState<any>(null)
    useEffect(() => {
        window.addEventListener('unhandledrejection', handleReject)
        return () => window.removeEventListener('unhandledrejection', handleReject)

        function handleReject(eventNext: any) {
            setEvent(eventNext);
            // TODO: Log the error somewhere
        }
    }, [])

    return event && (
        <div style={{position: 'absolute', bottom: 0, left: 0, width: "100%", textAlign: 'center'}}>
            <div style={{ padding: 20, backgroundColor: '#f66', display: 'inline-block'}}>
                Something went wrong on this page! Shoot. Maybe <a href="javascript:location.reload()">refresh</a>?
            </div>
        </div>
    )
}